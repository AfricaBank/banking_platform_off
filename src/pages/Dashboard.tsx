import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import BlocInfosGenerales from "@/components/blocInfos/BlocInfosGenerales";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { collectionList } from "@/dataObject/ListCollection";
import { SimpleButton } from "@/components/customButtons/SimpleButton";
import { Box, Text } from "@chakra-ui/react";
import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut";
export const Dashboard = () => {
  return (
    <>
      <BlocInfosGenerales />
      <CustomCardDashboardStat />
      <Box>
        <Text>je suis dashboard</Text>
        <CustomDatePicker nomDuChamp="Date de naissance" />
        <DropDownList  collection={collectionList} label="Pays"/>
        <Box
          display="flex"
          width="25%"
          marginTop="20px"
          justifyContent="space-around"
        >
          <SimpleButton colorPalette="">Enregistrer le brouillon</SimpleButton>
          <SimpleButton variant="outline">Annuler</SimpleButton>
          <SimpleButton colorPalette="">Suivant</SimpleButton>
        </Box>
      </Box>
    </>
  );
};
