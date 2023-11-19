import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const chatId = req.nextUrl.searchParams.get("chatId");

  console.log("GET request received");

  if (!session) {
    return NextResponse.json({ message: "No session" });
  }

  if (!chatId) {
    return NextResponse.json({ message: "Chat ID is required" });
  }

  const user = session.user as User;
  const userId = user.id;

  const chatMessages = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId: userId,
    },
    include: {
      chatMessages: true,
    },
  });

  return chatMessages
    ? NextResponse.json(chatMessages)
    : NextResponse.json({ message: "Chat not found or access denied" });
}
