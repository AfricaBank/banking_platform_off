import { Box, Flex, Text } from "@chakra-ui/react";
import KpiCard from "./KpiCard";
import KpiGlobal from "./KpiGlobal";

export default function Kpi() {
  return (
    <Box bg="darkGrey.50" borderRadius="xl" p={5}>
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="bold" color="text.main">
          Récapitulatif des dossiers
        </Text>
        <Box w="28px" h="2px" bg="darkGrey.400" mt={1} />
      </Box>

      <Flex gap={4} w="full">
        {/* Carte 1 : On passe la valeur du segment 1 (Vert) et du segment 2 (Bleu) */}
        <KpiCard
          title="Dossiers complets"
          value={2574}
          percent="+50%"
          percentColor="successGreen.500"
          valSegment1={800} // Ajuste selon tes vraies variables d'API
          valSegment2={1774} // valSegment1 + valSegment2 = value (2574)
          colorSegment1="#62BB46" // successGreen.400
          colorSegment2="#1E90FF" // dogerBlue.400
          line1="Total dossiers"
          line2="Dossiers complets"
        />

        {/* Carte 2 */}
        <KpiCard
          title="Dossiers en cours"
          value={1570}
          percent="+50%"
          percentColor="successGreen.500"
          valSegment1={600}
          valSegment2={970}
          colorSegment1="#66CBB7" // Turquoise (brandGreen.200)
          colorSegment2="#1E90FF" // dogerBlue.400
          line1="Dossier en cours"
          line2="Nouveau dossier"
        />

        {/* Carte 3 */}
        <KpiCard
          title="Tâches actives"
          value={100}
          percent="-8%"
          percentColor="errorRed.500"
          valSegment1={35}
          valSegment2={65}
          colorSegment1="#EE312E" // errorRed.400
          colorSegment2="#FF8C00" // warnOrange.400
          line1="Tâches actives"
          line2="Tâches abandonnées"
        />

        <KpiGlobal />
      </Flex>
    </Box>
  );
}
