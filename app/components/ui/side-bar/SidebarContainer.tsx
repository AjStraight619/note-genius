import { Box, Flex } from "@radix-ui/themes";

type SideBarProps = {
  children: React.ReactNode;
};

const SidebarContainer = ({ children }: SideBarProps) => {
  return (
    <Box
      className="border-r border-gray-600"
      style={{
        height: "93vh",
        overflowY: "auto",
        maxWidth: "250px",
        width: "20vw",
        minWidth: "150px",
      }}
    >
      <Flex direction="column" justify="start" align="center" height={"100%"}>
        {children}
      </Flex>
    </Box>
  );
};

export default SidebarContainer;
