"use client";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { LuEye, LuTrash2 } from "react-icons/lu";
import { FiEdit3, FiExternalLink } from "react-icons/fi";
import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";

// Remplacement du mock statique par le Hook personnalisé et l'interface globale
import { useGroupes } from "@/hooks/useGroupes";
import { GroupData } from "@/components/pageContents/pageContents.type.ts";
import { useNavigate } from "react-router-dom";

const GroupManagement = () => {
  // 1. Consommation du hook personnalisé (Logique de requêtage JSON Server)
  const { groupes, isLoading, error } = useGroupes();
  const navigate = useNavigate();

  // Configuration des colonnes calquée sur la capture d'écran
  const columns: ColumnConfig<GroupData>[] = [
    { header: "Identifiant", key: "identifiant" },
    { header: "Nom du groupe", key: "nomGroupe" },
    { header: "Description", key: "description" },
    { header: "Agence", key: "agence" },
    { header: "Effectifs", key: "effectifs" },
    {
      header: "Actions",
      key: "actions",
      render: (item) => (
        <Flex gap={2} justify="center" align="center">
          {/* Bouton Voir Détails */}
          <IconButton
            rounded="8px"
            aria-label="Voir les détails"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => navigate(`/groupes/${item.id}`)}
          >
            <LuEye size={14} />
          </IconButton>

          {/* Bouton Modifier */}
          <IconButton
            rounded="8px"
            aria-label="Modifier le groupe"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() =>
              console.log("Modification du groupe :", item.nomGroupe)
            }
          >
            <FiEdit3 size={14} />
          </IconButton>

          {/* Bouton Supprimer */}
          <IconButton
            rounded="8px"
            aria-label="Supprimer le groupe"
            size="xs"
            bg="red.500"
            color="white"
            onClick={() => console.log("Suppression du groupe ID :", item.id)}
          >
            <LuTrash2 size={14} />
          </IconButton>

          {/* Bouton Assigner / Action externe */}
          <IconButton
            rounded="8px"
            aria-label="Assigner"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => console.log("Action externe pour :", item.nomGroupe)}
          >
            <FiExternalLink size={14} />
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
            Chargement de la liste des groupes...
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

  // 4. Rendu de l'interface principale avec les données réelles
  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des groupes ({groupes.length})
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données dynamiques de l'API */}
      <GenericTable data={groupes} columns={columns} />
    </Box>
  );
};

export default GroupManagement;
