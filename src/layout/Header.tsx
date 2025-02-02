import { Grid, GridItem, Text, Flex, Icon } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { RiArrowRightLine } from "react-icons/ri";
import { TfiAlignRight } from "react-icons/tfi";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { applicationLanguages } from "@/serviceLogic/languages";
import { SimpleIconButton } from "@/components/customButtons/SimpleIconButton";
import { SimpleButton } from "@/components/customButtons/SimpleButton";
import { BoxIcon } from "@/components/customButtons/BoxIcon";

export const Header = ({ toggleSidebar }) => {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1} height="4rem">
          <Flex marginTop="25px" marginLeft="10px" onClick={toggleSidebar} cursor="pointer">
            <Icon>
              <TfiAlignRight />
            </Icon>
          </Flex>
        </GridItem>
        <GridItem colStart={3} colSpan={3} height="4em">
          <Flex
            align="center"
            gap="2"
            justify="space-around"
            marginTop="12px"
            marginRight="120px"
          >
            <SelectRoot
              collection={applicationLanguages}
              size="xs"
              width="310px"
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
            <SimpleIconButton aria-label="Search database">
              <Icon>
                <LuSearch />
              </Icon>
            </SimpleIconButton>
            <Text>Username </Text>
            <SimpleButton
              size="xs"
              borderRadius="7px"
              bg="primary.dogerBlue.102"
            >
              Deconnexion{" "}
              <BoxIcon width="20px" height="20px" bg="white">
                <Icon color="primary.dogerBlue.102">
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
