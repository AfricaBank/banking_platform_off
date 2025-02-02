import { Flex, Text, Box, Icon, Spacer } from "@chakra-ui/react";
import { FaFolderClosed } from "react-icons/fa6";

export const CustomCardDashboardStat = () => {
  return (
    <>
      <Box
        maxWidth="331px"
        m="10"
        borderRadius="md"
        minHeight="170px"
        p="10px"
        boxShadow="5px 5px 10px rgba(0, 0, 0, 0.1)"
        height="169px"
      >
        <Flex>
          <Box
            borderRadius="10px"
            bg="primary.dogerBlue.300"
            p="4"
            height="62px"
            marginTop="10px"
          >
            <Icon color="white" fontSize="30px">
              <FaFolderClosed />
            </Icon>
          </Box>
          <Box ml="3">
            <Text mt="2">Total Dossier </Text>
            <Text fontSize="xl">
              1200
              <sup
                style={{
                  verticalAlign: "super",
                  color: "#00A887",
                  fontSize: "13px",
                }}
              >
                +12%
              </sup>
            </Text>
          </Box>
        </Flex>
        <Box position="relative" mt="28px">
          <Flex>
            <Text color="secondary.green.300">0</Text>
            <Spacer />
            <Text color="secondary.green.300">1200</Text>
          </Flex>
          <Box bg="secondary.green.300" h="8px" w="100%" rounded="md" />
        </Box>
      </Box>
    </>
  );
};
