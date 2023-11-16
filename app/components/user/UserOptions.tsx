"use client";
import { Avatar, Box, Button, Popover, Separator } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { LogOutButton } from "../auth/auth";

const UserOptions = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <Button style={{ backgroundColor: "transparent" }}>
            <Avatar
              className="hover:cursor-pointer"
              fallback={`${userName?.charAt(0).toUpperCase() || ""}`}
              asChild
            />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Box grow={"1"}>
            <Separator size={"4"} />
            <LogOutButton />
          </Box>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default UserOptions;
