"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type ChatNavigationContextType = {
  currentChatId: string | null;
  handleChangeId: (newChatId: string | null) => void;
};

export const ChatNavigationContext =
  createContext<ChatNavigationContextType | null>(null);

type ChatNavigationProviderProps = {
  children: ReactNode;
};

export const ChatNavigationProvider = ({
  children,
}: ChatNavigationProviderProps) => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const handleChangeId = (newChatId: string | null) => {
    if (newChatId === null) {
      console.warn("Attempted to set currentChatId to null");
      return;
    }
    if (newChatId !== currentChatId) {
      setCurrentChatId(newChatId);
    }
  };

  const contextValue = { currentChatId, handleChangeId };

  return (
    <ChatNavigationContext.Provider value={contextValue}>
      {children}
    </ChatNavigationContext.Provider>
  );
};

export const useChatNavigation = (): ChatNavigationContextType => {
  const context = useContext(ChatNavigationContext);
  if (!context) {
    throw new Error(
      "useChatNavigation must be used within a ChatNavigationProvider"
    );
  }
  return context;
};
