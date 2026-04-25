import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SimpleButton } from "../customButtons/SimpleButton";
import { LuSearch, LuRefreshCw } from "react-icons/lu";

interface FilterContainerProps {
  children: ReactNode;
  onSearch: () => void;
  onReset: () => void;
  searchLabel?: string;
  resetLabel?: string;
}

export const FilterContainer = ({
  children,
  onSearch,
  onReset,
  searchLabel = "Rechercher",
  resetLabel = "Réinitialiser",
}: FilterContainerProps) => {
  return (
    <Box bg="white" p={8} rounded="xl" shadow="md" width="100%" mt={4}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        columnGap={10}
        rowGap={6}
        alignItems="flex-start"
      >
        {children}
      </SimpleGrid>

      {/* Zone des boutons alignée à droite */}
      <Flex mt={8} justify="flex-end" gap={4}>
        <SimpleButton onClick={onSearch} colorPalette="blue" px={8}>
          <Flex align="center" gap={2}>
            <LuSearch />
            {searchLabel}
          </Flex>
        </SimpleButton>

        <SimpleButton
          onClick={onReset}
          variant="outline"
          colorPalette="red"
          px={8}
        >
          <Flex align="center" gap={2}>
            <LuRefreshCw />
            {resetLabel}
          </Flex>
        </SimpleButton>
      </Flex>
    </Box>
  );
};
