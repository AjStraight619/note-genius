"use client";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Flex, Popover, Separator } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogInButton, LogOutButton } from "../auth/auth";

type DropDownItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
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

const UserOptions = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userId = user?.id;
  const userName = user?.name;
  const [mostRecentChatId, setMostRecentChatId] = useState(null);

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
      {session ? (
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
