import { Box, Text } from "@chakra-ui/react";
import { StepperBox } from "../pageContents/StepperBox";
import { StepperComponent } from "../pageContents/StepperComponent";
import { ajoutTitulaire } from "@/dataObject/stepsObjects";
import { UserIdentificationForms } from "./titulaireEtCoTitulaire/UserIdentificationForms";

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
        <StepperComponent steps={ajoutTitulaire} />
      </StepperBox>
      <Box width="100%" height="100%" padding="10px">
        <Box pb="12px">
          <Text color="black">Ajout du titulaire </Text>
        </Box>
        <Box pb="10px">
          <UserIdentificationForms />
        </Box>
      </Box>
    </Box>
  );
};
