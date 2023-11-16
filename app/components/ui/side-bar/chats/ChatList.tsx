"use client";
import { ChatMetaData } from "@/types/metaDataTypes";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type ChatListProps = {
  chats: ChatMetaData[];
};

const ChatList = ({ chats }: ChatListProps) => {
  const pathname = usePathname();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const chatId = pathname.split("/chat/")[1];
    setSelectedChatId(chatId);
  }, [pathname]);

  return (
    <Flex direction={"column"} gap={"2"}>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} passHref>
          <div
            className={`p-1 cursor-pointer rounded-md ${
              selectedChatId === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {chat.title}
          </div>
        </Link>
      ))}
    </Flex>
  );
};

export default React.memo(ChatList);
