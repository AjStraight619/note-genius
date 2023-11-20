"use client";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ChatNavigationContextType = {
  currentChatId: string | null;
  setCurrentChatId: React.Dispatch<SetStateAction<string | null>>;
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
  const pathname = usePathname();

  useEffect(() => {
    // Extract chat ID from the pathname and update state
    const pathSegments = pathname.split("/");
    const chatId = pathSegments[pathSegments.length - 1];
    setCurrentChatId(chatId);
  }, [pathname]);

  const contextValue = { currentChatId, setCurrentChatId };

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
