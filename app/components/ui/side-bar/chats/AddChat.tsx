"use client";

import { addChat } from "@/app/actions/chat-actions/chatActions";
import { ChatMetaData } from "@/types/metaDataTypes";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  TextFieldInput,
} from "@radix-ui/themes";
import { useRef, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";

type AddChatProps = {
  addOptimisticChats: (newChat: ChatMetaData) => void;
};

const AddChat = ({ addOptimisticChats }: AddChatProps) => {
  const [chatTitle, setChatTitle] = useState("");
  const chatTitleRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft">
          New Chat
          <PlusIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          gap={"2"}
        >
          <Heading mb={"4"}>New Chat</Heading>

          <form
            ref={chatTitleRef}
            action={async (formData) => {
              chatTitleRef.current?.reset();
              handleClose();
              addOptimisticChats({
                id: "",
                title: formData.append(
                  "chatTitle",
                  chatTitle
                ) as unknown as string,
              });

              await addChat(formData);
            }}
          >
            <TextFieldInput
              placeholder="Name this chat..."
              name="chatTitle"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
            />
            <div className="flex justify-center items-center mt-3">
              <SubmitButton>Add Chat</SubmitButton>
            </div>
          </form>
        </Flex>

        <Dialog.Close>
          <IconButton
            variant="ghost"
            className="absolute top-2 right-2 hover:cursor-pointer"
            onClick={handleClose}
          >
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddChat;
