import Chat from "./Chat";

export const runtime = "edge";

const ChatComponentContainer = () => {
  return (
    <>
      <main className="container flex mx-auto relative p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <Chat />
      </main>
    </>
  );
};

export default ChatComponentContainer;
