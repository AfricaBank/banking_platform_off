import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomCardDashboardStat } from "@/components/pageContents/CustomCardDashboardStatut";
import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut.tsx";
import TaskManagement from "@/components/pageContents/TaskTable.tsx";
import { FiFolder, FiRefreshCw } from "react-icons/fi";

export const Dashboard = () => {
  return (
    <Box
      p={{ base: "4", md: "6", lg: "8" }}
      bg="gray.50"
      height="auto"
      minHeight="100vh"
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

      {/* Conteneur principal des statistiques */}
      <Flex
        direction={{ base: "column", xl: "row" }} // Utilisation de 'xl' pour basculer sur les écrans plus larges et éviter l'écrasement sur 15"
        gap="6"
        align="stretch"
        width="100%"
        mb="10"
      >
        {/* KPI 1 : Total Dossiers */}
        <Box
          flex={{ base: "1", xl: "1" }} // Proportion équilibrée
          minW={{ base: "100%", sm: "300px" }} // Augmentation de la largeur minimale pour empêcher la coupure du texte
          width="100%"
        >
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
        <Box
          flex={{ base: "1", xl: "1" }}
          minW={{ base: "100%", sm: "300px" }} // Ajustement identique pour garder une symétrie parfaite
          width="100%"
        >
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

        <Box
          flex={{ base: "1", xl: "2" }}
          width="100%"
          minWidth={0}
          height="450px"
          overflow="hidden"
        >
          <NombreDossierParStatut />
        </Box>
      </Flex>
      <Box width="100%">
        <TaskManagement />
      </Box>
    </Box>
  );
};
