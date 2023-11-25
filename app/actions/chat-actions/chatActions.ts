"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getChatMetaData = async (userId: string) => {
  const chatMetaData = prisma.chat.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath("/chat");

  return chatMetaData;
};

export const addChat = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const user = session.user as User;
  const userId = user.id;

  const title = formData.get("chatTitle") as string;

  const newChat = await prisma.chat.create({
    data: {
      title: title,
      userId: userId,
    },
  });
  revalidatePath("/chat");
  redirect(`/chat/${newChat.id}`);
};

export const deleteChat = async (chatId: string | null) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  if (!chatId) {
    return;
  }

  const user = session.user as User;
  const userId = user.id;

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    // First, delete all related ChatMessage records
    await prisma.chatMessage.deleteMany({
      where: {
        chatId: chatId,
        // If necessary, add additional conditions here
      },
    });

    // Then, delete the Chat record
    return await prisma.chat.delete({
      where: {
        id: chatId,
        userId: userId,
      },
      select: {
        title: true,
        id: true,
      },
    });
  });

  revalidatePath(`/chat`);
  return result;
};

export const getMostRecentChatAfterDeletion = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const user = session.user as User;
  const userId = user.id;
  const mostRecentChat = prisma.chat.findFirst({
    where: {
      userId: userId,
    },

    orderBy: {
      updatedAt: "desc",
    },

    select: {
      id: true,
    },
  });

  return mostRecentChat;
};
