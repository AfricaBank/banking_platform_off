"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

// Définition de l'interface pour un élément d'information individuel
export interface InfoItem {
  label: string;
  value: string | number;
}

// Définition des Props attendues par le composant
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
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={4}
        px={4}
      >
        {items.map((item, index) => (
          <Flex key={index} gap={1.5} align="center" fontSize="sm">
            <Text color="gray.500" fontWeight="medium">
              {item.label} :
            </Text>
            <Text color="gray.800" fontWeight="semibold">
              {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
