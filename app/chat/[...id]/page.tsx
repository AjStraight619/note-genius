import { getChatMetaData } from "@/app/chat-actions/chatActions";
import ChatDashboard from "@/app/components/chat/ChatDashboard";
import { ChatNavigationProvider } from "@/context/ChatNavigationContext";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getMostRecentChatById = async (userId: string) => {
  const chat = prisma.chat.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      chatMessages: true,
    },
  });

  return chat;
};

const Chat = async ({ params }: { params: { chatId: string } }) => {
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

  return (
    <ChatNavigationProvider>
      <Flex
        direction={"row"}
        position={"relative"}
        height={"100%"}
        width={"100%"}
      >
        <ChatDashboard chats={chatMetaData || []} />
      </Flex>
    </ChatNavigationProvider>
  );
};

export default Chat;
