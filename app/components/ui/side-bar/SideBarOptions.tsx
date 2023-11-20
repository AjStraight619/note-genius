"use client";
import { deleteChat } from "@/app/chat-actions/chatActions";
import { useChatNavigation } from "@/context/ChatNavigationContext";
import { useToast } from "@/context/ToastContext";
import {
  DotsHorizontalIcon,
  Link1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { useState } from "react";
import { Toast } from "../toast/Toast";

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
  const { currentChatId } = useChatNavigation();
  const [toastMessage, setToastMessage] = useState("");
  const { showToast } = useToast();

  const handleClose = () => {
    setOpen(false);
  };

  const testToast = async () => {
    console.log("test toast called");
    setToastMessage("Toast Success");
    handleClose();

    // Set a delay before clearing the toast message
    setTimeout(() => {
      setToastMessage("");
    }, 3000); // Delay of 3000 milliseconds (3 seconds)
  };

  const handleLink = () => {
    // Link action logic
  };

  const handleEdit = () => {
    // Edit action logic
  };

  const handleDelete = async () => {
    try {
      const deletedChat = await deleteChat(currentChatId);
      if (deletedChat) {
        setToastMessage(`Successfully deleted ${deletedChat.title}`);
        // Trigger the toast here with the title
      }
    } catch (error) {
      // Handle any errors, perhaps set a different toast message
    }
  };

  const options = [
    { Icon: Link1Icon, label: "Link", onClick: handleLink },
    { Icon: Pencil1Icon, label: "Edit", onClick: handleEdit },
    { Icon: TrashIcon, label: "Delete", onClick: testToast },
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

      {toastMessage && (
        <Toast title="Chat Deleted" content={toastMessage} duration={3000} />
      )}
    </>
  );
};

export default SideBarOptions;
