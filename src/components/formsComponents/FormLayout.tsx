import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { StepperBox } from "../pageContents/StepperBox";
import { StepperComponent } from "../pageContents/StepperComponent";
import { ajoutTitulaire } from "@/dataObject/stepsObjects";

import { UserIdentificationForms } from "./titulaireEtCoTitulaire/UserIdentificationForms";
import { LegalFinancialForms } from "./titulaireEtCoTitulaire/LegalFinancialForms";
import { ResidancialContactForms } from "./titulaireEtCoTitulaire/ResidancialContactForms";
import { BankAccountForms } from "./titulaireEtCoTitulaire/BankAccountForms";

import { SimpleButton } from "../customButtons/SimpleButton";
import GeneralInfoBlock from "../blocInfos/BlocInfosGenerales";

// Composants de formulaire par étape
const formComponents = [
  <UserIdentificationForms />,
  <LegalFinancialForms />,
  <ResidancialContactForms />,
  <BankAccountForms />,
  null, // ou <FinalStep /> si tu en as un
];

export const FormLayout = () => {
  const methods = useForm({ mode: "onTouched" });
  const { trigger, handleSubmit } = methods;

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ajoutTitulaire.length - 1;

  const stepsWithTitlesOnly = ajoutTitulaire.map((step, index) => ({
    index,
    title: step.title,
  }));

  const handleNext = async () => {
    const isStepValid = await trigger(); // Valide les champs visibles
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: any) => {
    console.log("✅ Données soumises :", data);
    // ➜ Appel API, enregistrement, etc.
  };

  return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <GeneralInfoBlock />
          </Box>

          <Box
              width="100%"
              padding="4"
              borderRadius="10px"
              boxShadow="0px 0px 6px 2px rgba(70, 70, 118, 0.1)"
              display="flex"
              gap={4}
          >
            {/* Barre latérale des étapes */}
            <StepperBox>
              <StepperComponent
                  steps={stepsWithTitlesOnly}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
              />
            </StepperBox>

            {/* Formulaire principal de l'étape */}
            <Box width="100%" padding="10px" overflow="auto">
              <Box pb="12px">
                <Text color="black">Ajout du titulaire</Text>
              </Box>

              <Box pb="10px">{formComponents[currentStep]}</Box>

              {/* Boutons de navigation */}
              <Box pb="10px" display="flex" justifyContent="center" gap={4}>
                <SimpleButton>Enregistrer le brouillon</SimpleButton>

                <SimpleButton variant="outline" onClick={handlePrevious}>
                  Précédent
                </SimpleButton>

                {currentStep < totalSteps ? (
                    <SimpleButton onClick={handleNext}>Suivant</SimpleButton>
                ) : (
                    <SimpleButton type="submit">Terminer</SimpleButton>
                )}
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
  );
};
