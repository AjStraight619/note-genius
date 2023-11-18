"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useInitializeChat = (userHasInteracted: boolean) => {
  const [chatUrl, setChatUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const chatId = pathSegments[2];

    const shouldCreateChat = !chatId && userHasInteracted;
    if (shouldCreateChat) {
      const createChat = async () => {
        try {
          const newChat = await createNewChat();
          if (newChat?.id) {
            const newChatUrl = `/chat/${newChat.id}`;
            setChatUrl(newChatUrl);
            console.log(newChatUrl);
          }
        } catch (error) {
          console.error("Error creating chat:", error);
        }
      };

      createChat();
    }
  }, [pathname, userHasInteracted]);

  return chatUrl;
};

const createNewChat = async () => {
  const response = await fetch("/api/users-chats/initial-chats", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export default useInitializeChat;
