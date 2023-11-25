import { useChatNavigation } from "@/context/ChatNavigationContext"; // Import the context hook
import { ChatMetaData } from "@/types/metaDataTypes";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import SideBarOptions from "../SideBarOptions";

type ChatListProps = {
  chats: ChatMetaData[];
};

const ChatList = ({ chats }: ChatListProps) => {
  const { currentChatId } = useChatNavigation();

  return (
    <Flex direction={"column"} gap={"2"}>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} passHref scroll={false}>
          <div
            className={`p-1 px-2 cursor-pointer rounded-md ${
              currentChatId === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <Flex justify={"between"} align={"center"}>
              {chat.title}
              {currentChatId === chat.id ? <SideBarOptions /> : null}
            </Flex>
          </div>
        </Link>
      ))}
    </Flex>
  );
};

export default ChatList;
