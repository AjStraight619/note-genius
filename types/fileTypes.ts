import {
  Chat as PrismaChat,
  ChatMessage as PrismaChatMessage,
  File as PrismaFile,
} from "@prisma/client";

export type SortableItem = {
  id: string;
  name: string;
  content?: string;
  createdAt: Date;
  isRefined?: boolean;
};

export type Link = {
  id: string; // Assuming each link has a unique ID
  chatId: string;
  fileId: string;
  chat: ChatWithMessages; // Chat including its messages
  file?: UIFile; // Optional file
};

export interface ChatMessage extends PrismaChatMessage {}

export interface Chat extends PrismaChat {
  chatMessages: ChatMessage[];
}

export type UIFile = PrismaFile & {
  processing?: boolean;
  file?: File;
  folderName?: string;
  chatId?: string; // Add this line
};

export type ChatWithMessages = Chat & {
  chatMessages: ChatMessage[];
  files: UIFile[]; // Include this line to represent the linked files
};

export type FileState = {
  files: UIFile[];
  processing: boolean;
  links?: Link[]; // Optional links on FileState
  newFile?: boolean; // Optional newFile on FileState
};

export type FileAction =
  | { type: "ADD_FILE"; payload: UIFile[] }
  | { type: "REMOVE_FILE"; payload: { fileId: string } }
  | { type: "UPDATE_FILE"; payload: UIFile }
  | {
      type: "PROCESSING_FILE";
      payload: { fileId: string; processing: boolean };
    }
  | { type: "ADD_LINK"; payload: Link[] }
  | { type: "REMOVE_LINK"; payload: { chatId: string; fileId: string } }
  | { type: "UPDATE_LINK"; payload: { oldLink: Link; newLink: Link } }
  | { type: "NEW_FILE"; payload: boolean };

export type ChatFileLink = {
  id: string; // id of the link
  chatId: string;
  fileId: string;
  chat: Chat & {
    chatMessages: ChatMessage[];
  };
  file: UIFile;
}[];
