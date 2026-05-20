"use client";
import { Box, Flex, IconButton, Badge, Text } from "@chakra-ui/react";
import { LuEye, LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";
import { RoleData } from "@/components/pageContents/pageContents.type.ts";
import { roleMockData } from "@/components/pageContents/pageContents.mock.ts";

const RoleManagement = () => {
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

  return (
    <Box width="100%">
      {/* Bandeau d'en-tête de la table */}
      <Flex mb="4" px="2">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          Gestion des rôles
        </Text>
      </Flex>

      {/* Rendu de la table générique avec les données des rôles */}
      <GenericTable data={roleMockData} columns={columns} />
    </Box>
  );
};

export default RoleManagement;
