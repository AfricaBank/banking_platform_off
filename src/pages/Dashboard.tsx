import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import BlocInfosGenerales from "@/components/blocInfos/BlocInfosGenerales";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { SimpleButton } from "@/components/customButtons/SimpleButton";
import { Box, Text } from "@chakra-ui/react";
import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut";
import {codeSiege} from "@/dataObject/ListCollection.ts";
import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut.tsx";
import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut.tsx";
import { enCours, rejected } from "@/dataObject/graphicData.ts";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { Text } from "@chakra-ui/react";
import TaskManagement from "@/components/pageContents/TaskTable.tsx";

export const Dashboard = () => {
  return (
    <>
      <Box
        width="100%"
        m="0"
        h="auto"
        display="flex"
        bg="darkGrey.50"
        rounded="20px"
        mb="20px"
      >
        <Box width="50%">
          <Box m="20px">Aperçu des dossiers </Box>
          <Box
            m="20px"
            w="40px"
            h="8px"
            bg="black"
            rounded="lg"
            mt="-15px"
          ></Box>
          <Grid templateColumns="repeat(8, 1fr)" gap="6" ml={6}>
            <GridItem colSpan={3}>
              <CustomCardDashboardStat
                title="Total Dossier"
                value="1200"
                percentage="+12%"
                icon={FaFolder}
                iconBg="dogerBlue.400"
                progressColor="brandGreen.400"
              />
            </GridItem>
            <GridItem colSpan={3}>
              <CustomCardDashboardStat
                title="Total Dossier"
                value="1200"
                percentage="+12%"
                icon={AiOutlineReload}
                iconBg="warnOrange.300"
                progressColor="warnOrange.300"
              />
            </GridItem>
          </Grid>
        </Box>
        <Box width="50%">
          <NombreDossierParStatut inProgress={enCours} rejected={rejected} />
        </Box>
      </Box>
      <Box>
        <Text>je suis dashboard</Text>
        <CustomDatePicker nomDuChamp="Date de naissance" />
        <DropDownList
          label="Pays"
          collection={codeSiege}
          highlightColor="cyan.100"
          withIndicator={true}
          placeholder="Choisir un pays "
        />
        <DropDownList
          label="Pays"
          collection={codeSiege}
          highlightColor="cyan.100"
          withIndicator={true}
          placeholder="Choisir un pays "
        />
        <Box
          display="flex"
          width="25%"
          marginTop="20px"
          justifyContent="space-around"
        >
          <SimpleButton colorPalette="">Enregistrer le brouillon</SimpleButton>
          <SimpleButton variant="outline">Annuler</SimpleButton>
          <SimpleButton colorPalette="">Suivant</SimpleButton>
        <Box display="flex" gap={10} m={4}>
          <Box>
            <Text textStyle="md" fontWeight="bold">
              Liste des dossiers et taches
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Box w="10px" h="10px" bg="dodgerblue" rounded={5}></Box>
            <Text>En cours .. </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Box w="10px" h="10px" bg="dodgerblue" rounded={5}></Box>
            <Text>Complet</Text>
          </Box>
        </Box>
        <TaskManagement />
      </Box>
    </>
  );
};
