"use client";
import {
  deleteChat,
  getMostRecentChatAfterDeletion,
} from "@/app/actions/chat-actions/chatActions";
import { useChatNavigation } from "@/context/ChatNavigationContext";
import { useToast } from "@/context/ToastContext";
import {
  DotsHorizontalIcon,
  Link1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Option = ({ Icon, label, onClick }: any) => (
  <div className="justify-start flex flex-row gap-2">
    <IconButton variant="ghost" onClick={onClick}>
      <Icon />
    </IconButton>
    <Text size={"1"}>{label}</Text>
  </div>
);

const SideBarOptions = () => {
  const [open, setOpen] = useState(false);
  const { currentChatId, setCurrentChatId } = useChatNavigation();
  const { showToast } = useToast();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLink = () => {
    // Link action logic
  };

  const handleEdit = () => {
    // Edit action logic
  };

  const handleDelete = async () => {
    const deleteSuccessToastProps = {
      title: "Chat Deleted",
      content: "Toast Success",
      duration: 3000,
    };
    const deleteFailedToastProps = {
      title: "Failed to Delete Chat",
      content: "Failed",
      duration: 3000,
    };

    try {
      const deletedChat = await deleteChat(currentChatId);
      if (deletedChat) {
        showToast(deleteSuccessToastProps);
        const nextMostRecentChat = await getMostRecentChatAfterDeletion();
        if (nextMostRecentChat && nextMostRecentChat.id) {
          setCurrentChatId(nextMostRecentChat.id);
          router.push(`/chat/${nextMostRecentChat.id}`);
        } else {
          // In case there are no more chats after deletion
          setCurrentChatId(null);
          router.push("/chat");
        }
      } else {
        showToast(deleteFailedToastProps);
        setCurrentChatId(null);
        router.push("/chat");
      }
    } catch (error) {
      console.log("Error in deleting chat:", error);
      showToast(deleteFailedToastProps);
    } finally {
      // Delay closing the options to allow the toast to be seen
      setTimeout(() => {
        handleClose();
      }, 3000); // Delay matches the toast duration
    }
  };

  const options = [
    { Icon: Link1Icon, label: "Link", onClick: handleLink },
    { Icon: Pencil1Icon, label: "Edit", onClick: handleEdit },
    { Icon: TrashIcon, label: "Delete", onClick: handleDelete },
  ];

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <IconButton variant={"ghost"}>
            <DotsHorizontalIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction={"column"} gap={"2"} width={"100%"} p={"2"}>
            {options.map((option, index) => (
              <Option key={index} {...option} />
            ))}
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default SideBarOptions;
