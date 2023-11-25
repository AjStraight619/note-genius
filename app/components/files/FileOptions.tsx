import { addFileToChat } from "@/app/actions/chat-actions/chatActions";
import { useChatNavigation } from "@/context/ChatNavigationContext";
import { useFileContext } from "@/context/FileSelectionProvider";
import { StackIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import FileSelection from "./FileSelection";

type FileOptionsButtonProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const FileOptions = () => {
  const { fileDispatch, fileState } = useFileContext();
  const { currentChatId } = useChatNavigation();
  const [open, setOpen] = useState(false);
  const [processingFiles, setProcessingFiles] = useState(false);

  const handleOpenChange = () => {
    if (open) {
      setOpen(false);
      fileDispatch({ type: "NEW_FILE", payload: false });
    } else {
      return;
    }
  };

  const handleProcessFiles = async () => {
    console.log("in handle process files");
    const formData = new FormData();
    const fileReadPromises: Promise<void>[] = fileState.files.map((file) => {
      console.log("File details:", file.file, file.file?.type);
      // Return a promise for the file read operation
      return new Promise<void>((resolve, reject) => {
        // Make sure the file object exists before attempting to read it
        if (file.file && file.file.type === "text/plain") {
          console.log("in first if statement");
          const reader = new FileReader();
          reader.onload = () => {
            // Ensure the result is a string
            if (typeof reader.result === "string") {
              console.log(reader.result);
              formData.append("fileContents", reader.result);
              formData.append("fileNames", file.name);
              formData.append("fileIds", file.id);
              resolve();
            } else {
              reject(new Error("FileReader result is not a string."));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsText(file.file);
        } else {
          resolve();
        }
      });
    });

    setProcessingFiles(true);

    try {
      await Promise.all(fileReadPromises);

      const response = await addFileToChat(formData, currentChatId);
      console.log(response);
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setProcessingFiles(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <FileOptionsButton setOpen={setOpen} open={open} />
      </Dialog.Trigger>
      <Dialog.Content
        style={{ width: "400px", height: "400px" }}
        className="h-full flex flex-col relative"
      >
        <Dialog.Title className="flex justify-center items-center">
          File Options
        </Dialog.Title>

        <Flex
          direction={"column"}
          justify={fileState.files.length > 0 ? "start" : "center"}
          align={"center"}
          grow={"1"}
        >
          {fileState.files.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {fileState?.files?.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-row gap-2 justify-between items-center"
                >
                  <li>{file.name}</li>
                  <div className="w-6 h-6">
                    {processingFiles ? (
                      <VscLoading className="animate-spin" />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <Flex
              direction={"row"}
              gap={"2"}
              justify={"center"}
              align={"center"}
            >
              <Text>Add Files</Text>
              <FileSelection />
            </Flex>
          )}
        </Flex>
        {fileState.files.length ? (
          <>
            <div className="absolute bottom-2 left-2">
              <FileSelection />
            </div>
            <div className="absolute bottom-2 right-2">
              <Button onClick={handleProcessFiles} disabled={processingFiles}>
                {processingFiles ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Process Files"
                )}
              </Button>
            </div>
          </>
        ) : null}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FileOptions;

const FileOptionsButton = React.forwardRef<
  HTMLDivElement,
  FileOptionsButtonProps
>(({ setOpen, open }, ref) => {
  const { fileState, fileDispatch } = useFileContext();
  // Jumping animation when new files are successfully added to the stack

  const [spring, api] = useSpring(() => ({
    y: 0,
    config: {
      tension: 170,
      friction: 12,
    },
  }));

  useEffect(() => {
    if (!fileState.newFile || open) {
      api.stop();
      return;
    }
    api.start({
      reset: true,
      from: { y: 0 },
      to: async (next) => {
        await next({ y: -10 });
      },
      loop: true,
    });
  }, [api, fileState.newFile, open]);

  // on hover we will set new file to false essentially stopping the animation
  const stopOnHover = () => {
    fileDispatch({ type: "NEW_FILE", payload: false });
  };

  return (
    <animated.div style={{ ...spring }} onMouseEnter={stopOnHover} ref={ref}>
      <IconButton onClick={() => setOpen(true)} variant="ghost" asChild>
        <StackIcon className="w-6 h-6" />
      </IconButton>
    </animated.div>
  );
});

FileOptionsButton.displayName = "FileOptionsButton";
