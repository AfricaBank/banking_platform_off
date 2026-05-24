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
import { LuEye, LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";

// Importations du Hook personnalisé et du type
import { useAgents } from "@/hooks/useAgents";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";

const AgentManagement = () => {
  // 1. Consommation du custom hook (Toute la logique réseau est ici)
  const { agents, isLoading, error } = useAgents();

  // Configuration des colonnes
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

  // 2. Gestion des affichages d'attente (Loading) et des erreurs
  if (isLoading) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Chargement de la liste des agents...
          </Text>
        </VStack>
      </Center>
    );
  }

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

  return (
    <Box width="100%">
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des agents ({agents.length})
        </Text>
      </Flex>

      <GenericTable data={agents} columns={columns} />
    </Box>
  );
};

export default AgentManagement;
