import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("POST request received");
  console.log("Name: ", name);
  console.log("Email: ", email);
  console.log("Password: ", password);
  let newUser;

  const hashedPassword = await hash(password, 10);
  try {
    newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ newUser });
}
