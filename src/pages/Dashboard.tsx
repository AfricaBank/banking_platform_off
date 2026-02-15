import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut.tsx";
import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut.tsx";
import { enCours, rejected } from "@/dataObject/graphicData.ts";
import { Box, Grid, GridItem } from "@chakra-ui/react";
export const Dashboard = () => {
  return (
    <Box width="100%" m="0" h="full">
      <Grid templateColumns="repeat(8, 1fr)" gap="6">
        <GridItem colSpan={3}>
          <CustomCardDashboardStat />
        </GridItem>
        <GridItem colSpan={3}>
          <CustomCardDashboardStat />
        </GridItem>
        <GridItem colSpan={2}>
          <NombreDossierParStatut inProgress={enCours} rejected={rejected} />
        </GridItem>
      </Grid>
    </Box>
  );
};
