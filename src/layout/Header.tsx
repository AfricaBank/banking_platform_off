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

export const Header = () => {
  return (
    <>
      <Grid templateColumns="repeat(7, 1fr)">
        <GridItem colSpan={1} height="4rem">
          <Flex marginTop="25px" marginLeft="10px">
            <Icon>
              <TfiAlignRight />
            </Icon>
          </Flex>
        </GridItem>
        <GridItem colStart={4} colSpan={4} height="4em">
          <Flex
            align="center"
            gap="4"
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
              <LuSearch />
            </SimpleIconButton>
            <Text>Username </Text>
            <SimpleButton
              colorPalette="primary.dogerBlue.102"
              size="xs"
              borderRadius="7px"
              bg="primary.dogerBlue.102"
            >
              Deconnexion{" "}
              <BoxIcon>
                <RiArrowRightLine color="blue" />
              </BoxIcon>
            </SimpleButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};
