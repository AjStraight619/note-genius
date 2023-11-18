import { ScrollArea } from "@radix-ui/themes";

const TestChatPage = () => {
  // Dummy chat messages for testing
  const messages = Array(50).fill('Sample message');

  return (
    <main className="flex justify-center items-center h-screen">
      <ScrollArea>
        <div className="flex flex-col w-full max-w-md mx-auto">
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <p key={index} className="mb-2 text-center">{msg}</p>
            ))}
          </div>
          <div className="p-4 bg-gray-200">
            <form className="flex items-center">
              <input
                type="text"
                className="flex-grow p-2 mr-2 border rounded"
                placeholder="Type a message..."
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Send
              </button>
            </form>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default TestChatPage;
