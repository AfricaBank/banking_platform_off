"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, GridItem, HStack, VStack, Text, Center } from "@chakra-ui/react";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection";

// Importation du hook mis à jour
import { useGroupes } from "@/hooks/useGroupes";

export const NouveauGroup = () => {
  const navigate = useNavigate();

  // Consommation de la logique de création du hook personnalisé
  const { createGroupe, isSubmitting, error } = useGroupes();

  // État local du formulaire
  const [formValues, setFormValues] = useState({
    agence: "",
    nomGroupe: "",
    description: "",
  });

  const handleSave = async () => {
    // Validation rapide de sécurité avant envoi
    if (!formValues.agence || !formValues.nomGroupe) {
      alert(
        "Veuillez remplir tous les champs obligatoires (Agence et Nom du groupe).",
      );
      return;
    }

    try {
      // Exécution de l'appel API via le hook et redirection en cas de succès
      await createGroupe(formValues, () => {
        navigate("/groupes");
      });
    } catch (err) {
      // L'erreur est interceptée ici mais elle est déjà stockée dans l'état 'error' du hook
      console.error("Échec de la création du groupe :", err);
    }
  };

  const handleCancel = () => {
    navigate("/groupes");
  };

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Créer un nouveau groupe" />

        {/* Affichage d'un bandeau d'erreur si la création échoue */}
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

        {/* FormContainer gère le mode chargement via un paramètre si votre composant le supporte */}
        <FormContainer onSave={handleSave} onCancel={handleCancel}>
          <HStack width="100%" alignItems="flex-start">
            <DropDownList
              label="Agence"
              placeholder="Choisir une agence"
              collection={codeSiege}
              value={formValues.agence}
              onValueChange={(val) =>
                setFormValues({ ...formValues, agence: val })
              }
            />
            <InputTextField
              label="Nom du groupe"
              placeholder="Nom du groupe"
              value={formValues.nomGroupe}
              onChange={(e) =>
                setFormValues({ ...formValues, nomGroupe: e.target.value })
              }
            />
          </HStack>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <InputTextField
              label="Description"
              placeholder="Description"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />
          </GridItem>
        </FormContainer>

        {/* Indicateur optionnel visuel discret de soumission */}
        {isSubmitting && (
          <Center>
            <Text fontSize="xs" color="gray.500">
              Enregistrement du groupe sur le serveur en cours...
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};
