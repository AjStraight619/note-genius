"use client";
import {
  ChatMetaData,
  FileMetaData,
  FolderMetaData,
} from "@/types/metaDataTypes";
import {
  ChatBubbleLeftIcon,
  FolderArrowDownIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Flex,
  IconButton,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import ChatList from "./chats/ChatList";

import AddChat from "./chats/AddChat";

type SideBarProps = {
  chats?: ChatMetaData[];
  folders?: FolderMetaData[];
  files?: FileMetaData[];
  currentChatId: string | null;
  addOptimisticChats: (newChat: ChatMetaData) => void;
};

const Sidebar = ({ chats, addOptimisticChats }: SideBarProps) => {
  const [activeTab, setActiveTab] = useState("Chats");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div
      className={`md: flex flex-col ${
        isSidebarOpen ? "flex flex-col" : "hidden"
      }`}
    >
      <Flex
        mt={"2"}
        justify={"center"}
        width={"100%"}
        align={"center"}
        mb={"4"}
        py={"4"}
        px={"6"}
        gap={"4"}
        mx={"auto"}
      >
        <AddChat addOptimisticChats={addOptimisticChats} />
        <div>
          <IconButton onClick={toggleSidebar} variant="soft">
            <HamburgerMenuIcon />
          </IconButton>
        </div>
      </Flex>
      <Flex
        direction={"row"}
        justify={"between"}
        align={"center"}
        width={"100%"}
        mx={"auto"}
        px={"6"}
        gap={"2"}
        mt={"4"}
      >
        <IconButton
          onClick={() => setActiveTab("Chats")}
          radius={"full"}
          variant={"ghost"}
        >
          <ChatBubbleLeftIcon className="w-7 h-7" />
        </IconButton>
        <IconButton
          onClick={() => setActiveTab("Links")}
          radius={"full"}
          variant={"ghost"}
        >
          <LinkIcon className="w-7 h-7"></LinkIcon>
        </IconButton>
        <IconButton
          onClick={() => setActiveTab("Folders")}
          radius={"full"}
          variant={"ghost"}
        >
          <FolderArrowDownIcon className="w-7 h-7"></FolderArrowDownIcon>
        </IconButton>
      </Flex>

      <ScrollArea>
        <Flex
          mt={"5"}
          justify={"start"}
          width={"100%"}
          px={"4"}
          direction={"column"}
        >
          <Text className="text-gray-300 text-sm">{activeTab}</Text>

          <Separator size={"4"} mb={"3"} className="bg-gray-600" />
          {activeTab === "Chats" && chats && <ChatList chats={chats} />}
          {/* {activeTab === "folders" && folders && <FolderList />} */}
          {/* {activeTab === "files" && files && <LinkList  />} */}
        </Flex>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
