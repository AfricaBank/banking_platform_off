import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut";
import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut.tsx";
import TaskManagement from "@/components/pageContents/TaskTable.tsx";
import { FiFolder, FiRefreshCw } from "react-icons/fi";

export const Dashboard = () => {
  return (
    <Box
      p={{ base: "4", md: "8" }}
      bg="gray.50"
      height="auto" // Permet au conteneur de s'ajuster fidèlement à la somme de tous les composants
      minHeight="100vh" // S'assure que le fond gris couvre tout l'écran s'il y a peu de lignes
      width="100%"
      maxWidth="100vw"
      overflowX="hidden"
    >
      {/* En-tête de section */}
      <Box mb="6">
        <Text fontSize="xl" fontWeight="bold" color="text.main" mb="1">
          Aperçu Des Dossiers
        </Text>
        <Box w="45px" h="3px" bg="text.main" borderRadius="full" />
      </Box>

      {/* Conteneur Flex pour les KPI et le Graphique */}
      <Flex
        direction={{ base: "column", xl: "row" }}
        gap="6"
        align="stretch"
        width="100%"
        mb="20" // Augmentation de la marge basse pour aérer l'espace avant le tableau
      >
        {/* KPI 1 : Total Dossiers */}
        <Box flexShrink={0} width={{ base: "100%", sm: "331px" }}>
          <CustomCardDashboardStat
            title="Total Dossiers"
            value={1200}
            percentage="+12%"
            icon={FiFolder}
            total={1200}
            iconBg="dogerBlue.400"
            progressColor="brandGreen.400"
          />
        </Box>

        {/* KPI 2 : Total Tâches en cours */}
        <Box flexShrink={0} width={{ base: "100%", sm: "331px" }}>
          <CustomCardDashboardStat
            title="Total Tâches en cours"
            value={600}
            percentage="-8%"
            icon={FiRefreshCw}
            total={1200}
            iconBg="orange.400"
            progressColor="orange.300"
          />
        </Box>

        {/* Conteneur du Graphique stabilisé */}
        <Box
          flex={1}
          width="100%"
          minWidth={0}
          height="350px" // Forcer une hauteur fixe ici aide Chart.js à se dessiner proprement
        >
          <NombreDossierParStatut />
        </Box>
      </Flex>

      {/* Le tableau est maintenant à l'intérieur du conteneur global */}
      <Box width="100%">
        <TaskManagement />
      </Box>
    </Box>
  );
};
