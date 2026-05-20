import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { HiFilter } from "react-icons/hi";
import { SimpleButton } from "../customButtons/SimpleButton.tsx";

// Définition d'un bouton individuel
interface ActionButtonConfig {
  label: string;
  icon: IconType;
  to?: string;
  onClick?: () => void;
  bg?: string;
  hoverBg?: string;
  width?: string;
}

interface TableActionsBarProps {
  buttons: ActionButtonConfig[];
  onFilterClick?: () => void;
}

export const TableActionsBar: React.FC<TableActionsBarProps> = ({
  buttons,
  onFilterClick,
}) => {
  return (
    <Flex justifyContent="flex-end" mr={10} gap={4} wrap="wrap">
      {buttons.map((btn, index) => (
        <SimpleButton
          key={index}
          as={btn.to ? Link : "button"}
          to={btn.to}
          onClick={btn.onClick}
          bg={btn.bg || "dogerBlue.500"}
          color="white"
          width={btn.width || "auto"}
          _hover={{ bg: btn.hoverBg || "dogerBlue.600" }}
          px={2}
          py={4}
          rounded={10}
          w="120"
        >
          {/* Le carré blanc avec l'icône */}
          <Box
            bg="white"
            color={btn.bg || "dogerBlue.500"}
            borderRadius="md"
            p={1}
            mr="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="24px"
            w="24px"
          >
            <btn.icon />
          </Box>
          {btn.label}
        </SimpleButton>
      ))}

      {/* Bouton de filtre (souvent constant) */}
      <IconButton
        aria-label="Filtrer"
        size="md"
        bg="warnOrange.400"
        color="white"
        _hover={{ bg: "warnOrange.500" }}
        onClick={onFilterClick}
        rounded={10}
      >
        <HiFilter />
      </IconButton>
    </Flex>
  );
};
