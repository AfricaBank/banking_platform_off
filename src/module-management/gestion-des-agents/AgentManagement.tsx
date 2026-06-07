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

// Importations du Hook personnalisé, du type et du modal de confirmation
import { useAgents } from "@/hooks/useAgents";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";
import { ConfirmDeleteDialog } from "@/components/moduleComponents/ConfirmDeleteDialog.tsx";

// 1. Définition stricte de la structure de retour du Hook pour éliminer ESLint explicit-any
interface UseAgentsReturn {
  agents: AgentData[];
  isLoading: boolean;
  error: string | null;
  mutate?: () => void;
}

const AgentManagement = () => {
  // 2. Application de l'interface typée en remplacement de l'assignation implicite
  const { agents, isLoading, error, mutate } = useAgents() as UseAgentsReturn;
  const navigate = useNavigate();

  // 3. États locaux pour la gestion de la boîte de dialogue de suppression
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<AgentData | null>(null);

  // Ouverture du modal et sélection de l'agent cible
  const handleDeleteClick = (agent: AgentData) => {
    setAgentToDelete(agent);
    setIsDeleteDialogOpen(true);
  };

  // Fermeture du modal et réinitialisation de la cible
  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  // Traitement asynchrone de la suppression de l'agent
  const handleConfirmDelete = async () => {
    if (!agentToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/agents/${agentToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'agent sur le serveur.");
      }

      console.log(`Agent "${agentToDelete.nomComplet}" supprimé avec succès.`);
      
      // Rafraîchissement intelligent de la liste
      if (typeof mutate === "function") {
        mutate();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Échec de la suppression de l'agent :", err);
      throw err; 
    }
  };

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
          
          {/* Bouton Détails */}
          <IconButton
            rounded="8px"
            aria-label="Voir l'agent"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            onClick={() => navigate(`/agents/${item.id}`)}
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
            onClick={() => navigate(`/agents/${item.id}/modifier`)}
          >
            <FiEdit3 size={14} />
          </IconButton>

          {/* CÂBLAGE CORRIGÉ : Déclenchement de l'ouverture du modal au clic */}
          <IconButton
            rounded="8px"
            aria-label="Supprimer l'agent"
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

  // Gestion des affichages d'attente (Loading) et des erreurs
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
          Gestion des agents ({agents?.length || 0})
        </Text>
      </Flex>

      <GenericTable data={agents} columns={columns} />

      {/* 4. Injection du composant de confirmation pour la suppression */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Suppression d'un agent"
        description={`Êtes-vous sûr de vouloir supprimer l'agent "${agentToDelete?.nomComplet}" ? Cette action est irréversible.`}
      />
    </Box>
  );
};

export default AgentManagement;