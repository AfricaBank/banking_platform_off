"use client";

import { useState } from "react";
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

import { useGroupes } from "@/hooks/useGroupes";
import { GroupData } from "@/components/pageContents/pageContents.type.ts";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteDialog } from "@/components/moduleComponents/ConfirmDeleteDialog.tsx";

// 1. Définition stricte de la structure de retour du Hook pour éliminer ESLint explicit-any
interface UseGroupesReturn {
  groupes: GroupData[];
  isLoading: boolean;
  error: string | null;
  mutate?: () => void;
}

const GroupManagement = () => {
  // 2. Application de l'interface typée en remplacement du "as any"
  const { groupes, isLoading, error, mutate } = useGroupes() as UseGroupesReturn;
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<GroupData | null>(null);

  const handleDeleteClick = (group: GroupData) => {
    setGroupToDelete(group);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/groupes/${groupToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression sur le serveur.");
      }

      console.log(`Groupe "${groupToDelete.nomGroupe}" supprimé avec succès.`);
      
      if (typeof mutate === "function") {
        mutate();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Échec de la suppression :", err);
      throw err; 
    }
  };

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

          <IconButton
            rounded="8px"
            aria-label="Modifier le groupe"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() => navigate(`/groupes/${item.id}/modifier`)}
          >
            <FiEdit3 size={14} />
          </IconButton>

          <IconButton
            rounded="8px"
            aria-label="Supprimer le groupe"
            size="xs"
            bg="red.500"
            color="white"
            onClick={() => handleDeleteClick(item)}
          >
            <LuTrash2 size={14} />
          </IconButton>

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
          Gestion des groupes ({groupes?.length || 0})
        </Text>
      </Flex>

      <GenericTable data={groupes} columns={columns} />

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Suppression d'un groupe"
        description={`Êtes-vous sûr de vouloir supprimer le groupe "${groupToDelete?.nomGroupe}" ? Cette action est irréversible.`}
      />
    </Box>
  );
};

export default GroupManagement;