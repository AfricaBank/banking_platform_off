import { Box, VStack } from "@chakra-ui/react";
import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { useState } from "react";
import { codeSiege } from "@/dataObject/ListCollection";

export const NouvelAgent = () => {
  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    agence: "",
    role: "",
    groupe: "",
  });

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Création d'un agent" />

        <FormContainer
          submitLabel="Créer l'agent"
          onSave={() => console.log(formValues)}
          onCancel={() => {}}
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
            <DropDownList
              label="Agence"
              placeholder="Agence"
              collection={codeSiege}
              value={formValues.agence}
              onValueChange={(val) =>
                setFormValues({ ...formValues, agence: val })
              }
            />
            <DropDownList
              label="Rôle"
              placeholder="Rôle"
              collection={codeSiege}
              value={formValues.role}
              onValueChange={(val) =>
                setFormValues({ ...formValues, role: val })
              }
            />
            <DropDownList
              label="Groupe"
              placeholder="Groupe"
              collection={codeSiege}
              value={formValues.groupe}
              onValueChange={(val) =>
                setFormValues({ ...formValues, groupe: val })
              }
            />
          </FormSection>
        </FormContainer>
      </VStack>
    </Box>
  );
};
