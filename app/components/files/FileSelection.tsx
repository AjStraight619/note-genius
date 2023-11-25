"use client";
import { useFileContext } from "@/context/FileSelectionProvider";
import { UIFile } from "@/types/fileTypes";
import React, { useRef } from "react";

import { PaperClipIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip } from "@radix-ui/themes";

type FileSelectionProps = {
  className?: string;
};

type AddFileButtonProps = {
  onClick: () => void;
  className?: string;
};

const FileSelection = ({ className }: FileSelectionProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { fileDispatch, fileState } = useFileContext();

  const isDuplicateFile = (newFile: File): boolean => {
    return fileState.files.some(
      (existingFile) => existingFile.name === newFile.name
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files: UIFile[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!isDuplicateFile(file)) {
          files.push({
            id: file.name,
            name: file.name,
            file,
            content: null,
            type: null,
            s3Path: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            folderId: null,
            processed: null,
            math: false,
            userId: "",
            noteId: null,
          });
        }
      }
      if (files.length > 0) {
        console.log("adding files to dispatch");
        fileDispatch({ type: "ADD_FILE", payload: files });
        fileDispatch({ type: "NEW_FILE", payload: true });
      }
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        multiple
        onChange={handleFileChange}
        hidden
      />
      <AddFileButton
        onClick={() => fileRef.current?.click()}
        className={className}
      />
    </>
  );
};

export default FileSelection;

const AddFileButton = React.forwardRef<HTMLButtonElement, AddFileButtonProps>(
  ({ onClick, className }, ref) => {
    return (
      <Tooltip content="Add file">
        <IconButton
          radius="medium"
          variant="ghost"
          className={`${className} hover:cursor-pointer`}
          size={"1"}
          onClick={onClick}
          ref={ref}
        >
          <PaperClipIcon className="h-6 w-6" />
        </IconButton>
      </Tooltip>
    );
  }
);

AddFileButton.displayName = "AddFileButton";
