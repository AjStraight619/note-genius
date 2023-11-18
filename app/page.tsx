import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { Card, Container, Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./animations.module.css";
import { LogInButton } from "./components/auth/auth";

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
  const mostRecentChat = prisma.chat.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: "desc",
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

  // Maybe call redirect here on the most recent chat?

  return (
    <Container size={"4"} mx={"auto"} my={"9"} px={"2"}>
      <Flex
        direction="row"
        gap={"6"}
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
      >
        {/* Feature Sections */}

        <FeatureSection
          title="🗂 Note Organization"
          description="Organize your notes in folders with tag and search functionalities."
          dynamic // This will have the dynamic background
        />
        <FeatureSection
          title="🤖 GPT-4 Integration"
          description="Utilize GPT-4 for rephrasing, summarizing, and expanding notes."
        />
        <FeatureSection
          title="➗ Math Tutor"
          description="Solve math problems with Symbolab/Wolfram Alpha and get detailed explanations from GPT-4."
        />
        <FeatureSection
          title="📝 Handwritten Notes"
          description="Upload and convert handwritten notes to text using Google Vision API."
        />
        <FeatureSection
          title="📤 Exportable Notes"
          description="Export notes in various formats for easy sharing and organizing."
        />
        {/* ... Other FeatureSections */}
      </Flex>

      {!session && (
        <Flex justify="center" mt={"9"}>
          <LogInButton />
        </Flex>
      )}

      <Link href={`/chat/`}>Go to chats</Link>
    </Container>
  );
}
