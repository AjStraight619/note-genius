"use client";
import { FileAction, FileState as StateForFiles } from "@/types/fileTypes";
import React, { createContext, useContext, useReducer } from "react";

// Define the shape of the context data
type FileContextType = {
  fileState: StateForFiles;
  fileDispatch: React.Dispatch<FileAction>;
};

// Provide a default value
const defaultContextValue: FileContextType = {
  fileState: {
    files: [],
    processing: false,
    links: [],
  },
  fileDispatch: () => {},
};

// Create the context with the default value
const FileContext = createContext<FileContextType>(defaultContextValue);

// Define the props for FileProvider
type FileProviderProps = {
  children: React.ReactNode;
};

// reducer function related to state of files
function reducer(state: StateForFiles, action: FileAction): StateForFiles {
  const { files, links } = state;

  switch (action.type) {
    case "ADD_FILE":
      return { ...state, files: [...files, ...action.payload] };

    case "REMOVE_FILE":
      return {
        ...state,
        files: files.filter((file) => file.id !== action.payload.fileId),
      };

    case "UPDATE_FILE":
      return {
        ...state,
        files: files.map((file) =>
          file.id === action.payload.id ? action.payload : file
        ),
      };

    case "ADD_LINK":
      return { ...state, links: [...(links || []), ...action.payload] };

    case "REMOVE_LINK":
      const { chatId, fileId } = action.payload;
      return {
        ...state,
        links: links?.filter(
          (link) => link.chatId !== chatId || link.fileId !== fileId
        ),
      };

    case "UPDATE_LINK":
      const { oldLink, newLink } = action.payload;
      return {
        ...state,
        links: links?.map((link) =>
          link.chatId === oldLink.chatId && link.fileId === oldLink.fileId
            ? newLink
            : link
        ),
      };

    case "PROCESSING_FILE":
      const { fileId: processingFileId, processing } = action.payload;
      return {
        ...state,
        files: files.map((file) =>
          file.id === processingFileId ? { ...file, processing } : file
        ),
      };

    case "NEW_FILE":
      return { ...state, newFile: action.payload };

    default:
      return state;
  }
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const initialState: StateForFiles = {
    files: [],
    processing: false,
    links: [],
  };

  const [fileState, fileDispatch] = useReducer(reducer, initialState);

  return (
    <FileContext.Provider value={{ fileState, fileDispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
