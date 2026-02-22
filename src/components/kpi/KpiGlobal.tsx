import { Box, Flex, Text } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { globalDonut } from "./kpi.data";
import SafeDoughnut from "@/components/kpi/charts/SafeDoughnut";

export default function KpiGlobal() {
  return (
    <Box
      w="30%"
      bg="white"
      borderRadius="12px"
      p={4}
      boxShadow="0 1px 3px rgba(0,0,0,0.08)"
    >
      <Flex align="center">
        <Box w="200px">
          <SafeDoughnut
            key="kpi-global-donut"
            data={globalDonut}
            options={{
              cutout: "68%",
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { display: false } },
            }}
          />
        </Box>

        <Box ml={4}>
          <Flex align="center" mb={2}>
            <Switch checked />
            <Text ml={2} fontSize="sm">
              Dossiers
            </Text>
          </Flex>

          <Flex align="center" mb={2}>
            <Switch />
            <Text ml={2} fontSize="sm">
              Tâches
            </Text>
          </Flex>

          <Flex align="center">
            <Switch />
            <Text ml={2} fontSize="sm">
              Nouveau dossier
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
