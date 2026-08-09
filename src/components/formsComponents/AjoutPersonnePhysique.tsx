import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useDossier } from "@/context/DossierContext";
import { ajouterPersonnePhysique as creerPersonnePhysique } from "@/api/dossierApi";

interface LocationState {
  dossierId?: number;
  referenceDossier?: string;
  estCoTitulaire?: boolean;
}

const formComponentsPp = [
  <Civility />,
  <OriginEER />,
  <PersonalInformations />,
  <ProfessionnalActivities />,
  <ConformityBankingRelation />,
  null,
];

export const AjoutPersonnePhysique = () => {
  const methods = useForm({ mode: "onTouched" });
  const { trigger, handleSubmit } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const { dossier: dossierContext } = useDossier();

  // Le dossierId/référence peuvent venir du state de navigation (depuis
  // DossierSynthese) ou du Context, comme dans les autres écrans du workflow.
  const state = location.state as LocationState | null;
  const dossierId = state?.dossierId ?? dossierContext?.id;
  const referenceDossier =
      state?.referenceDossier ?? dossierContext?.referenceDossier;

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const totalSteps = ajoutPersonnePhysique.length - 1;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: any) => {
    if (!dossierId) {
      setApiError(
          "Dossier introuvable. Veuillez relancer la recherche de personne."
      );
      return;
    }

    setApiError(null);
    setIsSubmitting(true);
    try {
      await creerPersonnePhysique(dossierId, data);
      navigate("/dossier-synthese", {
        state: { dossierId, referenceDossier },
      });
    } catch (err: any) {
      setApiError(
          err.response?.data?.message ??
          "Erreur lors de l'enregistrement de la personne."
      );
    } finally {
      setIsSubmitting(false);
    }
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

                {apiError && (
                    <Box
                        mb={4}
                        p={3}
                        bg="red.50"
                        border="1px solid"
                        borderColor="red.300"
                        borderRadius="md"
                    >
                      <Text color="red.600" fontSize="sm">
                        {apiError}
                      </Text>
                    </Box>
                )}

                <Box pb="10px">{formComponentsPp[currentStep]}</Box>

                {/* Boutons de navigation */}
                <Box pb="10px" display="flex" justifyContent="center" gap={4}>
                  <SimpleButton disabled={isSubmitting}>
                    Enregistrer le brouillon
                  </SimpleButton>

                  <SimpleButton
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={isSubmitting}
                  >
                    Précédent
                  </SimpleButton>

                  {currentStep < totalSteps ? (
                      <SimpleButton onClick={handleNext}>Suivant</SimpleButton>
                  ) : (
                      <SimpleButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                      </SimpleButton>
                  )}
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </form>
      </FormProvider>
  );
};
