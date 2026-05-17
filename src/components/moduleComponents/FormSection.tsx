import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  columns?: number;
}

export const FormSection = ({
  title,
  children,
  columns = 3,
}: FormSectionProps) => {
  return (
    <VStack align="stretch" gap={3} w="full">
      {/* Bannière grise de titre du sous-bloc */}
      <Box
        bg="gray.100"
        py={2}
        px={4}
        rounded="md"
        boxShadow="0 1px 6px rgba(0,0,0,0.10)"
      >
        <Text color="gray.600" fontSize="xs" fontWeight="semibold">
          {title}
        </Text>
      </Box>

      {/* Zone de contenu des champs en grille */}
      <Box bg="darkGrey.50" p={6} rounded="lg" w="full">
        <SimpleGrid
          columns={{ base: 1, md: columns > 2 ? 2 : columns, lg: columns }}
          columnGap={8}
          rowGap={5}
        >
          {children}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};
