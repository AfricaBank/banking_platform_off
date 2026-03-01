import { Box, Flex, Text } from "@chakra-ui/react";
import KpiCard from "./KpiCard";
import KpiGlobal from "./KpiGlobal";

export default function Kpi() {
  return (
    <Box
      bg="white"
      borderRadius="12px"
      p={5}
      boxShadow="0 1px 4px rgba(0,0,0,0.1)"
    >
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="bold">
          Récapitulatif des dossiers
        </Text>
        <Box w="28px" h="2px" bg="gray.700" mt={1} />
      </Box>

      <Flex gap={4}>
        <KpiCard
          title="Dossiers complets"
          value={2574}
          percent="+50%"
          color="#16A34A"
          line1="Total dossiers"
          line2="Dossiers complets"
          line2Color="#2563EB"
        />

        <KpiCard
          title="Dossiers en cours"
          value={1570}
          percent="+50%"
          color="#2563EB"
          line1="Dossier en cours"
          line2="Nouveau dossier"
          line2Color="#5ED3C6"
        />

        <KpiCard
          title="Tâches actives"
          value={100}
          percent="-8%"
          color="#DC2626"
          line1="Tâches actives"
          line2="Tâches abandonnées"
          line2Color="#F28C38"
        />

        <KpiGlobal />
      </Flex>
    </Box>
  );
}