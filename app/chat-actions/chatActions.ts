"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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
  return newChat;
};
