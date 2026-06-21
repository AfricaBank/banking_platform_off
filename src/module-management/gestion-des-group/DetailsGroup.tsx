"use client";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, VStack, Heading, Center, Spinner, Text } from "@chakra-ui/react";

import { InfoBlock, InfoItem } from "@/components/moduleComponents/InfoBlock";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader";
import { GenericTable } from "@/components/pageContents/GenericTable.tsx";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";

import { SimpleButton } from "@/components/customButtons/SimpleButton.tsx";

// Nouveaux imports pour la gestion des filtres
import { FilterContainer } from "@/components/moduleComponents/FilterContainer.tsx";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";

// Importations des éléments extraits et du nouveau composant modal
import { useDetailsGroupData } from "@/hooks/useDetailsGroupData.ts";
import { getAgentColumns } from "./DetailsGroup.columns";
import { ModalSelectionAgents } from "./ModalSelectionAgents";

export const DetailsGroup = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. État local pour stocker les valeurs saisies dans les filtres
  const [filterValues, setFilterValues] = useState({
    matricule: "",
    email: "",
  });

  // Consommation du hook de données unique
  const { groupeSelectionne, agentsDuGroupe, isLoading, error } =
    useDetailsGroupData(id);

  const handleViewAgent = (agent: AgentData) => {
    if (agent && agent.id) {
      navigate(`/agents/${agent.id}`);
    } else {
      console.warn("Impossible de rediriger : l'identifiant de l'agent est manquant.");
    }
  };

  const handleToggleStatus = (agent: AgentData) => {
    const futurStatut = agent.statut === "Actif" ? "Désactivé" : "Actif";
    console.log(`Changer le statut de l'agent ID ${agent.id} vers : ${futurStatut}`);
  };

  const columns = useMemo(
    () =>
      getAgentColumns({
        onViewAgent: handleViewAgent,
        onToggleStatus: handleToggleStatus,
      }),
    [],
  );

  // 2. Filtrage logique des agents en temps réel ou à la soumission
  // Applique une vérification insensible à la casse pour le matricule et l'adresse email
  const agentsVisualises = useMemo(() => {
    if (!agentsDuGroupe) return [];
    
    return agentsDuGroupe.filter((agent) => {
      const matchMatricule = agent.matricule
        ?.toLowerCase()
        .includes(filterValues.matricule.toLowerCase());
      const matchEmail = agent.email
        ?.toLowerCase()
        .includes(filterValues.email.toLowerCase());

      return matchMatricule && matchEmail;
    });
  }, [agentsDuGroupe, filterValues]);

  const handleAddAgentClick = () => {
    setIsModalOpen(true);
  };

  // Actions requises par le composant FilterContainer
  const handleSearch = () => {
    console.log("Filtres appliqués sur les agents :", filterValues);
  };

  const handleReset = () => {
    setFilterValues({ matricule: "", email: "" });
  };

  const handleConfirmAddAgents = async (selectedAgentIds: string[]) => {
    if (!groupeSelectionne) return;

    try {
      const updatePromises = selectedAgentIds.map((agentId) =>
        fetch(`http://localhost:3001/agents/${agentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupe: groupeSelectionne.nomGroupe,
          }),
        })
      );

      await Promise.all(updatePromises);
      setIsModalOpen(false);
      navigate(0); 
    } catch (err) {
      console.error("Erreur lors de l'affectation des agents au groupe :", err);
      alert("Une erreur est survenue lors de l'affectation des agents.");
    }
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

        {/* 3. Bloc de Filtres Dynamique conforme à Gestionsgroupes */}
        {isFilterVisible && (
          <FilterContainer onSearch={handleSearch} onReset={handleReset}>
            <InputTextField
              label="Matricule de l'agent"
              placeholder="Ex: AG-00-109..."
              value={filterValues.matricule}
              onChange={(e) =>
                setFilterValues({ ...filterValues, matricule: e.target.value })
              }
            />

            <InputTextField
              label="Adresse email"
              placeholder="Ex: agent@gmail.com..."
              value={filterValues.email}
              onChange={(e) =>
                setFilterValues({ ...filterValues, email: e.target.value })
              }
            />
          </FilterContainer>
        )}

        {/* La table reçoit désormais la liste filtrée d'agents */}
        <GenericTable data={agentsVisualises} columns={columns} />

        <Center mt={6}>
          <SimpleButton
            variant="outline"
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
              borderColor: "red.400",
            }}
            onClick={() => navigate("/groupes")}
          >
            Retour
          </SimpleButton>
        </Center>
      </VStack>

      {isModalOpen && (
        <ModalSelectionAgents
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nomGroupeCourant={groupeSelectionne.nomGroupe}
          onConfirm={handleConfirmAddAgents}
        />
      )}
    </Box>
  );
};

export default DetailsGroup;