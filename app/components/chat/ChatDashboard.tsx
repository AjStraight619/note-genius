"use client";

import { useEffect, useState } from "react";
import Sidebar from "../ui/side-bar/Sidebar";
import SidebarContainer from "../ui/side-bar/SidebarContainer";
import Chat from "./Chat";

import {
  ChatMetaData,
  FileMetaData,
  FolderMetaData,
} from "@/types/metaDataTypes";

import { useChatNavigation } from "@/context/ChatNavigationContext";
import { ChatWithMessages } from "@/types/chatTypes";

type SideBarProps = {
  chats?: ChatMetaData[];
  folders?: FolderMetaData[];
  files?: FileMetaData[];
};

const ChatDashboard = ({ chats }: SideBarProps) => {
  const { currentChatId, handleChangeId } = useChatNavigation();
  const [messagesFromDb, setMessagesFromDb] = useState<ChatWithMessages | null>(
    null
  );

  useEffect(() => {
    console.log(`currentChatId updated to: ${currentChatId}`);
  }, [currentChatId]);

  useEffect(() => {
    const getChatMessagesById = async () => {
      try {
        const response = await fetch(
          `/api/users-chats/chat-messages?chatId=${currentChatId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Chat message data: ", data);
        setMessagesFromDb(data);
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    };

    if (currentChatId) {
      getChatMessagesById();
    }
  }, [currentChatId]);

  return (
    <>
      {/* Sidebar Container */}
      <SidebarContainer>
        <Sidebar
          handleChangeId={handleChangeId}
          currentChatId={currentChatId}
          chats={chats}
        />
      </SidebarContainer>

      {/* Chat Container */}
      <Chat
        currentChatId={currentChatId}
        messagesFromDb={messagesFromDb}
        setMessagesFromDb={setMessagesFromDb}
      />
    </>
  );
};

export default ChatDashboard;
