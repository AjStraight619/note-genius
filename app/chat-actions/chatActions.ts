"use server";

import { prisma } from "@/lib/prisma";

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
