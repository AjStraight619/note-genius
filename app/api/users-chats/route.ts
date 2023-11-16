import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

  console.log("This is the most recent chatId", mostRecentChat);

  return NextResponse.json({ chatId: mostRecentChat?.id });
}
