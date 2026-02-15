import { Grid, GridItem, Text, Flex, Icon } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu"; // Import de l'icône profil
import { RiArrowRightLine } from "react-icons/ri";
import { TfiAlignRight } from "react-icons/tfi";
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
import { BoxIcon } from "@/components/customButtons/BoxIcon";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" bg="transparent">
        <GridItem colSpan={1} height="4rem">
          <Flex
            marginTop="25px"
            marginLeft="10px"
            onClick={toggleSidebar}
            cursor="pointer"
            color="text.main"
            _hover={{ color: "sidebar.itemActive" }}
            transition="color 0.2s"
          >
            <Icon fontSize="xl">
              <TfiAlignRight />
            </Icon>
          </Flex>
        </GridItem>

        <GridItem colStart={3} colSpan={3} height="4em">
          <Flex
            align="center"
            gap="4"
            justify="flex-end"
            marginTop="12px"
            marginRight="40px"
          >
            <SelectRoot
              collection={applicationLanguages}
              size="xs"
              width="200px"
            >
              <SelectTrigger>
                <SelectValueText placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                {applicationLanguages.items.map((languageName) => (
                  <SelectItem item={languageName} key={languageName.value}>
                    {languageName.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            {/* Bouton Profil mis à jour */}
            <SimpleIconButton
              aria-label="User Profile"
              color="white"
              borderRadius="full" // Optionnel : souvent les boutons profils sont ronds
              _hover={{ bg: "dogerBlue.600" }}
              bg="sidebar.itemActive"
            >
              <Icon fontSize="lg">
                <LuUser />
              </Icon>
            </SimpleIconButton>

            <Text fontWeight="bold" color="text.main">
              Username
            </Text>

            <SimpleButton
              size="sm"
              borderRadius="lg"
              bg="sidebar.itemActive"
              color="white"
              px="4"
              _hover={{ bg: "dogerBlue.600" }}
            >
              Deconnexion
              <BoxIcon
                width="20px"
                height="20px"
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                ml="2"
              >
                <Icon color="sidebar.itemActive" fontSize="xs">
                  <RiArrowRightLine />
                </Icon>
              </BoxIcon>
            </SimpleButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};
