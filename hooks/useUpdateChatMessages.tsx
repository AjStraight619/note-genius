import { Message } from "ai";
import { useCallback, useEffect } from "react";

type useUpdateMessagesProps = {
  chatId: string | null;
  messages: Message[];
};

const useUpdateChatMessages = ({
  chatId,
  messages,
}: useUpdateMessagesProps) => {
  const updateMessagesInDatabase = useCallback(async () => {
    if (chatId && messages.length > 0) {
      {
        try {
          const response = await fetch("/api/users-chats", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatId,
              newMessages: messages,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          console.log("Messages updated successfully:", response);
        } catch (error) {
          console.error("Failed to update messages:", error);
        }
      }
    }
  }, [chatId, messages]);

  useEffect(() => {
    updateMessagesInDatabase();
  }, [chatId, messages, updateMessagesInDatabase]);
};

export default useUpdateChatMessages;
