"use client";
import useInitializeChat from "@/hooks/useInitializeChat";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { Flex, IconButton } from "@radix-ui/themes";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

type ChatProps = {
  selectedChatId: string | null;
};

export default function Chat({ selectedChatId }: ChatProps) {
  // handle errors from api responses
  const router = useRouter();
  const [error, setError] = useState("");
  const [displayMessages, setDisplayMessages] = useState("");
  const [chatCompleted, setChatCompleted] = useState(false);
  const [initiateNewChat, setInitiateNewChat] = useState(false);
  const newChatUrl = useInitializeChat(initiateNewChat);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
      onFinish: () => {
        setChatCompleted(true);
        setInitiateNewChat(false);
      },
    });

  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    if (!isLoading) {
      messagesRef.current = messages;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (chatCompleted && newChatUrl) {
      console.log("replacing url with newChatUrl");

      router.replace(newChatUrl, { scroll: false });
    }
  }, [chatCompleted, newChatUrl, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  const handleChatSubmit = (e: any) => {
    if (!newChatUrl) {
      setInitiateNewChat(true);
    }
    handleSubmit(e);
    setChatCompleted(false);
  };

  return (
    <Flex height={"100%"} grow={"1"}>
      <ul className="divide-y overflow-auto">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, index) => (
            <li key={index} className="py-4">
              {m.role === "user" ? "User: " : "YouTubeGPT: "}
              <span className="whitespace-pre-line">{m.content}</span>
            </li>
          ))}
      </ul>

      <Flex bottom={"0"} position={"absolute"} pb={"4"} width={"100%"}>
        <form
          onSubmit={handleChatSubmit}
          className="flex gap-4 w-full relative"
        >
          <textarea
            className="w-full border rounded-xl py-4 px-8 border-indigo-500 resize-none shadow-indigo-400 focus:outline-none focus:border-indigo-700 hide-scrollbar"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
            style={{ backgroundColor: "#111111", height: "60px" }}
            onKeyDown={handleKeyDown}
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
        </form>
      </Flex>
    </Flex>
  );
}
