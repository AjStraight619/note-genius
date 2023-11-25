import { getChatMetaData } from "@/app/actions/chat-actions/chatActions";
import ChatDashboard from "@/app/components/chat/ChatDashboard";
import { ChatNavigationProvider } from "@/context/ChatNavigationContext";
import { FileProvider } from "@/context/FileSelectionProvider";
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
      console.log("Revalidated path after deleting");
      chatMetaData = await getChatMetaData(userId);
      console.log("chat meta data", chatMetaData);
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
      <FileProvider>
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
      </FileProvider>
    </ChatNavigationProvider>
  );
};

export default Chat;
