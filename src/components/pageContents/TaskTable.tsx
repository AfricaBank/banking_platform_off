"use client";
import { Box, Flex, IconButton, Badge } from "@chakra-ui/react";
import { LuEye, LuDownload } from "react-icons/lu";

import { GenericTable, ColumnConfig } from "./GenericTable.tsx";

// 1. Interface alignée sur les besoins du Business Analyst
interface AgentDossier {
  reference: string;
  nomTitulaire: string;
  statut: "TERMINE" | "ENCOURS" | "SUSPENDUE";
  agence: string;
  codeExploitant: string;
}

// Données de démonstration
const data: AgentDossier[] = [
  {
    reference: "REF-2026-001",
    nomTitulaire: "Jean Dupont",
    statut: "TERMINE",
    agence: "Agence Dakar Plateau",
    codeExploitant: "EXP-778",
  },
  {
    reference: "REF-2026-002",
    nomTitulaire: "Marie Fall",
    statut: "ENCOURS",
    agence: "Agence Saint-Louis",
    codeExploitant: "EXP-421",
  },
  {
    reference: "REF-2026-002",
    nomTitulaire: "Marie Fall",
    statut: "SUSPENDUE",
    agence: "Agence Saint-Louis",
    codeExploitant: "EXP-421",
  },
];

const TaskManagement = () => {
  // 2. Configuration des colonnes
  const columns: ColumnConfig<AgentDossier>[] = [
    { header: "Reference", key: "reference" },
    { header: "Nom du titulaire", key: "nomTitulaire" },
    {
      header: "Statut",
      key: "statut",
      render: (item) => (
        <Badge variant="solid" borderRadius="full" px={3}>
          {item.statut}
        </Badge>
      ),
    },
    { header: "Agence", key: "agence" },
    { header: "Code Exploitant", key: "codeExploitant" },
    {
      header: "Actions",
      key: "actions",
      render: (item) => (
        <Flex gap={2} justify="center">
          {/* Bouton Détails (onView) */}
          <IconButton
            rounded="10px"
            aria-label="Détails"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => console.log("Détails de :", item.reference)}
          >
            <LuEye />
          </IconButton>

          <IconButton
            rounded="10px"
            aria-label="Exporter"
            size="xs"
            bg="brandGreen.400"
            color="white"
            onClick={() => console.log("Exportation de :", item.reference)}
          >
            <LuDownload />
          </IconButton>
        </Flex>
      ),
    },
  ];
  return (
    <Box>
      <GenericTable data={data} columns={columns} />
    </Box>
  );
};

export default TaskManagement;
