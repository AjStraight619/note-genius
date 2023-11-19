import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/new", req.url));
  }
  const user = session.user as User;
  const userId = user?.id;

  const newChat = await prisma.chat.create({
    data: {
      title: "New Chat",
      userId: userId,
    },
  });

  return NextResponse.json({
    id: newChat.id,
    title: newChat.title,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "No session" });
  }

  const user = session.user as User;
  const userId = user.id;

  const mostRecentChat = await prisma.chat.findFirst({
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

  return NextResponse.json(mostRecentChat);
}
