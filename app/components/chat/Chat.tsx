"use client";
import { ChatWithMessages } from "@/types/chatTypes";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { AssistantAvatar, UserAvatar } from "../ui/avatars/Avatars";
import "./styles.css";

import { useChatNavigation } from "@/context/ChatNavigationContext";
import { Message } from "ai";
import FileOptions from "../files/FileOptions";
import FileSelection from "../files/FileSelection";

type ChatProps = {
  currentChatId: string | null;
  messagesFromDb: ChatWithMessages | null;
  setMessagesFromDb: React.Dispatch<SetStateAction<ChatWithMessages | null>>;
};

type useAIInitialChatMessagesProps = {
  currentChatId: string | null;
  messagesFromDb: ChatWithMessages | null;
  setInitialSystemMessageInput: React.Dispatch<SetStateAction<string | null>>;
};
const SCROLL_THRESHOLD = 100;

function adjustTextAreaHeight(textArea: any) {
  const maxHeight = window.innerHeight * 0.25;
  textArea.style.height = "auto";
  textArea.style.height = Math.min(textArea.scrollHeight, maxHeight) + "px";

  if (textArea.value.trim() === "") {
    textArea.style.height = "";
  }
}

export default function Chat({ messagesFromDb, setMessagesFromDb }: ChatProps) {
  const { currentChatId } = useChatNavigation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const { data: session } = useSession();
  const [initialSystemMessageInput, setInitialSystemMessageInput] = useState<
    string | null
  >(null);

  const onFinishChat = async () => {
    // slicing last two messages and sending them to the api to update db
    const newMessages = messagesRef.current.slice(-2);

    if (newMessages.length > 0) {
      try {
        const res = await fetch("/api/users-chats", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newMessages: newMessages,
            chatId: currentChatId,
          }),
        });
        // Handle successful update
        if (res.ok) {
          console.log(
            "messages updated successfuly: ",
            newMessages,
            "to: ",
            currentChatId
          );
        }
      } catch (error) {
        console.error("Failed to update chat messages", error);
      }
    }
  };
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
      initialInput: "",
      onFinish: onFinishChat,
    });

  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (isAutoScrollEnabled && scrollContainerRef.current) {
      const { scrollHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight;
    }
  }, [isAutoScrollEnabled]);

  const displayMessages = useMemo(() => {
    return [...(messagesFromDb?.chatMessages || []), ...messages];
  }, [messagesFromDb, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  const handleChatSubmit = (e: any) => {
    handleSubmit(e);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Check if the user is within the threshold from the bottom
    if (distanceFromBottom <= SCROLL_THRESHOLD) {
      setIsAutoScrollEnabled(true);
    } else {
      setIsAutoScrollEnabled(false);
    }
  };

  const handleTextAreaChange = (e: any) => {
    adjustTextAreaHeight(e.target);
    handleInputChange(e);
  };

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      ref={scrollContainerRef}
      className="md:scroll-auto"
      onScroll={handleScroll}
      style={{ height: "100vh" }}
    >
      <div className="w-full flex  pt-6 pb-20">
        <div className="max-w-[700px] w-full mx-auto">
          <ul className="space-y-4">
            {displayMessages
              .filter((msg) => msg.role !== "system")
              .map((msg) => (
                <li
                  key={msg.id}
                  className="flex flex-col items-start justify-start py-5"
                >
                  <div className="flex gap-3 whitespace-pre-line">
                    {msg.role === "user" ? (
                      <UserAvatar name={session?.user?.name} />
                    ) : (
                      <AssistantAvatar />
                    )}
                    <Text size={"2"}>{msg.content}</Text>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 w-full pt-8 md:border-t-0 px-4">
        <div className="flex justify-center items-center ml-2">
          <form
            className="items-stretch mx-2 flex flex-row last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-3xl flex-1 md:pr-4 gap-4"
            onSubmit={handleChatSubmit}
          >
            <div className="items-center justify-center mt-5">
              <FileOptions />
            </div>
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div className="flex w-full items-center focus:ring-2">
                <textarea
                  style={{
                    backgroundColor: "#1A1A1A",
                    maxHeight: "200px",
                    height: "65px",
                    overflowY: "hidden",
                    paddingLeft: "2.5rem",
                  }}
                  rows={1}
                  placeholder="Message Note Genius..."
                  className="w-full border rounded-xl py-4 px-8 border-indigo-500 resize-none shadow-indigo-400 focus:outline-none focus:border-indigo-700 hide-scrollbar"
                  value={input}
                  onChange={handleTextAreaChange}
                  onInput={handleTextAreaChange}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                />

                <div className="absolute bottom-5 left-2">
                  <FileSelection />
                </div>

                <div className="absolute bottom-4 right-2">
                  <IconButton
                    size={"1"}
                    radius="full"
                    variant={"ghost"}
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <ArrowUpCircleIcon className="w-8 h-8" />
                  </IconButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ScrollArea>
  );
}

const useAIInitialChatMessages = ({
  currentChatId,
  messagesFromDb,
  setInitialSystemMessageInput,
}: useAIInitialChatMessagesProps) => {
  useEffect(() => {
    const messagesForInitialInput = messagesFromDb?.chatMessages
      .filter((msg) => msg.fileContent)
      .map((msg) => msg.content);

    if (messagesForInitialInput && messagesForInitialInput.length > 0) {
      // Concatenate messages into a single string
      const concatenatedMessages = messagesForInitialInput.join(" ");
      setInitialSystemMessageInput(concatenatedMessages);
    } else {
      setInitialSystemMessageInput(null);
    }
  }, [messagesFromDb, setInitialSystemMessageInput]);
};
