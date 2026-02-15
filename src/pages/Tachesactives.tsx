import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut";
import { enCours, rejected } from "@/dataObject/graphicData";
import { Box } from "@chakra-ui/react";

export const Tachesactives = () => {
  return (
    <Box>
      Tâches actives
      <NombreDossierParStatut inProgress={enCours} rejected={rejected} />
    </Box>
  );
};
