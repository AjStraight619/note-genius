// import { ChatWithMessages } from "@/types/chatTypes";
// import { useEffect, useOptimistic, useState } from "react";

// type useOptimisticContentProps = {
//   messagesFromDb: ChatWithMessages | null;
// };
// export const useOptimisticContent = ({
//   messagesFromDb,
// }: useOptimisticContentProps) => {
//     let fileContentMessages;
//   const [currentContent, setCurrentContent] = useState<ChatWithMessages | null>(
//     null
//   );

//   useEffect(() => {
//      fileContentMessages = messagesFromDb?.chatMessages
//       .filter((msg) => msg.fileContent)
//       .map((msg) => msg.content);
//   }, [messagesFromDb]);

//   const [optimisticContent, addOptimisticContent] = useOptimistic<ChatWithMessages | null>(null);
// };
