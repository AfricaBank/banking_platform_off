import { Flex, Box } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";
import { SimpleButton } from "../customButtons/SimpleButton.tsx";
import { SimpleIconButton } from "../customButtons/SimpleIconButton.tsx";
import { BoxIcon } from "../customButtons/BoxIcon.tsx";

interface ModuleActionHeaderProps {
  addLabel: string;
  onAddClick: () => void;
  onFilterToggle: () => void;
  isFilterActive?: boolean;
  showAddButton?: boolean;
  showFilterButton?: boolean;
}

export const ModuleActionHeader = ({
  addLabel,
  onAddClick,
  onFilterToggle,
  isFilterActive = false,
  showAddButton = true, // Par défaut affiché
  showFilterButton = true, // Par défaut affiché
}: ModuleActionHeaderProps) => {
  return (
    <Box bg="white" py={2} px={6} rounded="xl" shadow="sm" width="100%">
      <Flex justify="space-between" align="center">
        <Box flex="1" />

        <Flex gap={2} align="center">
          {showAddButton && (
            <SimpleButton onClick={onAddClick} colorPalette="blue" px={4}>
              <Flex align="center" gap={4}>
                <BoxIcon bg="white">
                  <LuPlus color="blue" />
                </BoxIcon>
                {addLabel}
              </Flex>
            </SimpleButton>
          )}

          {showFilterButton && (
            <SimpleIconButton
              aria-label="Filtrer"
              onClick={onFilterToggle}
              bg={isFilterActive ? "orange.100" : "orange.400"}
              color="white"
              _hover={{ bg: "orange.500", color: "white" }}
              size="md"
            >
              <FaFilter />
            </SimpleIconButton>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
