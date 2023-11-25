import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { EnterIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./animations.module.css";
import Navbar from "./components/ui/navbar/Navbar";

type FeatureSectionProps = {
  title: string;
  description: string;
  dynamic?: boolean;
};

const FeatureSection = ({
  title,
  description,
  dynamic,
}: FeatureSectionProps) => (
  <Card
    className={dynamic ? styles.dynamicBackground : ""}
    style={{ height: "300px", width: "200px" }}
  >
    <Text size={"8"} weight="bold" className="font-bold">
      {title}
    </Text>
    <Text size={"5"} as="p" mt={"2"}>
      {description}
    </Text>
  </Card>
);

const getMostRecentChat = async (userId: string | undefined) => {
  "use server";
  if (!userId) {
    redirect("/api/auth/signin");
  }
  const mostRecentChat = prisma.chat.findFirst({
    where: {
      userId: userId,
    },

    orderBy: {
      updatedAt: "desc",
    },

    select: {
      id: true,
    },
  });

  return mostRecentChat;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  let userId;

  if (session) {
    const user = session.user as User;
    userId = user.id as unknown as string;
    console.log(userId);
  }

  const mostRecentChat = await getMostRecentChat(userId);

  return (
    <>
      <Flex direction={"column"} gap={"4"} height={"100%"}>
        <Navbar />

        <Flex justify={"center"} align={"center"} mb={"5"}>
          <Card className="shadow-indigo-900 shadow-lg">
            <div className="flex justify-center items-center h-full w-full">
              <div className="relative p-4 max-w-xl text-center">
                <h1 className="text-white text-4xl font-bold mb-2">
                  Streamline Your Note-Taking
                </h1>
                <p className="text-white text-lg">
                  Elevate productivity with our AI-powered note organization and
                  math problem-solving tools. Convert handwritten notes to text
                  and easily share your ideas in various formats.
                </p>

                <div className="flex mt-4 gap-5 justify-center">
                  {session ? (
                    <Button size={"3"}>
                      <Link href={`/chat/${mostRecentChat?.id}`}>
                        <div className="flex flex-row justify-center items-center gap-2">
                          Chats
                          <EnterIcon />
                        </div>
                      </Link>
                    </Button>
                  ) : (
                    <Button size={"3"}>
                      <Link href={`/api/auth/signin`} />
                      Sign up
                      <EnterIcon />
                    </Button>
                  )}
                  <Button size={"3"} variant={"outline"}>
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}
