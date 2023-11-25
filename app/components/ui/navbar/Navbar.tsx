import UserOptions from "@/app/components/users/UserOptions";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";

const Navbar = async () => {
  return (
    <Box width={"100%"} className="border-b border-gray-600 h-16">
      <Flex
        justify={"between"}
        align={"center"}
        height={"100%"}
        px={"5"}
        className="z-10"
      >
        <div className="justify-start">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="just-end">
          <UserOptions />
          {"            "}
        </div>
      </Flex>
    </Box>
  );
};

export default Navbar;
