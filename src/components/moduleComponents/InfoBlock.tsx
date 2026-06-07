"use client";
import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";

export interface InfoItem {
  label: string;
  value: string | number;
}

interface InfoBlockProps {
  items: InfoItem[];
}

export const InfoBlock = ({ items }: InfoBlockProps) => {
  return (
    <Box
      width="100%"
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={5}
      boxShadow="sm"
    >
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        rowGap={5}
        width="100%"
        px={4} 
      >
        {items.map((item, index) => {
          const positionInRow = index % 3;

          return (
            <Box
              key={index}
              width="100%"
              justifySelf={{
                base: "start",
                md: positionInRow === 0 ? "start" : positionInRow === 1 ? "center" : "end",
              }}
            >
              <Flex 
                gap={1.5} 
                align="center" 
                fontSize="sm"
                py={{ base: 1, md: 0 }} // Léger espacement vertical sur mobile pour l'aération
              >
                <Text color="gray.500" fontWeight="medium" whiteSpace="nowrap">
                  {item.label} :
                </Text>
                <Text color="gray.800" fontWeight="semibold">
                  {item.value}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};