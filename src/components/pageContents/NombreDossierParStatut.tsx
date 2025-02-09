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

// 📌 Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 📌 Définition des types pour les props du composant
interface BarChartProps {
  inProgress: number[];
  rejected: number[];
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
  // 📌 Labels pour l'axe des abscisses (jours de la semaine)
  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  // 📌 Données fictives : Nombre de dossiers acceptés et rejetés par jour
  const enCours = [2000, 3000, 4000, 5000, 6000, 7000, 8000]; // Acceptés
  const rejected = [1500, 2500, 4000, 4500, 5200, 6000, 3000]; // Rejetés
  // 📌 Données du graphique
  const data = {
    labels,
    datasets: [
      {
        data: enCours,
        backgroundColor: "#F58381",
        fill: false,
        borderWidth: 0,
        barThickness: 10,
        borderRadius: 15,
      },
      {
        data: rejected,
        backgroundColor: "#00A887",
        fill: false,
        borderWidth: 0,
        barThickness: 10,
        borderRadius: 15,
      },
    ],
  };

  // 📌 Options du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 8000,
        ticks: {
          stepSize: 2000,
        },
        grid: {
          display: false,
        },
      },
      x: {
        categoryPercentage: 0.6, // 📌 Réduit la largeur totale des groupes de barres
        barPercentage: 0, // 📌 Réduit la largeur individuelle des barres
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
        bottom: 5,
      },
    },
  };
  return (
    <>
      <Box
        padding="10px"
        width="577px"
        m="10"
        borderRadius="md"
        p="10px"
        boxShadow="-5px 5px 5px rgba(0, 0, 0, 0.1)"
      >
        <Flex alignItems="center" justifyContent="space-between" mb="20px">
          <Text>Dossier</Text>
          <Switch>En cours </Switch>
          <Switch>Rejetés</Switch>
          <SelectRoot collection={frameworks} size="sm" width="130px">
            <SelectTrigger>
              <SelectValueText placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Flex>
        <Bar data={data} options={options} />
      </Box>
    </>
  );
};
