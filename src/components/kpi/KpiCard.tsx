import { Box, Flex, Text, Center, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { buildDonut } from "./kpi.data";
import SafeDoughnut from "@/components/kpi/charts/SafeDoughnut";

type Props = {
  title: string;
  value: number;
  percent: string;
  percentColor: string;
  valSegment1: number;
  valSegment2: number;
  colorSegment1: string;
  colorSegment2: string;
  line1: string;
  line2: string;
};

export default function KpiCard({
  title,
  value,
  percent,
  percentColor,
  valSegment1,
  valSegment2,
  colorSegment1,
  colorSegment2,
  line1,
  line2,
}: Props) {
  // Génération de l'anneau bicolore basé sur les deux segments fournis
  const chartData = useMemo(
    () => buildDonut(valSegment1, valSegment2, colorSegment1, colorSegment2),
    [valSegment1, valSegment2, colorSegment1, colorSegment2],
  );

  return (
    <Box
      flex="1"
      bg="white"
      borderRadius="xl"
      p={5}
      boxShadow="0 10px 25px rgba(0, 0, 0, 0.02)"
      border="1px solid"
      borderColor="lightGrey.100"
    >
      <Flex align="center" justify="space-between" mb={4}>
        {/* Conteneur du Donut de la carte */}
        <Box w="95px" h="95px" position="relative" flexShrink={0}>
          <SafeDoughnut
            key={title}
            data={chartData}
            options={{
              cutout: "75%",
              responsive: true,
              maintainAspectRatio: false, // Permet de forcer le redimensionnement au conteneur Box
              plugins: { legend: { display: false } },
            }}
          />
          <Center position="absolute" inset={0} flexDirection="column">
            <Text fontSize="9px" fontWeight="medium" color="text.muted">
              Total
            </Text>
            <Text fontSize="xs" fontWeight="bold" color="text.main">
              {value}
            </Text>
          </Center>
        </Box>

        <Text
          fontSize="4xl"
          fontWeight="medium"
          color="text.main"
          letterSpacing="-1px"
        >
          {value}
        </Text>
      </Flex>

      <Flex justify="space-between" align="flex-end">
        <Flex align="center" gap={1.5}>
          <Text fontSize="xs" fontWeight="bold" color="text.main">
            {title}
          </Text>
          <Text fontSize="10px" fontWeight="extrabold" color={percentColor}>
            {percent}
          </Text>
        </Flex>

        <Stack gap={1} align="flex-start">
          <Flex align="center" gap={2}>
            <Box w="16px" h="5px" bg={colorSegment1} borderRadius="full" />
            <Text fontSize="10px" fontWeight="medium" color="text.muted">
              {line1}
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box w="16px" h="5px" bg={colorSegment2} borderRadius="full" />
            <Text fontSize="10px" fontWeight="medium" color="text.muted">
              {line2}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
