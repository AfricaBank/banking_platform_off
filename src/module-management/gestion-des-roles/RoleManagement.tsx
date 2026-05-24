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

// Remplacement du mock par le Hook personnalisé et l'interface globale
import { useRoles } from "@/hooks/useRoles";
import { RoleData } from "@/components/pageContents/pageContents.type.ts";

const RoleManagement = () => {
  // 1. Consommation du hook personnalisé connecté à JSON Server
  const { roles, isLoading, error } = useRoles();

  // Configuration des colonnes pour la gestion des rôles
  const columns: ColumnConfig<RoleData>[] = [
    { header: "Libellé", key: "libelle" },
    { header: "Description", key: "description" },
    {
      header: "Statut",
      key: "statut",
      render: (item) => {
        const isActivated = item.statut === "Activé";
        return (
          <Badge
            variant="outline"
            colorScheme={isActivated ? "teal" : "red"}
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
            aria-label="Voir le rôle"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => console.log("Visualisation du rôle :", item.libelle)}
          >
            <LuEye size={14} />
          </IconButton>

          {/* Bouton Modifier */}
          <IconButton
            rounded="8px"
            aria-label="Modifier le rôle"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() => console.log("Modification du rôle :", item.libelle)}
          >
            <FiEdit3 size={14} />
          </IconButton>

          {/* Bouton Supprimer */}
          <IconButton
            rounded="8px"
            aria-label="Supprimer le rôle"
            size="xs"
            bg="red.500"
            color="white"
            onClick={() => console.log("Suppression du rôle ID :", item.id)}
          >
            <LuTrash2 size={14} />
          </IconButton>
        </Flex>
      ),
    },
  ];

  // 2. Gestion de l'affichage de chargement (Spinner)
  if (isLoading) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Chargement de la liste des rôles...
          </Text>
        </VStack>
      </Center>
    );
  }

  // 3. Gestion de l'affichage des erreurs réseau
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

  // 4. Rendu de la vue principale avec les données réelles du serveur
  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des rôles ({roles.length})
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données dynamiques de l'API */}
      <GenericTable data={roles} columns={columns} />
    </Box>
  );
};

export default RoleManagement;
