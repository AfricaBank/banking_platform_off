"use client";
import { Box, Flex, IconButton, Badge, Text } from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";
import { TaskData } from "@/components/pageContents/pageContents.type.ts";
import { taskMockData } from "@/components/pageContents/pageContents.mock.ts";

const ActiveTaskManager = () => {
  // Configuration des 9 colonnes du tableau des tâches actives
  const columns: ColumnConfig<TaskData>[] = [
    { header: "ID dossier", key: "idDossier" },
    { header: "Type", key: "type" },
    { header: "Agent assigné", key: "agentAssigne" },
    { header: "Nom du client", key: "nomClient" },
    { header: "Type de client", key: "typeClient" },
    { header: "Agence", key: "agence" },
    {
      header: "Statut",
      key: "statut",
      render: (item) => {
        const isRedBadge = item.statut === "Annulé";
        return (
          <Badge
            variant="outline"
            colorScheme={isRedBadge ? "red" : "teal"}
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
    { header: "Date de création", key: "dateCreation" },
    {
      header: "Actions",
      key: "actions",
      render: (item) => (
        <Flex gap={2} justify="center" align="center">
          {/* Bouton Voir / Détails */}
          <IconButton
            rounded="8px"
            aria-label="Voir le dossier"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() =>
              console.log("Visualisation du dossier :", item.idDossier)
            }
          >
            <LuEye size={14} />
          </IconButton>

          {/* Bouton Modifier */}
          <IconButton
            rounded="8px"
            aria-label="Modifier le dossier"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() =>
              console.log("Modification du dossier :", item.idDossier)
            }
          >
            <FiEdit3 size={14} />
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
          Liste des dossiers et tâches
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données des tâches actives */}
      <GenericTable data={taskMockData} columns={columns} />
    </Box>
  );
};

export default ActiveTaskManager;
