import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("next-auth.session-token");
  if (!cookie) {
    return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}
