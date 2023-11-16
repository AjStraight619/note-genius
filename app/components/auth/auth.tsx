"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogInButton = () => {
  return (
    <span
      className="mx-2 p-2 text-2xl font-bold cursor-pointer hover:bg-gray-800"
      onClick={() => signIn()}
    >
      Log In
    </span>
  );
};

export const LogOutButton = () => {
  return (
    <div
      className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-gray-800 rounded-md p-2"
      onClick={() => signOut()}
    >
      <ExitIcon />
      <span className="text-sm font-bold mx-2">Log Out</span>
    </div>
  );
};

export const RegisterButton = () => {
  const router = useRouter();
  return (
    <span
      className="mx-2 p-2 text-2xl font-bold cursor-pointer hover:bg-gray-800"
      onClick={() => router.push("/register")}
    >
      Sign Up
    </span>
  );
};
