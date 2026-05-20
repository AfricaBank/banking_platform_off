import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import { LuUser, LuLogOut } from "react-icons/lu"; // Remplacement par les icônes exactes
import { FiMenu } from "react-icons/fi"; // Icône hamburger conforme au visuel
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { applicationLanguages } from "@/dataObject/languages";
import { SimpleIconButton } from "@/components/customButtons/SimpleIconButton";
import { SimpleButton } from "@/components/customButtons/SimpleButton";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <Flex w="full" h="full" align="center" justify="space-between" bg="white">
      {/* 1. BLOC GAUCHE : Bouton de réduction de la Sidebar */}
      <Flex
        align="center"
        justify="center"
        cursor="pointer"
        color="gray.600"
        _hover={{ color: "dogerBlue.500" }}
        transition="color 0.2s"
        onClick={toggleSidebar}
        p={2}
      >
        <Icon fontSize="22px">
          <FiMenu />
        </Icon>
      </Flex>

      {/* 2. BLOC DROITE : Sélections et actions utilisateurs */}
      <Flex align="center" gap={6}>
        {/* Sélecteur de langue épuré */}
        <SelectRoot collection={applicationLanguages} size="sm" width="110px">
          <SelectTrigger
            border="none"
            bg="transparent"
            p={0}
            _focus={{ boxShadow: "none" }}
          >
            <SelectValueText placeholder="Français" />
          </SelectTrigger>
          <SelectContent>
            {applicationLanguages.items.map((languageName) => (
              <SelectItem item={languageName} key={languageName.value}>
                {languageName.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {/* Ligne de séparation fine (visible discrètement sur la maquette) */}
        <Box h="24px" w="1px" bg="gray.200" />

        {/* Informations de l'utilisateur connecté */}
        <Flex align="center" gap={3}>
          <SimpleIconButton
            aria-label="User Profile"
            color="white"
            borderRadius="md"
            bg="dogerBlue.500"
            _hover={{ bg: "dogerBlue.600" }}
            h="36px"
            w="36px"
          >
            <Icon fontSize="md">
              <LuUser />
            </Icon>
          </SimpleIconButton>

          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
            John Doe
          </Text>
        </Flex>

        {/* Deuxième ligne de séparation fine */}
        <Box h="24px" w="1px" bg="gray.200" />

        {/* Bouton Déconnexion conforme au visuel */}
        <SimpleButton
          size="md"
          borderRadius="md"
          bg="dogerBlue.500"
          color="white"
          px={5}
          h="38px"
          fontSize="xs"
          fontWeight="medium"
          _hover={{ bg: "dogerBlue.600" }}
          display="flex"
          alignItems="center"
          gap={3}
        >
          Deconnexion
          {/* Carré blanc interne enveloppant l'icône de sortie */}
          <Box
            width="22px"
            height="22px"
            bg="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon color="dogerBlue.500" fontSize="xs">
              <LuLogOut />
            </Icon>
          </Box>
        </SimpleButton>
      </Flex>
    </Flex>
  );
};
