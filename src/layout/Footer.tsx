import { Flex, Text, Image, Box } from "@chakra-ui/react";
import logo1 from "../assets/logo/AfricaBank-013.png";
export const Footer = () => {
  return (
    <Box display="flex" justifyContent="center" pt="10px">
      <Image src={logo1} />
      <Text>FRICA BANK © 2023</Text>
    </Box>
  );
};
