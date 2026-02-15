import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut.tsx";
import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut.tsx";
import { enCours, rejected } from "@/dataObject/graphicData.ts";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
export const Dashboard = () => {
  return (
    <Box width="100%" m="0" h="auto" display="flex" bg="darkGrey.50">
      <Box width="50%">
        <Box m="20px">je suis le titre </Box>
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
  );
};
