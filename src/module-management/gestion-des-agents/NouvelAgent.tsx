"use client";
import { Box, VStack, Text, Center, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection";

// Importation de notre hook connecté aux référentiels
import { useAgents } from "@/hooks/useAgents";

export const NouvelAgent = () => {
  const navigate = useNavigate();

  // Consommation du hook avec récupération des états globaux et collections formatées
  const {
    createAgent,
    rolesCollection,
    groupesCollection,
    isLoading,
    isSubmitting,
    error,
  } = useAgents();

  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    agence: "",
    role: "",
    groupe: "",
  });

  const handleSave = async () => {
    // Validation des champs requis avant soumission
    if (
      !formValues.prenom ||
      !formValues.nom ||
      !formValues.email ||
      !formValues.agence
    ) {
      alert(
        "Veuillez renseigner toutes les informations obligatoires de l'identité et l'agence.",
      );
      return;
    }

    try {
      // Transmission des données au service et retour à la liste principale des agents
      await createAgent(formValues, () => {
        navigate("/agents");
      });
    } catch (err) {
      console.error(
        "Erreur détectée lors de l'enregistrement de l'agent :",
        err,
      );
    }
  };

  const handleCancel = () => {
    navigate("/agents");
  };

  // Blocage visuel tant que les listes de rôles et groupes ne sont pas chargées depuis l'API
  if (isLoading) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Initialisation du formulaire et chargement des rôles et groupes...
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Création d'un agent" />

        {/* Notification d'anomalie réseau */}
        {error && (
          <Box
            p={3}
            bg="red.50"
            borderWidth={1}
            borderColor="red.200"
            borderRadius="md"
          >
            <Text color="red.600" fontSize="sm" fontWeight="bold">
              {error}
            </Text>
          </Box>
        )}

        <FormContainer
          submitLabel="Créer l'agent"
          onSave={handleSave}
          onCancel={handleCancel}
        >
          {/* Sous-bloc 1 : Identité */}
          <FormSection title="Identité" columns={3}>
            <InputTextField
              label="Prénom"
              placeholder="Prénom"
              value={formValues.prenom}
              onChange={(e) =>
                setFormValues({ ...formValues, prenom: e.target.value })
              }
            />
            <InputTextField
              label="Nom"
              placeholder="Nom"
              value={formValues.nom}
              onChange={(e) =>
                setFormValues({ ...formValues, nom: e.target.value })
              }
            />
            <InputTextField
              label="Email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
          </FormSection>

          {/* Sous-bloc 2 : Habilitations */}
          <FormSection title="Habilitations" columns={3}>
            {/* L'agence reste basée sur la collection locale fixe codeSiege */}
            <DropDownList
              label="Agence"
              placeholder="Agence"
              collection={codeSiege}
              value={formValues.agence}
              onValueChange={(val) =>
                setFormValues({ ...formValues, agence: val })
              }
            />

            {/* Rôle alimenté dynamiquement par l'API via le Hook */}
            <DropDownList
              label="Rôle"
              placeholder="Sélectionner un rôle"
              collection={rolesCollection}
              value={formValues.role}
              onValueChange={(val) =>
                setFormValues({ ...formValues, role: val })
              }
            />

            {/* Groupe alimenté dynamiquement par l'API via le Hook */}
            <DropDownList
              label="Groupe"
              placeholder="Sélectionner un groupe"
              collection={groupesCollection}
              value={formValues.groupe}
              onValueChange={(val) =>
                setFormValues({ ...formValues, groupe: val })
              }
            />
          </FormSection>
        </FormContainer>

        {isSubmitting && (
          <Center>
            <Text fontSize="xs" color="gray.500">
              Création du profil de l'agent sur le serveur...
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};
