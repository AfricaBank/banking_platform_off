"use client";
import { Box, Flex, IconButton, Badge, Text } from "@chakra-ui/react";
import { LuEye, LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";
import { agentMockData } from "@/components/pageContents/pageContents.mock.ts";

const AgentManagement = () => {
  // Configuration des colonnes calquée sur la capture d'écran de gestion des agents
  const columns: ColumnConfig<AgentData>[] = [
    { header: "Matricule", key: "matricule" },
    { header: "Nom complet", key: "nomComplet" },
    { header: "Email", key: "email" },
    { header: "Agence", key: "agence" },
    {
      header: "Statut",
      key: "statut",
      render: (item) => {
        const isActive = item.statut === "Actif";
        return (
          <Badge
            variant="outline"
            colorScheme={isActive ? "teal" : "red"}
            borderRadius="full"
            px={4}
            py={0.5}
            bg="white"
            fontSize="xs"
            fontWeight="bold"
            textTransform="none"
          >
            {item.statut}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      key: "actions",
      render: (item) => (
        <Flex gap={2} justify="center" align="center">
          {/* Bouton Voir / Détails */}
          <IconButton
            rounded="8px"
            aria-label="Voir l'agent"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() =>
              console.log("Visualisation de l'agent :", item.nomComplet)
            }
          >
            <LuEye size={14} />
          </IconButton>

          {/* Bouton Modifier */}
          <IconButton
            rounded="8px"
            aria-label="Modifier l'agent"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() =>
              console.log("Modification de l'agent :", item.nomComplet)
            }
          >
            <FiEdit3 size={14} />
          </IconButton>

          {/* Bouton Supprimer */}
          <IconButton
            rounded="8px"
            aria-label="Supprimer l'agent"
            size="xs"
            bg="red.500"
            color="white"
            onClick={() => console.log("Suppression de l'agent ID :", item.id)}
          >
            <LuTrash2 size={14} />
          </IconButton>
        </Flex>
      ),
    },
  ];

  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des agents
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données des agents */}
      <GenericTable data={agentMockData} columns={columns} />
    </Box>
  );
};

export default AgentManagement;
