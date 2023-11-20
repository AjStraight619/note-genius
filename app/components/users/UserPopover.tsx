"use client";
import { Avatar, Box, Button, Popover, Separator } from "@radix-ui/themes";
import { LogOutButton } from "../auth/auth";
type UserPopoverProps = {
  userName: string | null;
  mostRecentChat: string | undefined;
};

const UserPopover = ({ userName, mostRecentChat }: UserPopoverProps) => {
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

export default UserPopover;
