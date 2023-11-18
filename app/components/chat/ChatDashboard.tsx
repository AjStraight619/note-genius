"use client";
import {
  ChatMetaData,
  FileMetaData,
  FolderMetaData,
} from "@/types/metaDataTypes";
import { useState } from "react";
import Sidebar from "../ui/side-bar/Sidebar";
import SidebarContainer from "../ui/side-bar/SidebarContainer";
import Chat from "./Chat";

type SideBarProps = {
  chats?: ChatMetaData[];
  folders?: FolderMetaData[];
  files?: FileMetaData[];
};

const ChatDashboard = ({ chats }: SideBarProps) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  return (
    <>
      {/* Sidebar Container */}
      <SidebarContainer>
        <Sidebar
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          chats={chats}
        />
      </SidebarContainer>

      {/* Chat Container */}
      <main className="container flex mx-auto relative p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <Chat selectedChatId={selectedChatId} />
      </main>
    </>
  );
};

export default ChatDashboard;
