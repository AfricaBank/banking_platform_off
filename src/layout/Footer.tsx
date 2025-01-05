import { Flex, Text, Image, Center } from "@chakra-ui/react";
import logo1 from "../assets/logo/AfricaBank-013.png";
export const Footer = () => {
  return (
    <Flex paddingTop={3} marginLeft="40%">
      <Center>
        <Image src={logo1} objectFit="cover" />
        <Text>FRICA BANK © 2023</Text>
      </Center>
    </Flex>
  );
};
