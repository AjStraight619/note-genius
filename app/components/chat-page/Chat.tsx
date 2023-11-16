"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { Flex, IconButton } from "@radix-ui/themes";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: "",
          content: "",
          role: "system",
        },
      ],
      api: "/api/chat",
    });

  return (
    <div>
      <ul className="divide-y">
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
        <form onSubmit={handleSubmit} className="flex gap-4 w-full relative">
          <textarea
            className="w-full border rounded-xl py-4 px-8 border-indigo-500 resize-none shadow-indigo-400 focus:outline-none focus:border-indigo-700"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
            style={{ backgroundColor: "#111111", height: "60px" }}
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
    </div>
  );
}
