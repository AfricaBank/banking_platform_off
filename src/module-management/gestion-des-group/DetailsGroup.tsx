"use client";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, VStack, Heading, Center, Spinner, Text } from "@chakra-ui/react";

import { InfoBlock, InfoItem } from "@/components/moduleComponents/InfoBlock";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader";
import { GenericTable } from "@/components/pageContents/GenericTable.tsx";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";

import { SimpleButton } from "@/components/customButtons/SimpleButton.tsx";

// Importations des éléments extraits
import { useDetailsGroupData } from "@/hooks/useDetailsGroupData.ts";
import { getAgentColumns } from "./DetailsGroup.columns";

export const DetailsGroup = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // 1. Consommation du hook de données unique
  const { groupeSelectionne, agentsDuGroupe, isLoading, error } =
    useDetailsGroupData(id);

  // 2. Définition des handlers d'action
  const handleViewAgent = (agent: AgentData) => {
    console.log("Consultation de l'agent :", agent.nomComplet);
  };

  const handleToggleStatus = (agent: AgentData) => {
    const futurStatut = agent.statut === "Actif" ? "Désactivé" : "Actif";
    console.log(
      `Changer le statut de l'agent ID ${agent.id} vers : ${futurStatut}`,
    );
  };

  // 3. Récupération des colonnes via la configuration externe
  const columns = useMemo(
    () =>
      getAgentColumns({
        onViewAgent: handleViewAgent,
        onToggleStatus: handleToggleStatus,
      }),
    [],
  );

  const handleAddAgentClick = () => {
    console.log("Ouverture du panneau d'affectation pour les agents globaux");
  };

  if (isLoading) {
    return (
      <Center p={10}>
        <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
      </Center>
    );
  }

  if (error || !groupeSelectionne) {
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
          <Text color="red.600" fontWeight="bold">
            {error || "Impossible de charger les données du groupe."}
          </Text>
        </Box>
      </Center>
    );
  }

  const groupInfoData: InfoItem[] = [
    { label: "Nom groupe", value: groupeSelectionne.nomGroupe },
    { label: "Agence", value: groupeSelectionne.agence },
    { label: "Nombre total des agents", value: agentsDuGroupe.length },
  ];

  return (
    <Box p={4} width="100%">
      <VStack align="stretch" gap={5}>
        <Heading size="md" color="gray.700">
          Détails du Groupe : {groupeSelectionne.nomGroupe}
        </Heading>

        <InfoBlock items={groupInfoData} />

        <ModuleActionHeader
          addLabel="Ajouter un agent"
          onAddClick={handleAddAgentClick}
          onFilterToggle={() => setIsFilterVisible(!isFilterVisible)}
          isFilterActive={isFilterVisible}
        />

        {isFilterVisible && (
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontSize="xs" color="gray.500">
              Composants de filtrage de la liste des agents membres...
            </Text>
          </Box>
        )}

        <GenericTable data={agentsDuGroupe} columns={columns} />

        {/* 4. Bouton Retour aligné et stylisé selon la maquette */}
        <Center mt={6}>
          <SimpleButton
            variant="outline"
            colorScheme="red"
            borderColor="red.300"
            color="red.400"
            bg="white"
            borderRadius="lg"
            px={10}
            height="40px"
            fontSize="sm"
            fontWeight="medium"
            _hover={{
              bg: "red.50",
              borderColor: "red.400", // Corrigé ici : '=' remplacé par ':'
            }}
            onClick={() => navigate("/groupes")}
          >
            Retour
          </SimpleButton>
        </Center>
      </VStack>
    </Box>
  );
};

export default DetailsGroup;
