import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection"; // À remplacer par votre collection de permissions si nécessaire

export const NouveauRole = () => {
  const navigate = useNavigate();

  // État local pour capturer les 3 champs alignés sur la maquette
  const [formValues, setFormValues] = useState({
    libelle: "",
    description: "",
    permissions: "",
  });

  const handleSave = () => {
    console.log("Données du nouveau rôle prêtes pour l'API :", formValues);
    // Ajoutez ici votre logique d'appel API (ex: serviceRole.create(formValues))

    // Redirection vers la liste des rôles après succès
    navigate("/roles");
  };

  const handleCancel = () => {
    // Retour à la liste principale des rôles
    navigate("/roles");
  };

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        {/* En-tête textuel spécifique à l'action */}
        <ModuleFormHeader title="Création d'un nouveau role" />

        {/* Conteneur global gérant le sous-titre et les boutons Enregistrer / Annuler */}
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

            {/* Colonne 3 : Permissions (Composant Dropdown avec flèche selon la maquette) */}
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
      </VStack>
    </Box>
  );
};
