"use client";
import { ChatMetaData } from "@/types/metaDataTypes";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type ChatListProps = {
  chats: ChatMetaData[];
  selectedChatId: string | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>; // Corrected type
};

const ChatList = ({
  chats,
  selectedChatId,
  setSelectedChatId,
}: ChatListProps) => {
  const pathname = usePathname();

  useEffect(() => {
    const chatId = pathname.split("/chat/")[1];
    if (chatId) {
      setSelectedChatId(chatId);
    }
  }, [pathname, setSelectedChatId]);

  return (
    <Flex direction={"column"} gap={"2"}>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} passHref scroll={false}>
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

export default ChatList;
