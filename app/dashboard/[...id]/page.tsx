import { prisma } from "@/lib/prisma";

const getUserName = async (userId: string) => {
  "use server";
  const userName = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });
  return userName;
};

const Dashboard = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  console.log("This is the user id in dashboard", userId);
  let userName = "";
  // const userName = (await getUserName(userId)) as unknown as string;

  return <div></div>;
};

export default Dashboard;
