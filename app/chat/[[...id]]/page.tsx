import { getChatMetaData } from "@/app/chat-actions/chatActions";
import ChatComponentContainer from "@/app/components/chat-page/ChatComponentContainer";
import Sidebar from "@/app/components/ui/side-bar/Sidebar";
import SidebarContainer from "@/app/components/ui/side-bar/SidebarContainer";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getChatById = async (chatId: string, userId: string) => {
  const chat = prisma.chat.findUnique({
    where: {
      id: chatId,
      userId: userId,
    },
    include: {
      chatMessages: true,
    },
  });

  return chat;
};

const ChatPage = async ({ params }: { params: { chatId: string } }) => {
  let chatMetaData;
  let userId;
  const session = await getServerSession(authOptions);
  const { chatId } = params;
  if (!session) {
    redirect("/");
  } else {
    const user = session.user as User;
    userId = user.id;
    try {
      chatMetaData = await getChatMetaData(userId);
    } catch (error) {
      console.log(error);
    }
  }

  if (!chatId) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  // const chatById = await getChatById(chatId, userId);
  console.log("This is the chat meta data", chatMetaData);

  // console.log("This is the chat I got by the id", chatById);

  return (
    <Flex direction={"row"} position={"relative"}>
      <SidebarContainer>
        <Sidebar chats={chatMetaData || []} />
      </SidebarContainer>
      <ChatComponentContainer />
    </Flex>
  );
};

export default ChatPage;
