import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
  }

  const user = session.user as User;
  const userId = user?.id;

  const mostRecentChat = await prisma.chat.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  return NextResponse.json({ chatId: mostRecentChat?.id });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "No valid session provided" });
  }
  const user = session.user as User;
  if (!user) {
    return NextResponse.json({ error: "Invalid user provided" });
  }
  const userId = user.id;

  const { newMessages } = await req.json();

  const chat = await prisma.chat.create({
    data: {
      title: newMessages.title,

      chatMessages: newMessages,
      userId: userId,
    },
  });

  return NextResponse.json({ chat });
}

export async function PUT(req: NextRequest) {
  console.log("PUT request received");

  // Get the session
  const session = await getServerSession(authOptions);

  // Validate the session
  if (!session) {
    return NextResponse.json({ error: "No valid session provided" });
  }

  // Get the user from the session
  const user = session.user as User;

  // Validate the user
  if (!user) {
    return NextResponse.json({ error: "Invalid user provided" });
  }

  // Get userId and request data
  const userId = user.id;
  console.log("current user id", userId);
  const { newMessages, chatId } = await req.json();
  console.log(
    "These are the new messages being appended",
    newMessages,
    " to this chatId",
    chatId
  );

  let chat;

  // Check if chatId is provided
  if (chatId) {
    // Update existing chat with new messages
    for (let i = 0; i < newMessages.length; i++) {
      const { content, role } = newMessages[i];
      if (content && role) {
        await prisma.chatMessage.create({
          data: {
            content: content,
            chatId: chatId,
            role: role,
          },
        });
      }
    }
    // Fetch the updated chat data
    chat = await prisma.chat.findUnique({ where: { id: chatId } });
  } else {
    // Generate a new chatId only if needed
    const newChatId = uuid();

    let chatTitle = "Untitled Chat";
    // If there's no file title, generate a title from the first message of the chat.
    if (newMessages.length > 0) {
      // This is a simplistic example, you may want a more robust method to generate a meaningful title.
      chatTitle = newMessages[0].content.substring(0, 30); // Take the first 30 characters of the first message.
    }

    // No chatId provided, create a new chat and messages
    chat = await prisma.chat.create({
      data: {
        id: newChatId, // Specify the generated chatId
        title: chatTitle || "Untitles Chat",
        userId: userId,
        chatMessages: {
          create: newMessages.map((message: any) => ({
            content: message.content,
            role: message.role,
          })),
        },
      },
    });
  }

  // Respond with the chat data

  return new NextResponse(JSON.stringify({ newMessages }));
}
