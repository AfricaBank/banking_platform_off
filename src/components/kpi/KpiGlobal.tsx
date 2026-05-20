import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { buildGlobalDonut } from "./kpi.data";
import SafeDoughnut from "@/components/kpi/charts/SafeDoughnut";

export default function KpiGlobal() {
  // Instanciation dynamique des données du graphique global
  const chartData = useMemo(() => buildGlobalDonut(), []);

  return (
    <Box
      w="32%"
      bg="white"
      borderRadius="2xl"
      p={5}
      boxShadow="0 10px 30px rgba(0, 0, 0, 0.02)"
      border="1px solid"
      borderColor="lightGrey.100"
    >
      <Flex align="center" justify="space-between" w="full" h="full" gap={4}>
        {/* Résolution du problème d'affichage : Conteneur à taille stricte */}
        <Box w="130px" h="130px" position="relative" flexShrink={0}>
          <SafeDoughnut
            key="kpi-global-donut"
            data={chartData}
            options={{
              cutout: "60%",
              responsive: true,
              maintainAspectRatio: false, // Crucial pour éviter que Chart.js ne réduise la hauteur à 0px
              plugins: { legend: { display: false } },
            }}
          />
        </Box>

        <Stack gap={3} flex="1">
          <Flex align="center" gap={3}>
            <Switch
              defaultChecked
              css={{
                "--switch-track-checked-bg": "#1E90FF",
                "& .chakra-switch__track": {
                  bg: "#1E90FF",
                  height: "18px",
                  width: "34px",
                },
              }}
            />
            <Text fontSize="xs" fontWeight="bold" color="text.main">
              Dossiers
            </Text>
          </Flex>

          <Flex align="center" gap={3}>
            <Switch
              defaultChecked
              css={{
                "--switch-track-checked-bg": "#FF8C00",
                "& .chakra-switch__track": {
                  bg: "#FF8C00",
                  height: "18px",
                  width: "34px",
                },
              }}
            />
            <Text fontSize="xs" fontWeight="bold" color="text.main">
              Tâches
            </Text>
          </Flex>

          <Flex align="center" gap={3}>
            <Switch
              defaultChecked
              css={{
                "--switch-track-checked-bg": "#66CBB7",
                "& .chakra-switch__track": {
                  bg: "#66CBB7",
                  height: "18px",
                  width: "34px",
                },
              }}
            />
            <Text fontSize="xs" fontWeight="bold" color="text.main">
              Nouveau dossier
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
