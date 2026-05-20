import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, GridItem, HStack, VStack } from "@chakra-ui/react";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { codeSiege } from "@/dataObject/ListCollection";

export const NouveauGroup = () => {
  const navigate = useNavigate();

  // État local du formulaire
  const [formValues, setFormValues] = useState({
    agence: "",
    nomGroupe: "",
    description: "",
  });

  const handleSave = () => {
    console.log("Données du groupe prêtes pour l'API :", formValues);
    navigate("/groupes");
  };

  const handleCancel = () => {
    // Retour à la liste principale lors du clic sur Annuler
    navigate("/groupes");
  };

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        {/* Composant de titre d'action déjà créé */}
        <ModuleFormHeader title="Créer un nouveau groupe" />

        {/* Notre structure de formulaire réutilisable */}
        <FormContainer onSave={handleSave} onCancel={handleCancel}>
          <HStack>
            {" "}
            <DropDownList
              label="Agence"
              placeholder="Choisir une agence"
              collection={codeSiege}
              value={formValues.agence}
              onValueChange={(val) =>
                setFormValues({ ...formValues, agence: val })
              }
            />
            {/* Champ Nom du groupe */}
            <InputTextField
              label="Nom du groupe"
              placeholder="Nom du groupe"
              value={formValues.nomGroupe}
              onChange={(e) =>
                setFormValues({ ...formValues, nomGroupe: e.target.value })
              }
            />
          </HStack>

          {/* Champ Description - Étendu sur 2 colonnes via GridItem */}
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
      </VStack>
    </Box>
  );
};
