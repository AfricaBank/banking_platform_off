import { Box, Text } from "@chakra-ui/react";
import { StepperBox } from "../pageContents/StepperBox";
import { StepperComponent } from "../pageContents/StepperComponent";
import { ajoutTitulaire } from "@/dataObject/stepsObjects";
import { UserIdentificationForms } from "./titulaireEtCoTitulaire/UserIdentificationForms";
import { BankAccountForms } from "./titulaireEtCoTitulaire/BankAccountForms";
import { LegalFinancialForms } from "./titulaireEtCoTitulaire/LegalFinancialForms";
import { ResidancialContactForms } from "./titulaireEtCoTitulaire/ResidancialContactForms";
import { SimpleButton } from "../customButtons/SimpleButton";
import GeneralInfoBlock from "../blocInfos/BlocInfosGenerales";
import { useState } from "react";

const formComponents = [
  <UserIdentificationForms />, // index 0
  <LegalFinancialForms />, // index 1
  <ResidancialContactForms />, // index 2
  <BankAccountForms />, // index 3
  // Si l'étape 4 dans ajoutTitulaire est bien une étape finale ou récapitulative
  // et non un formulaire en tant que tel, tu pourrais y mettre un composant de confirmation
  // ou laisser vide si c'est géré par StepsCompletedContent
  null, // ou un composant <ConfirmationForm /> si l'étape 4 est un formulaire
];

export const FormLayout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ajoutTitulaire.length - 1;

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const currentStepTitle =
    ajoutTitulaire[currentStep]?.title || "Chargement...";
  return (
    <>
      <Box>
        <GeneralInfoBlock />
      </Box>
      <Box
        width="100%"
        padding="4"
        height="100% "
        borderRadius="10px"
        boxShadow="0px 0px 6px 2px rgba(70, 70, 118, 0.1)"
        display="flex"
        gap={4}
      >
        <StepperBox>
          <StepperComponent
            steps={ajoutTitulaire}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </StepperBox>
        <Box width="100%" height="100%" padding="10px" overflow="auto">
          <Box pb="12px">
            <Text color="black">Ajout du titulaire </Text>
          </Box>
          <Box pb="10px">{formComponents[currentStep]}</Box>
          <Box pb="10px" display="flex" justifyContent="center">
            <SimpleButton>Enregistrer le brouillon</SimpleButton>
            <SimpleButton variant="outline" onClick={handlePrevious}>
              Précedent
            </SimpleButton>
            {currentStep < totalSteps ? (
              <SimpleButton colorPalette="" onClick={handleNext}>
                Suivant
              </SimpleButton>
            ) : (
              <SimpleButton colorPalette="">
                Terminer {/* Ou un bouton "Soumettre" pour la dernière étape */}
              </SimpleButton>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
