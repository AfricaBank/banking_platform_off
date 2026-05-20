"use client";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { LuEye, LuTrash2 } from "react-icons/lu";
import { FiEdit3, FiExternalLink } from "react-icons/fi";

import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";
import { GroupData } from "@/components/pageContents/pageContents.type.ts";
import { groupMockData } from "@/components/pageContents/pageContents.mock.ts";

const GroupManagement = () => {
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
            onClick={() =>
              console.log("Visualisation du groupe :", item.nomGroupe)
            }
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

  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des groupes
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données des groupes */}
      <GenericTable data={groupMockData} columns={columns} />
    </Box>
  );
};

export default GroupManagement;
