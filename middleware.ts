import { NextRequest, NextResponse } from "next/server";

// const getMostRecentChat = async (userId: string) => {
//   const mostRecentChat = prisma.chat.findFirst({
//     where: {
//       userId: userId,
//     },
//     select: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return mostRecentChat;
// };

export async function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/"],
};
