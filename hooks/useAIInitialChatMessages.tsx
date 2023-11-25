import { useState } from "react";

type useAIInitialChatMessagesProps = {
  currentChatId: string | null;
};

const useAIInitialChatMessages = ({
  currentChatId,
}: useAIInitialChatMessagesProps) => {
  const [shouldSendInitialInput, setShouldSendInitialInput] = useState(false);

  useEffect(() => {}, [messagesFromDb]);
};
