import { Box, Flex } from "@radix-ui/themes";
import UserOptions from "../user/UserOptions";

const Navbar = async () => {
  return (
    <Box width={"100%"} height={"9"} className="border-b border-gray-600">
      <Flex justify={"end"} align={"center"} height={"100%"} px={"5"}>
        <UserOptions />
        {"            "}
      </Flex>
    </Box>
  );
};

export default Navbar;
