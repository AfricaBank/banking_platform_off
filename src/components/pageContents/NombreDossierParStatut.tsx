import { Box, Flex, Text } from "@chakra-ui/react";
import { Switch } from "../ui/switch";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { enCours, rejected } from "@/dataObject/graphicData";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  inProgress?: number[];
  rejected?: number[];
}

const frameworks = createListCollection({
  items: [
    { label: "Journalier", value: "Journalier" },
    { label: "Hebdomadaire", value: "Hebdomadaire" },
    { label: "Mensuel", value: "Mensuel" },
    { label: "Annuel", value: "Annuel" },
  ],
});

export const NombreDossierParStatut: React.FC<BarChartProps> = () => {
  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const data = {
    labels,
    datasets: [
      {
        label: "En cours",
        data: enCours,
        backgroundColor: "#00A887",
        borderWidth: 0,
        barThickness: 8,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Rejetés",
        data: rejected,
        backgroundColor: "#F58381",
        borderWidth: 0,
        barThickness: 8,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 8000,
        border: {
          display: false,
        },
        ticks: {
          stepSize: 2000,
          callback: function (value: number | string) {
            const numericValue =
              typeof value === "string" ? parseFloat(value) : value;
            return numericValue === 0 ? "0" : `${numericValue / 1000}K`;
          },
          color: "#A0AEC0",
          font: {
            size: 12,
            weight: "normal" as const,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        border: {
          display: false,
        },
        categoryPercentage: 0.5,
        barPercentage: 0.8,
        ticks: {
          color: "#A0AEC0",
          font: {
            size: 13,
            weight: "normal" as const,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <Box
      padding="30px"
      maxWidth="100%"
      borderRadius="24px"
      boxShadow="0px 10px 30px rgba(0, 0, 0, 0.04)"
      backgroundColor="white"
    >
      <Flex alignItems="center" justifyContent="space-between" mb="35px">
        <Flex alignItems="center" gap="40px">
          <Text fontSize="lg" fontWeight="bold" color="text.main">
            Dossiers
          </Text>
          <Flex gap="25px">
            <Switch colorPalette="teal" defaultChecked>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" ml="1">
                En cours
              </Text>
            </Switch>
            <Switch colorPalette="red" defaultChecked>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" ml="1">
                Rejetés
              </Text>
            </Switch>
          </Flex>
        </Flex>

        <SelectRoot collection={frameworks} size="sm" width="140px">
          <SelectTrigger
            style={{
              borderRadius: "10px",
              borderColor: "#E2E8F0",
              height: "40px",
            }}
          >
            <SelectValueText placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>

      <Box height="300px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};
