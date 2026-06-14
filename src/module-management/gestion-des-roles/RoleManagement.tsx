"use client";

import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

import {
  GenericTable,
  ColumnConfig,
} from "@/components/pageContents/GenericTable.tsx";

// Consommation des Hooks et types globaux de l'application
import { useRoles } from "@/hooks/useRoles";
import { RoleData } from "@/components/pageContents/pageContents.type.ts";
import { ConfirmDeleteDialog } from "@/components/moduleComponents/ConfirmDeleteDialog.tsx";

// 1. Contrat d'interface strict pour éliminer les types implicites 'any'
interface UseRolesReturn {
  roles: RoleData[];
  isLoading: boolean;
  error: string | null;
  mutate?: () => void;
}

const RoleManagement = () => {
  // 2. Application du typage sur le retour du Hook et initialisation du routeur
  const { roles, isLoading, error, mutate } = useRoles() as UseRolesReturn;
  const navigate = useNavigate();

  // 3. Gestion des états locaux pour l'affichage de l'alerte de suppression
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<RoleData | null>(null);

  // Ouverture de la boîte de dialogue pour le rôle sélectionné
  const handleDeleteClick = (role: RoleData) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };

  // Fermeture et remise à zéro de la cible de suppression
  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  // 4. Mutation réseau : Suppression asynchrone du rôle sur le serveur
  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/roles/${roleToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du rôle sur le serveur.");
      }

      console.log(`Rôle "${roleToDelete.libelle}" supprimé avec succès.`);
      
      // Re-validation ou rechargement de la table sans rupture d'expérience
      if (typeof mutate === "function") {
        mutate();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Échec de l'opération de suppression :", err);
      throw err;
    }
  };

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
          {/* Redirection vers l'écran Détails du rôle */}
          <IconButton
            rounded="8px"
            aria-label="Voir le rôle"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => navigate(`/roles/${item.id}`)}
          >
            <LuEye size={14} />
          </IconButton>

          {/* Redirection vers l'écran de Modification du rôle */}
          <IconButton
            rounded="8px"
            aria-label="Modifier le rôle"
            size="xs"
            bg="orange.400"
            color="white"
            onClick={() => navigate(`/roles/${item.id}/modifier`)}
          >
            <FiEdit3 size={14} />
          </IconButton>

          {/* Déclenchement sécurisé du modal de suppression */}
          <IconButton
            rounded="8px"
            aria-label="Supprimer le rôle"
            size="xs"
            bg="red.500"
            color="white"
            onClick={() => handleDeleteClick(item)}
          >
            <LuTrash2 size={14} />
          </IconButton>
        </Flex>
      ),
    },
  ];

  // Affichage de chargement (Spinner)
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

  // Affichage des erreurs de communication réseau
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
          Gestion des rôles ({roles?.length || 0})
        </Text>
      </Flex>

      <GenericTable data={roles} columns={columns} />

      {/* Raccordement du modal de confirmation de suppression */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Suppression d'un rôle"
        description={`Êtes-vous sûr de vouloir supprimer le rôle "${roleToDelete?.libelle}" ? Cette action entraînera le retrait des habilitations associées.`}
      />
    </Box>
  );
};

export default RoleManagement;