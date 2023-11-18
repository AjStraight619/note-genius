import { Message } from "ai";
import { MutableRefObject, useEffect } from "react";

type useUpdateMessagesProps = {
  chatId: string;
  messagesRef: MutableRefObject<Message[]>;
};

const useUpdateChatMessages = ({
  chatId,
  messagesRef,
}: useUpdateMessagesProps) => {
  useEffect(() => {
    const updateDatabase = async () => {
      if (chatId && messagesRef.current.length > 0) {
        // Logic to update the database with new messages
      }
    };

    updateDatabase();
  }, [chatId, messagesRef]);
};

export default useUpdateChatMessages;
