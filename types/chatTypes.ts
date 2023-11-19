import { Chat, ChatMessage } from "@prisma/client";

export type ChatWithMessages = Chat & {
  chatMessages?: ChatMessage[];
};
