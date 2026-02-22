import { Box, Flex, Text, Center } from "@chakra-ui/react";
import { useMemo } from "react";
import { buildDonut } from "./kpi.data";
import SafeDoughnut from "@/pages/charts/SafeDoughnut";

type Props = {
  title: string;
  value: number;
  percent: string;
  color: string;
  line1: string;
  line2: string;
  line2Color: string;
};

export default function KpiCard({
  title,
  value,
  percent,
  color,
  line1,
  line2,
  line2Color,
}: Props) {
  const chartData = useMemo(
    () => buildDonut(value, 3000, color),
    [value, color]
  );

  return (
    <Box
      w="23%"
      bg="white"
      borderRadius="12px"
      p={4}
      boxShadow="0 1px 3px rgba(0,0,0,0.08)"
    >
      {/* Donut + valeur */}
      <Flex align="center" gap={4}>
        <Box w="68px" h="68px" position="relative" flexShrink={0}>
          <SafeDoughnut
            key={title}
            data={chartData}
            options={{
              cutout: "72%",
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { display: false } },
            }}
          />
          <Center position="absolute" inset={0}>
            <Text fontSize="xs" fontWeight="bold">
              {value}
            </Text>
          </Center>
        </Box>

        <Text fontSize="2xl" fontWeight="bold">
          {value}
        </Text>
      </Flex>

      {/* Texte */}
      <Flex mt={3} justify="space-between" align="flex-start">
        <Flex align="center" gap={2}>
          <Text fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="bold" color={color}>
            {percent}
          </Text>
        </Flex>

        <Box>
          <Flex align="center" gap={2}>
            <Box w="12px" h="4px" bg={color} borderRadius="full" />
            <Text fontSize="xs" color="gray.500">
              {line1}
            </Text>
          </Flex>

          <Flex align="center" gap={2} mt={1}>
            <Box w="12px" h="4px" bg={line2Color} borderRadius="full" />
            <Text fontSize="xs" color="gray.500">
              {line2}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
