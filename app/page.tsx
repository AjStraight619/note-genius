import { authOptions } from "@/utils/authOptions";
import { Card, Container, Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { LogInButton } from "./components/auth/auth";

import styles from "./animations.module.css"; // Import the animations styles

type FeatureSectionProps = {
  title: string;
  description: string;
  dynamic?: boolean; // Optional prop to determine if the section has dynamic background
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

export default async function Home() {
  const session = await getServerSession(authOptions);

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
    </Container>
  );
}
