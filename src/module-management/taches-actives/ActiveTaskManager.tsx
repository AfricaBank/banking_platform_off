"use client";
import {
  Box,
  Flex,
  IconButton,
  Badge,
  Text,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";
import { TaskData } from "@/components/pageContents/pageContents.type.ts";
import { useTachesActives } from "@/hooks/useTachesActives.ts";

const ActiveTaskManager = () => {
  // 1. Consommation du hook personnalisé connecté à JSON Server
  const { tachesActives, isLoading, error } = useTachesActives();

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
        // Assignation d'une couleur adaptée à chaque type de statut
        let colorScheme = "orange"; // Statut "En cours" par défaut

        if (item.statut === "Annulé") {
          colorScheme = "red";
        } else if (item.statut === "Terminé") {
          colorScheme = "teal";
        }

        return (
          <Badge
            variant="outline"
            colorScheme={colorScheme}
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

  // 2. Rendu de l'état de chargement (Spinner)
  if (isLoading) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Chargement du tableau de bord des tâches...
          </Text>
        </VStack>
      </Center>
    );
  }

  // 3. Rendu de l'état d'erreur réseau
  if (error) {
    return (
      <Center p={10}>
        <Box
          textAlign="center"
          p={5}
          borderWidth={1}
          borderColor="red.200"
          borderRadius="md"
          bg="red.50"
        >
          <Text color="red.600" fontWeight="bold" mb={2}>
            Erreur de communication
          </Text>
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        </Box>
      </Center>
    );
  }

  // 4. Rendu de l'interface principale stabilisée
  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Liste des dossiers et tâches ({tachesActives.length})
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données dynamiques de l'API */}
      <GenericTable data={tachesActives} columns={columns} />
    </Box>
  );
};

export default ActiveTaskManager;
