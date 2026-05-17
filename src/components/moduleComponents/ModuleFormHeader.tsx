import { Box, Text } from "@chakra-ui/react";

interface ModuleFormHeaderProps {
  title: string;
}

export const ModuleFormHeader = ({ title }: ModuleFormHeaderProps) => {
  return (
    <Box
      w="full"
      bg="white"
      py={5}
      px={6}
      rounded="lg"
      boxShadow="0 1px 10px rgba(0,0,0,0.15)"
      display="flex"
      alignItems="center"
    >
      <Text color="gray.700" fontSize="sm" fontWeight="medium">
        {title}
      </Text>
    </Box>
  );
};
