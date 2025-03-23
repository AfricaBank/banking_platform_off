import { Box, Text } from "@chakra-ui/react";
import { StepperBox } from "../pageContents/StepperBox";
import { StepperComponent } from "../pageContents/StepperComponent";
import { ajoutPersonnePhysique } from "@/dataObject/stepsObjects";
import { FormFieldSet } from "./FormFieldSet";
import { InputTextField } from "../customFormFields/InputTextField";

export const FormLayout = () => {
  return (
    <Box
      width="100%"
      padding="4"
      height="100% "
      borderRadius="10px"
      boxShadow="0px 0px 6px 2px rgba(70, 70, 118, 0.1)"
      display="flex"
      gap={4}
      overflow="auto"
    >
      <StepperBox>
        <StepperComponent steps={ajoutPersonnePhysique} />
      </StepperBox>
      <Box width="100%" height="100%" padding="10px">
        <Box pb="12px">
          <Text color="black">Ajout du titulaire </Text>
        </Box>
        <Box>
          <FormFieldSet label="Informations utilisateur">
            <InputTextField label="Nom" placeholder="Nom" />
            <InputTextField label="Email" placeholder="Email" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
          </FormFieldSet>
          <FormFieldSet label="Détails du produit">
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
          </FormFieldSet>
          <FormFieldSet label="Détails du produit">
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
            <InputTextField label="Téléphone" placeholder="Téléphone" />
          </FormFieldSet>
        </Box>
      </Box>
    </Box>
  );
};
