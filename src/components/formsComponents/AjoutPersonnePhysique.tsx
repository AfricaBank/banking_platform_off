import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { StepperComponent } from "../pageContents/StepperComponent.tsx";
import { StepperBox } from "../pageContents/StepperBox.tsx";
import { ajoutPersonnePhysique } from "@/dataObject/stepsObjects.ts";
import { Civility } from "./personneLieePhysique/Civility.tsx";
import { ConformityBankingRelation } from "./personneLieePhysique/ConformityBankingRelation.tsx";
import { OriginEER } from "./personneLieePhysique/OriginEER.tsx";
import { PersonalInformations } from "./personneLieePhysique/PersonalInformations.tsx";
import { ProfessionnalActivities } from "./personneLieePhysique/ProfessionnalActivities.tsx";
import GeneralInfoBlock from "../blocInfos/BlocInfosGenerales.tsx";
import { SimpleButton } from "../customButtons/SimpleButton.tsx";

const formComponentsPp = [
  <Civility />,
  <ConformityBankingRelation />,
  <OriginEER />,
  <PersonalInformations />,
  <ProfessionnalActivities />,
  null,
];

export const AjoutPersonnePhysique = () => {
  const methods = useForm({ mode: "onTouched" });
  const { trigger, handleSubmit } = methods;

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ajoutPersonnePhysique.length - 1;

  const stepsWithTitlesOnly = ajoutPersonnePhysique.map((step, index) => ({
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
        <Grid templateColumns="200px 1fr" gap={8} p={8}>
          <GridItem>
            <StepperBox>
              <StepperComponent
                steps={ajoutPersonnePhysique}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </StepperBox>
          </GridItem>
          <GridItem>
            {/* Formulaire principal de l'étape */}
            <Box width="100%" padding="10px" overflow="wrapper">
              <Box pb="12px">
                <Text color="black">Ajout de personne liée physique </Text>
              </Box>

              <Box pb="10px">{formComponentsPp[currentStep]}</Box>

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
          </GridItem>
        </Grid>
      </form>
    </FormProvider>
  );
};
