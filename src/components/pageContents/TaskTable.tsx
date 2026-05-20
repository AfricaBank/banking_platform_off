"use client";
import { Box, Flex, IconButton, Badge, Text } from "@chakra-ui/react";
import { LuEye, LuDownload } from "react-icons/lu";

import { GenericTable, ColumnConfig } from "./GenericTable.tsx";

interface AgentDossier {
  reference: string;
  nomTitulaire: string;
  statut: "TERMINE" | "ENCOURS" | "SUSPENDUE";
  agence: string;
  codeExploitant: string;
}

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
    <Box width="100%">
      {/* En-tête du tableau contenant le titre et la légende des statuts */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        gap="4"
        mb="-3"
        px="2"
      >
        {/* Titre de la section */}
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Liste des dossiers et taches
        </Text>

        {/* Légende des indicateurs de statut */}
        <Flex gap="6" align="center">
          {/* Statut En cours */}
          <Flex align="center" gap="2">
            <Box w="12px" h="12px" borderRadius="full" bg="brandGreen.400" />
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              En cours
            </Text>
          </Flex>

          {/* Statut Complet */}
          <Flex align="center" gap="2">
            <Box w="12px" h="12px" borderRadius="full" bg="teal.300" />
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              Complet
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Rendu du composant de table générique */}
      <GenericTable data={data} columns={columns} />
    </Box>
  );
};

export default TaskManagement;
