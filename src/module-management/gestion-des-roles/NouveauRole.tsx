"use client";

import { Box, VStack, Text, Center, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";

// Remplacement de l'ancien DropDownList par notre nouveau composant multi-sélection typé
import { DropDownListMulti } from "@/components/customFormFields/DropDownListMulti";

// Importation du hook personnalisé mis à jour
import { useRoles } from "@/hooks/useRoles";

export const NouveauRole = () => {
  const navigate = useNavigate();

  // Récupération des états globaux et de la collection simulée des permissions
  const { 
    createRole, 
    permissionsCollection, 
    isLoading, 
    isSubmitting, 
    error 
  } = useRoles();

  // Structure de données locale accueillant un tableau de chaînes pour les permissions
  const [formValues, setFormValues] = useState({
    libelle: "",
    description: "",
    permissions: [] as string[],
  });

  const handleSave = async () => {
    // Validation de surface : s'assure qu'au moins une permission a été sélectionnée dans les tags
    if (
      !formValues.libelle || 
      !formValues.description || 
      formValues.permissions.length === 0
    ) {
      alert("Veuillez renseigner le libellé, la description et au moins une permission pour ce rôle.");
      return;
    }

    try {
      // Transmission directe de l'état local nettoyé au Hook métier
      await createRole(formValues, () => {
        navigate("/roles");
      });
    } catch (err) {
      console.error("Échec lors du processus de création du rôle :", err);
    }
  };

  const handleCancel = () => {
    navigate("/roles");
  };

  // Écran de chargement pendant l'initialisation des référentiels
  if (isLoading) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Chargement des référentiels et des permissions...
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        {/* En-tête textuel spécifique à l'action */}
        <ModuleFormHeader title="Création d'un nouveau role" />

        {/* Affichage d'un bandeau d'alerte en cas d'erreur de communication */}
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

        {/* Conteneur global gérant le sous-titre et les actions de validation */}
        <FormContainer
          subtitle="Saisir les informations obligatoires"
          submitLabel="Enregistrer"
          onSave={handleSave}
          onCancel={handleCancel}
        >
          {/* Section de formulaire configurée sur 3 colonnes de manière égale */}
          <FormSection title="Information du role" columns={3}>
            {/* Colonne 1 : Libellé */}
            <InputTextField
              label="Libellé"
              placeholder="Libellé"
              value={formValues.libelle}
              onChange={(e) =>
                setFormValues({ ...formValues, libelle: e.target.value })
              }
            />

            {/* Colonne 2 : Description */}
            <InputTextField
              label="Description"
              placeholder="Description"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />

            {/* Colonne 3 : Intégration du composant d'affichage et de suppression en ligne */}
            <DropDownListMulti
              label="Permissions"
              placeholder="Sélectionner une ou plusieurs permissions"
              collection={permissionsCollection}
              value={formValues.permissions}
              onValueChange={(vals) =>
                setFormValues({ ...formValues, permissions: vals })
              }
            />
          </FormSection>
        </FormContainer>

        {/* Feedback visuel discret lors de l'attente serveur */}
        {isSubmitting && (
          <Center>
            <Text fontSize="xs" color="gray.500">
              Traitement et enregistrement du rôle en cours...
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};