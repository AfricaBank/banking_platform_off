// src/components/pageContents/CreationTiers.tsx

import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { ajouterTitulaire } from "@/api/dossierApi";
import { useDossier } from "@/context/DossierContext";
import { StepperComponent } from "@/components/pageContents/StepperComponent.tsx";
import { StepperBox } from "@/components/pageContents/StepperBox.tsx";
import { UserIdentificationForms } from "@/components/formsComponents/titulaireEtCoTitulaire/UserIdentificationForms.tsx";
import { LegalFinancialForms } from "@/components/formsComponents/titulaireEtCoTitulaire/LegalFinancialForms.tsx";
import { ResidancialContactForms } from "@/components/formsComponents/titulaireEtCoTitulaire/ResidancialContactForms.tsx";
import { BankAccountForms } from "@/components/formsComponents/titulaireEtCoTitulaire/BankAccountForms.tsx";
import { SimpleButton } from "../customButtons/SimpleButton.tsx";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocationState {
  dossierId: number;
  referenceDossier?: string;
  nomInitial?: string;
  prenomInitial?: string;
  estCoTitulaire?: boolean;
}

// ─── Étapes du stepper ────────────────────────────────────────────────────────

const STEPS = [
  { index: 0, title: "Identification" },
  { index: 1, title: "Situation juridique et financière" },
  { index: 2, title: "Coordonnées et résidence" },
  { index: 3, title: "Compte bancaire" },
];

// ─── Transformation form → TiersDTO ──────────────────────────────────────────

const mapFormToTiersDTO = (data: any) => ({
  // Identification
  typeTiers: data.tiers,
  categorieClient: data.categorie_cliente,
  matriculeAgent: data.matricule_agent,
  nom: data.nom,
  prenom: data.prenom,
  nomAbrege: data.nom_abrege,
  civilite: data.civilite,
  sexe: data.sexe,
  dateNaissance: data.date_naissance,
  lieuNaissance: data.lieu_naissance,
  paysNaissance: data.pays_naissance,
  numeroIdentifiantFiscal: data.numero_identification_fiscale,
  paysNationalite: data.nationalite,
  paysDoubleNationalite: data.double_nationalite,

  // Informations familiales
  situationFamille: data.situation_famille,
  regimeMatrimonial: data.regime_matrimonial,
  nomMarital: data.nom_marital,
  prenomPere: data.prenom_pere,
  prenomMere: data.prenom_mere,
  nomJeuneFille: data.nom_jeune_fille,
  nombreEnfantsCharge: data.nombre_enfants_charge
    ? parseInt(data.nombre_enfants_charge)
    : undefined,

  // Informations légales / EER
  numeroImmatriculation: data.numero_immatriculation,
  numeroActeNaissance: data.numero_acte_naissance,
  paysImmatriculation: data.pays_immatriculation,
  dateEer: data.date_EER,
  motifEer: data.motif_EER,
  modaliteEer: data.modalite_EER,
  paysKyc: data.pays_kyc,

  // Situation juridique et financière
  capaciteJuridique: data.capacite_juridique,
  dateEffet: data.date_effet,
  segmentSecuriteFinanciere: data.segment_securite,
  categorieSocioProfessionnelle: data.categori_socio_professionnelle,
  secteurActiviteEconomique: data.secteur_activite_eco,
  activiteRisque: data.activite_risque,
  descriptionActivite: data.description_activite,
  dateCreationActivite: data.date_creation_activite,
  paysActivite: data.pays_activite,
  pourcentageActivite: data.pourcentage_activite
    ? parseInt(data.pourcentage_activite)
    : undefined,
  cumulePourcentageActivite: data.cumule_pourcentage_activite
    ? parseInt(data.cumule_pourcentage_activite)
    : undefined,
  commentaireActivite: data.commentaire_activite,

  // Employeur
  nomEmployeur: data.nom_employeur,
  domiciliationSalaire: data.domiciliation_salaire,
  depuisQuand: data.depuis_quand,

  // Coordonnées
  codePostal: data.code_postal,
  ville: data.ville,
  adresse: data.adresse,
  mobile: data.mobile,
  email: data.email,
  paysAdresseFiscale: data.pays_adresse_fiscal,
  statutResidence: data.statut_residence,
  dateEntreeTerritoire: data.date_entree_territoire,

  // Consentement
  consentementCreditBureau: data.consentement_credit_bureau,
  commentaireRelation: data.commentaire_relation,

  // Comptes et personnes en charge (sous-objets)
  comptes: data.accounts ?? [],
  personnesEnCharge: (data.personnes ?? []).slice(
    0,
    parseInt(data.nombre_personnes) || 0,
  ),
});

// ─── Composant ────────────────────────────────────────────────────────────────

const CreationTiers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dossier } = useDossier();

  const state = location.state as LocationState | null;
  const dossierId = state?.dossierId ?? dossier?.id;
  const referenceDossier = state?.referenceDossier ?? dossier?.referenceDossier;
  const estCoTitulaire = state?.estCoTitulaire ?? false;

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const methods = useForm({
    defaultValues: {
      nom: state?.nomInitial ?? "",
      prenom: state?.prenomInitial ?? "",
    },
    mode: "onTouched",
  });

  // ── Navigation entre étapes ───────────────────────────────────────────────

  const handleNext = async () => {
    // Valider uniquement les champs de l'étape courante
    const fieldsParEtape: Record<number, string[]> = {
      0: [
        "tiers",
        "nom",
        "prenom",
        "civilite",
        "sexe",
        "date_naissance",
        "lieu_naissance",
        "pays_naissance",
        "nationalite",
        "date_EER",
        "motif_EER",
        "modalite_EER",
        "pays_kyc",
      ],
      1: [
        "capacite_juridique",
        "date_effet",
        "categori_socio_professionnelle",
        "secteur_activite_eco",
        "activite_risque",
        "date_creation_activite",
        "pays_activite",
      ],
      2: ["ville", "adresse", "mobile", "email", "pays_adresse_fiscal"],
      3: [],
    };

    const isValid = await methods.trigger(fieldsParEtape[currentStep] as any);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // ── Soumission finale ─────────────────────────────────────────────────────

  const onSubmit = async (data: any) => {
    if (!dossierId) {
      setApiError("Identifiant du dossier manquant.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const tiersDTO = mapFormToTiersDTO(data);
      await ajouterTitulaire(dossierId, tiersDTO, estCoTitulaire);

      navigate("/dossier-synthese", {
        state: { dossierId, referenceDossier },
      });
    } catch (err: any) {
      setApiError(
        err.response?.data?.message ??
          "Une erreur est survenue lors de l'enregistrement.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Rendu ─────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* En-tête */}
      <Box
        h="50px"
        bg="#C9E1F8"
        mt="10px"
        display="flex"
        alignItems="center"
        pl="20px"
        borderRadius="md"
      >
        <HStack gap={4}>
          <Text fontWeight="bold">
            {estCoTitulaire ? "AJOUT CO-TITULAIRE" : "CRÉATION DU TITULAIRE"}
          </Text>
          {referenceDossier && (
            <Badge colorScheme="blue" fontSize="sm">
              Dossier : {referenceDossier}
            </Badge>
          )}
        </HStack>
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex minH="100vh" bg="gray.100" p={4} gap={4}>
            {/* Stepper vertical */}
            <StepperBox>
              <StepperComponent
                steps={STEPS}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </StepperBox>

            {/* Contenu de l'étape */}
            <Box
              flex="1"
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              p={8}
              overflowY="auto"
            >
              {/* Erreur API */}
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

              {/* Contenu selon l'étape */}
              {currentStep === 0 && <UserIdentificationForms />}
              {currentStep === 1 && <LegalFinancialForms />}
              {currentStep === 2 && <ResidancialContactForms />}
              {currentStep === 3 && <BankAccountForms />}

              {/* Boutons de navigation */}
              <Flex justify="space-between" mt={8}>
                <SimpleButton
                  type="button"
                  variant="outline"
                  colorScheme="gray"
                  onClick={currentStep === 0 ? () => navigate(-1) : handlePrev}
                  disabled={isSubmitting}
                >
                  {currentStep === 0 ? (
                    <>
                      <CgCloseR /> Annuler
                    </>
                  ) : (
                    <>
                      <MdArrowBack /> Précédent
                    </>
                  )}
                </SimpleButton>

                <HStack gap={4}>
                  {currentStep < STEPS.length - 1 ? (
                    <Button
                      type="button"
                      colorScheme="blue"
                      onClick={handleNext}
                      disabled={isSubmitting}
                    >
                      Suivant <MdArrowForward />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color="white"
                      bg="primary.dogerBlue.300"
                      _hover={{ bg: "white", color: "primary.dogerBlue.300" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <HStack gap={2}>
                          <Spinner size="sm" />
                          <Text>Enregistrement...</Text>
                        </HStack>
                      ) : (
                        <HStack gap={2}>
                          <FaCheck />
                          <Text>Enregistrer</Text>
                        </HStack>
                      )}
                    </Button>
                  )}
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default CreationTiers;
