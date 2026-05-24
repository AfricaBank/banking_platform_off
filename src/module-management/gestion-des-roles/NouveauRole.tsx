"use client";
import { Box, VStack, Text, Center } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection";

// Importation du hook personnalisé mis à jour
import { useRoles } from "@/hooks/useRoles";

export const NouveauRole = () => {
  const navigate = useNavigate();

  // Consommation de la logique métier centralisée dans le hook
  const { createRole, isSubmitting, error } = useRoles();

  // État local pour capturer les 3 champs du formulaire
  const [formValues, setFormValues] = useState({
    libelle: "",
    description: "",
    permissions: "",
  });

  const handleSave = async () => {
    // Validation rapide de surface
    if (!formValues.libelle || !formValues.description) {
      alert("Veuillez renseigner le libellé et la description du rôle.");
      return;
    }

    try {
      // Exécution de l'appel asynchrone et redirection vers la table principale
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
          {/* Section unique configurée explicitement sur 3 colonnes */}
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

            {/* Colonne 3 : Permissions */}
            <DropDownList
              label="Permissions"
              placeholder="Permissions"
              collection={codeSiege}
              value={formValues.permissions}
              onValueChange={(val) =>
                setFormValues({ ...formValues, permissions: val })
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
