import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

const getChatMetaData = async (userId: string | undefined) => {
  "use server";
  const chatMetaData = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  console.log(chatMetaData);

  return chatMetaData;
};

const Page = async () => {
  let userId;
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    const user = session.user as User;
    if (user) {
      userId = user.id;
    }
  }

  const chatMetaData = await getChatMetaData(userId);
  return (
    <div>
      {chatMetaData.map((chat, idx) => (
        <div key={idx}>Chat ID: {chat.id}</div>
      ))}
    </div>
  );
};

export default Page;
