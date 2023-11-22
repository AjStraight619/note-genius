import { getChatMetaData } from "@/app/chat-actions/chatActions";
import ChatDashboard from "@/app/components/chat/ChatDashboard";
import { ChatNavigationProvider } from "@/context/ChatNavigationContext";
import { ToastProvider } from "@/context/ToastContext";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
      <ToastProvider>
        <Flex
          direction={"row"}
          position={"relative"}
          height={"100%"}
          width={"100%"}
        >
          <ChatDashboard chats={chatMetaData || []} />
        </Flex>
      </ToastProvider>
    </ChatNavigationProvider>
  );
};

export default Chat;
