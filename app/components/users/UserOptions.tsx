"use client";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Flex, Popover, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogInButton, LogOutButton } from "../auth/auth";

type DropDownItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type UserOptionsProps = {
  userName: string | null;
  userId: string | null;
};

const DropdownItem = ({ icon, label, href }: DropDownItemProps) => (
  <Flex
    direction={"row"}
    gap={"2"}
    justify={"start"}
    align={"center"}
    className="hover:bg-slate-500 p-1 rounded-md hover:cursor-pointer"
  >
    {icon}
    {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
  </Flex>
);

const UserOptions = ({ userName, userId }: UserOptionsProps) => {
  const [mostRecentChatId, setMostRecentChatId] = useState(null);
  console.log("This is the userId in userOptions", userId);

  useEffect(() => {
    const getMostRecentChatId = async () => {
      const response = await fetch("/api/users-chats");
      if (response.ok) {
        const { chatId } = await response.json();
        console.log("This is the id from users-chats", chatId);
        setMostRecentChatId(chatId);
      }
    };
    getMostRecentChatId();
  }, []);

  return (
    <>
      {userName && userId ? (
        <Popover.Root>
          <Popover.Trigger>
            <Button style={{ backgroundColor: "transparent" }}>
              <Avatar
                className="hover:cursor-pointer"
                fallback={`${userName?.charAt(0).toUpperCase() || ""}`}
              />
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Flex direction={"column"} gap={"2"}>
              <DropdownItem
                icon={<PersonIcon />}
                label="Dashboard"
                href={`/dashboard/${userId}`}
              />
              <DropdownItem
                icon={<ChatBubbleLeftIcon className=" w-4 h-4" />}
                label="Chats"
                href={`/chat/${mostRecentChatId}`}
              />

              <Separator size={"4"} />
              <LogOutButton />
            </Flex>
          </Popover.Content>
        </Popover.Root>
      ) : (
        <LogInButton />
      )}
    </>
  );
};

export default UserOptions;
