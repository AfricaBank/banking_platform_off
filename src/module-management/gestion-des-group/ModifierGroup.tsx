"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, HStack, VStack, Text, Center, Spinner } from "@chakra-ui/react";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection";

import { useGroupes } from "@/hooks/useGroupes";
import { GroupData } from "@/components/pageContents/pageContents.type.ts";

interface UseGroupesReturn {
  groupes: GroupData[];
  isLoading: boolean;
  error: string | null;
  updateGroupe?: (id: string, data: Partial<GroupData>, callback: () => void) => Promise<void>;
}

export const ModifierGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Consommation du hook de gestion des groupes avec typage explicite
  const { groupes, isLoading: isHookLoading, error: hookError, updateGroupe } = useGroupes() as UseGroupesReturn;

  const [isLoadingGroup, setIsLoadingGroup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // État local miroir pour les champs du formulaire
  const [formValues, setFormValues] = useState({
    identifiant: "",
    agence: "",
    nomGroupe: "",
    description: "",
  });

  // Charger les données du groupe ciblé dès que la liste ou l'ID change
  useEffect(() => {
    if (!isHookLoading && groupes && id) {
      const groupToEdit = groupes.find((g) => g.id === id);
      
      if (groupToEdit) {
        setFormValues({
          identifiant: groupToEdit.identifiant || "",
          agence: groupToEdit.agence || "",
          nomGroupe: groupToEdit.nomGroupe || "",
          description: groupToEdit.description || "",
        });
        setIsLoadingGroup(false);
      } else {
        setLocalError("Le groupe demandé est introuvable.");
        setIsLoadingGroup(false);
      }
    }
  }, [id, groupes, isHookLoading]);

  const handleSave = async () => {
    if (!id) return;

    // Validation de sécurité
    if (!formValues.nomGroupe) {
      alert("Le champ 'Nom du groupe' est obligatoire.");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);

    try {
      if (typeof updateGroupe === "function") {
        await updateGroupe(id, { nomGroupe: formValues.nomGroupe, description: formValues.description }, () => {
          navigate("/groupes");
        });
      } else {
        const response = await fetch(`http://localhost:3001/groupes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomGroupe: formValues.nomGroupe,
            description: formValues.description,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour sur le serveur.");
        }

        console.log("Groupe mis à jour avec succès.");
        navigate("/groupes");
      }
    } catch (err: unknown) { // CORRECTION : Typage en 'unknown' pour remplacer 'any'
      console.error("Échec de la modification du groupe :", err);
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Une erreur est survenue lors de l'enregistrement.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/groupes");
  };

  // Gestion des affichages de chargement
  if (isHookLoading || isLoadingGroup) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Récupération des informations du groupe...
          </Text>
        </VStack>
      </Center>
    );
  }

  const displayError = hookError || localError;

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Mettre à jour un groupe" />

        {displayError && (
          <Box
            p={3}
            bg="red.50"
            borderWidth={1}
            borderColor="red.200"
            borderRadius="md"
          >
            <Text color="red.600" fontSize="sm" fontWeight="bold">
              {displayError}
            </Text>
          </Box>
        )}

        <FormContainer onSave={handleSave} onCancel={handleCancel}>
          <HStack width="100%" alignItems="flex-start" gap={4}>
            {/* CORRECTION : Utilisation de l'attribut standard 'disabled' requis par la v3 */}
            <InputTextField
              label="Identifiant du groupe"
              placeholder="Groupe-000"
              value={formValues.identifiant}
              disabled={true} 
              onChange={() => {}} 
            />

            {/* Si ton DropDownList personnalisé hérite également des props v3, utilise disabled={true} */}
            <DropDownList
              label="Agence"
              placeholder="Choisir une agence"
              collection={codeSiege}
              value={formValues.agence}
              disabled={true}
              onValueChange={() => {}}
            />
          </HStack>

          <HStack width="100%" alignItems="flex-start" gap={4} mt={4}>
            <InputTextField
              label="Nom du groupe"
              placeholder="Nom du groupe"
              value={formValues.nomGroupe}
              onChange={(e) =>
                setFormValues({ ...formValues, nomGroupe: e.target.value })
              }
            />

            <InputTextField
              label="Description"
              placeholder="Description du groupe"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />
          </HStack>
        </FormContainer>

        {isSubmitting && (
          <Center>
            <Text fontSize="xs" color="gray.500">
              Enregistrement des modifications en cours...
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default ModifierGroup;