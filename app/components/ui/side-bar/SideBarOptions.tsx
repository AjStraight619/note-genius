"use client";
import { deleteChat } from "@/app/chat-actions/chatActions";
import { useChatNavigation } from "@/context/ChatNavigationContext";
import { useToast } from "@/context/ToastContext";
import { ChatMetaData } from "@/types/metaDataTypes";
import {
  DotsHorizontalIcon,
  Link1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { useState } from "react";

const Option = ({ Icon, label, onClick }: any) => (
  <div className="justify-start flex flex-row gap-2">
    <IconButton variant="ghost" onClick={onClick}>
      <Icon />
    </IconButton>
    <Text size={"1"}>{label}</Text>
  </div>
);

type SideBarOptionsProps = {
  addOptimisticChats: (newChat: ChatMetaData) => void;
  chats: ChatMetaData[];
};

const SideBarOptions = ({ addOptimisticChats, chats }: SideBarOptionsProps) => {
  const [open, setOpen] = useState(false);
  const { currentChatId, setCurrentChatId } = useChatNavigation();
  const { showToast } = useToast();

  // const removeOptimisticChat = (chatId: string | null) => {
  //   const updatedChats = chats.filter((chat) => chat.id !== chatId);
  //   console.log(
  //     "These are the updated chats after the deletion, ",
  //     updatedChats
  //   );
  //   updatedChats.forEach((chat) => addOptimisticChats(chat));
  // };

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
    const toastProps = {
      title: "Chat Deleted",
      content: "Toast Success",
      duration: 3000,
    };
    try {
      console.log("In try for delete");
      // removeOptimisticChat(currentChatId);
      const deletedChat = await deleteChat(currentChatId);
      if (deletedChat) {
        showToast(toastProps);
        handleClose();
      }
    } catch (error) {
      console.log("in the error function");
      console.log(error);
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
