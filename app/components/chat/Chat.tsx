"use client";
import useUpdateChatMessages from "@/hooks/useUpdateChatMessages";
import { ChatWithMessages } from "@/types/chatTypes";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { AssistantAvatar, UserAvatar } from "../ui/avatars/Avatars";
import "./styles.css";

import { useChatNavigation } from "@/context/ChatNavigationContext";

type UnifiedMessageType = {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
  chatId?: string | null;
};

type ChatProps = {
  currentChatId: string | null;
  messagesFromDb: ChatWithMessages | null;
  setMessagesFromDb: React.Dispatch<SetStateAction<ChatWithMessages | null>>;
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
  const router = useRouter();
  const [error, setError] = useState("");
  const [chatCompleted, setChatCompleted] = useState(false);
  const [initiateNewChat, setInitiateNewChat] = useState(false);
  // const newChatUrl = useInitializeChat(initiateNewChat);
  const [allMessages, setAllMessages] = useState<UnifiedMessageType[]>([]);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
      onFinish: () => {
        setChatCompleted(true);
        setInitiateNewChat(false);
      },
    });

  useUpdateChatMessages({
    chatId: currentChatId,
    messages: messages,
  });

  // useEffect(() => {
  //   if (chatCompleted && newChatUrl) {
  //     console.log("replacing url with newChatUrl");

  //     router.replace(newChatUrl, { scroll: false });
  //   }
  // }, [chatCompleted, newChatUrl, router]);

  useEffect(() => {
    if (isAutoScrollEnabled && scrollContainerRef.current) {
      const { scrollHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight;
    }
  }, [isAutoScrollEnabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  const handleChatSubmit = (e: any) => {
    // if (!newChatUrl) {
    //   setInitiateNewChat(true);
    // }
    handleSubmit(e);
    setChatCompleted(false);
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

  // useEffect(() => {
  //   setAllMessages(messagesFromDb?.chatMessages || []);
  // }, [messagesFromDb]);

  // // Append new messages to allMessages
  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const normalizedNewMessages = messages.map((msg) => ({
  //       id: msg.id, // Ensure the id is unique
  //       role: msg.role,
  //       content: msg.content,
  //       createdAt: new Date(), // Adjust as needed
  //       chatId: selectedChatId,
  //     }));

  //     setAllMessages((prevMessages) => [
  //       ...prevMessages,
  //       ...normalizedNewMessages,
  //     ]);
  //   }
  // }, [messages, selectedChatId]);

  // // useMemo to optimize the rendering of message list
  // const displayMessages = useMemo(() => allMessages, [allMessages]);

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
            {messages
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
            className="items-stretch mx-2 flex flex-row last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-3xl flex-1 md:pr-4"
            onSubmit={handleChatSubmit}
          >
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
