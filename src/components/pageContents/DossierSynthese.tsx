// src/components/pageContents/DossierSynthese.tsx

import {
    Box, Text, Flex, HStack, VStack,
    Badge, Button, Spinner, Separator,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDossier } from "@/context/DossierContext";
import { getDossierById } from "@/api/dossierApi";
import { FaUser, FaUsers, FaUserTie, FaBuilding } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

// ─── Types locaux ─────────────────────────────────────────────────────────────

interface LocationState {
    dossierId: number;
    referenceDossier?: string;
    modeConsultation?: boolean;
}

interface PersonneSynthese {
    id?: number;
    nom?: string;
    prenom?: string;
    role: string;
    type: "TITULAIRE" | "CO_TITULAIRE" | "PLP" | "PLM";
    typeRelation?: string;
}

// ─── Composant carte personne ─────────────────────────────────────────────────

const CartePersonne = ({
                           personne,
                           onModifier,
                           onSupprimer,
                       }: {
    personne: PersonneSynthese;
    onModifier?: () => void;
    onSupprimer?: () => void;
}) => {
    const colorScheme = {
        TITULAIRE:    "blue",
        CO_TITULAIRE: "teal",
        PLP:          "purple",
        PLM:          "orange",
    }[personne.type];

    const icone = {
        TITULAIRE:    <FaUser />,
        CO_TITULAIRE: <FaUsers />,
        PLP:          <FaUserTie />,
        PLM:          <FaBuilding />,
    }[personne.type];

    return (
        <Flex
            align="center" justify="space-between"
            p={4} borderWidth={1} borderRadius="md"
            borderColor="gray.200" bg="white"
            _hover={{ borderColor: "blue.300", boxShadow: "sm" }}
        >
            <HStack gap={4}>
                <Box
                    w="40px" h="40px" borderRadius="full"
                    bg={`${colorScheme}.100`}
                    display="flex" alignItems="center" justifyContent="center"
                    color={`${colorScheme}.600`}
                    fontSize="lg"
                >
                    {icone}
                </Box>
                <VStack align="flex-start" gap={0}>
                    <HStack gap={2}>
                        <Text fontWeight="bold" fontSize="sm">
                            {personne.nom ?? "—"} {personne.prenom ?? ""}
                        </Text>
                        <Badge colorScheme={colorScheme} fontSize="xs">
                            {personne.role}
                        </Badge>
                        {personne.typeRelation && (
                            <Badge colorScheme="gray" fontSize="xs" variant="outline">
                                {personne.typeRelation}
                            </Badge>
                        )}
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                        ID : {personne.id ?? "—"}
                    </Text>
                </VStack>
            </HStack>

            <HStack gap={2}>
                {onModifier && (
                    <Button size="xs" colorScheme="blue" variant="outline"
                            onClick={onModifier}>
                        Modifier
                    </Button>
                )}
                {onSupprimer && (
                    <Button size="xs" colorScheme="red" variant="outline"
                            onClick={onSupprimer}>
                        Supprimer
                    </Button>
                )}
            </HStack>
        </Flex>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const Section = ({
                     titre, enfants, onAjouter, labelAjouter,
                 }: {
    titre: string;
    enfants: PersonneSynthese[];
    onAjouter?: () => void;
    labelAjouter?: string;
}) => (
    <Box mb={6}>
        <HStack justify="space-between" mb={3}>
            <Text fontWeight="bold" fontSize="md" color="gray.700">
                {titre}
                <Badge ml={2} colorScheme="gray">{enfants.length}</Badge>
            </Text>
            {onAjouter && (
                <Button size="xs" colorScheme="green" onClick={onAjouter}>
                    + {labelAjouter ?? "Ajouter"}
                </Button>
            )}
        </HStack>
        {enfants.length === 0 ? (
            <Box p={4} borderWidth={1} borderRadius="md" borderColor="gray.100"
                 bg="gray.50" textAlign="center">
                <Text fontSize="sm" color="gray.400">Aucun élément</Text>
            </Box>
        ) : (
            <VStack gap={2} align="stretch">
                {enfants.map((p, i) => (
                    <CartePersonne key={i} personne={p} />
                ))}
            </VStack>
        )}
    </Box>
);

// ─── Composant principal ──────────────────────────────────────────────────────

const DossierSynthese = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { dossier: dossierContext } = useDossier();

    const state     = location.state as LocationState | null;
    const dossierId = state?.dossierId ?? dossierContext?.id;
    const reference = state?.referenceDossier ?? dossierContext?.referenceDossier;

    const [dossier,   setDossier]   = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError,  setApiError]  = useState<string | null>(null);

    // ── Mode consultation : validateur ou dossier déjà soumis/validé ─────────
    // Calculé après chargement du dossier — d'où le || sur dossier?.statut
    const modeConsultation =
        state?.modeConsultation === true
        || dossier?.statut === "VALIDE"
        || dossier?.statut === "REJETE"
        || dossier?.etapeActuelle === "SOUMISSION_VALIDATION";

    // ── Chargement du dossier ─────────────────────────────────────────────────

    useEffect(() => {
        if (dossierId) chargerDossier();
    }, [dossierId]);

    const chargerDossier = async () => {
        if (!dossierId) return;
        setIsLoading(true);
        try {
            const data = await getDossierById(dossierId);
            setDossier(data);
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors du chargement du dossier."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // ── Construction de la liste des personnes ────────────────────────────────

    const buildPersonnes = (): {
        titulaires: PersonneSynthese[];
        coTitulaires: PersonneSynthese[];
        plp: PersonneSynthese[];
        plm: PersonneSynthese[];
    } => {
        if (!dossier) return { titulaires: [], coTitulaires: [], plp: [], plm: [] };

        const titulaires: PersonneSynthese[] = dossier.titulairePrincipal
            ? [{
                id:     dossier.titulairePrincipal.id,
                nom:    dossier.titulairePrincipal.nom,
                prenom: dossier.titulairePrincipal.prenom,
                role:   "Titulaire principal",
                type:   "TITULAIRE",
            }]
            : [];

        const coTitulaires: PersonneSynthese[] = (dossier.coTitulaires ?? [])
            .map((t: any) => ({
                id: t.id, nom: t.nom, prenom: t.prenom,
                role: "Co-titulaire", type: "CO_TITULAIRE",
            }));

        const plp: PersonneSynthese[] = (dossier.personnesPhysiques ?? [])
            .map((p: any) => ({
                id:           p.id,
                nom:          p.tiers?.nom ?? p.nomFamille,
                prenom:       p.tiers?.prenom ?? p.prenom,
                role:         "Personne liée physique",
                type:         "PLP",
                typeRelation: p.typeRelation,
            }));

        const plm: PersonneSynthese[] = (dossier.personnesMorales ?? [])
            .map((p: any) => ({
                id:     p.idPLM,
                nom:    p.tiers?.nom ?? p.raisonSociale,
                prenom: "",
                role:   "Personne liée morale",
                type:   "PLM",
            }));

        return { titulaires, coTitulaires, plp, plm };
    };

    const { titulaires, coTitulaires, plp, plm } = buildPersonnes();

    // ── Handlers navigation ───────────────────────────────────────────────────

    const handleAjouterCoTitulaire = () =>
        navigate("/creation-tiers", {
            state: { dossierId, referenceDossier: reference, estCoTitulaire: true }
        });

    const handleAjouterPLP = () =>
        navigate("/ajout-personne-physique", {
            state: { dossierId, referenceDossier: reference }
        });

    const handleAjouterPLM = () =>
        navigate("/ajout-personne-morale", {
            state: { dossierId, referenceDossier: reference }
        });

    const handleSuivre = () =>
        navigate("/pieces-justificatives", {
            state: { dossierId, referenceDossier: reference }
        });

    // ── Rendu ─────────────────────────────────────────────────────────────────

    return (
        <Box>
            {/* En-tête */}
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex"
                 alignItems="center" pl="20px" borderRadius="md">
                <HStack gap={4}>
                    <Text fontWeight="bold">SYNTHÈSE DU DOSSIER</Text>
                    {reference && (
                        <Badge colorScheme="blue" fontSize="sm">
                            Dossier : {reference}
                        </Badge>
                    )}
                    {dossier?.statut && (
                        <Badge
                            colorScheme={
                                dossier.statut === "VALIDE"  ? "green"
                                    : dossier.statut === "REJETE" ? "red"
                                        : dossier.statut === "A_REGULARISER_METIER" ? "orange"
                                            : "green"
                            }
                            fontSize="sm"
                        >
                            {dossier.statut}
                        </Badge>
                    )}
                    {modeConsultation && (
                        <Badge colorScheme="purple" fontSize="sm" variant="outline">
                            Mode consultation
                        </Badge>
                    )}
                </HStack>
            </Box>

            <Flex justify="center" minH="100vh" bg="gray.100" px={4} py={6}>
                <Box w="full" maxW="900px">

                    {/* Erreur */}
                    {apiError && (
                        <Box mb={4} p={3} bg="red.50" border="1px solid"
                             borderColor="red.300" borderRadius="md">
                            <Text color="red.600" fontSize="sm">{apiError}</Text>
                        </Box>
                    )}

                    {/* Chargement */}
                    {isLoading ? (
                        <Flex justify="center" align="center" h="300px">
                            <Spinner size="lg" color="blue.500" />
                        </Flex>
                    ) : (
                        <Box bg="white" borderRadius="lg" boxShadow="lg" p={8}>

                            {/* Bannière mode consultation */}
                            {modeConsultation && (
                                <Box mb={4} p={3} bg="purple.50" borderRadius="md"
                                     border="1px solid" borderColor="purple.200">
                                    <Text fontSize="sm" color="purple.700" fontWeight="medium">
                                        Vous consultez ce dossier en lecture seule.
                                        Les modifications ne sont pas autorisées.
                                    </Text>
                                </Box>
                            )}

                            {/* Infos dossier */}
                            {dossier && (
                                <Box mb={6} p={4} bg="blue.50" borderRadius="md">
                                    <HStack gap={6} flexWrap="wrap">
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Référence</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.referenceDossier}
                                            </Text>
                                        </VStack>
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Type</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.typePersonne}
                                            </Text>
                                        </VStack>
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Nature relation</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.natureRelation}
                                            </Text>
                                        </VStack>
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Étape</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.etapeActuelle}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            )}

                            <Separator mb={6} />

                            {/* Sections personnes */}
                            <Section
                                titre="Titulaire principal"
                                enfants={titulaires}
                            />

                            <Section
                                titre="Co-titulaires"
                                enfants={coTitulaires}
                                onAjouter={modeConsultation ? undefined : handleAjouterCoTitulaire}
                                labelAjouter="Ajouter co-titulaire"
                            />

                            <Section
                                titre="Personnes liées physiques (PLP)"
                                enfants={plp}
                                onAjouter={modeConsultation ? undefined : handleAjouterPLP}
                                labelAjouter="Ajouter PLP"
                            />

                            <Section
                                titre="Personnes liées morales (PLM)"
                                enfants={plm}
                                onAjouter={modeConsultation ? undefined : handleAjouterPLM}
                                labelAjouter="Ajouter PLM"
                            />

                            <Separator mt={6} mb={6} />

                            {/* Actions */}
                            <Flex justify="space-between">
                                <Button
                                    variant="outline"
                                    colorScheme="gray"
                                    onClick={() => navigate(-1)}
                                >
                                    Retour
                                </Button>

                                {modeConsultation ? (
                                    <HStack gap={4}>
                                        <Button
                                            colorScheme="blue"
                                            onClick={chargerDossier}
                                            isDisabled={isLoading}
                                        >
                                            Actualiser
                                        </Button>
                                        <Button
                                            color="white"
                                            bg="primary.dogerBlue.300"
                                            _hover={{ bg: "white",
                                                color: "primary.dogerBlue.300" }}
                                            onClick={() => navigate("/pieces-justificatives", {
                                                state: { dossierId, referenceDossier: reference }
                                            })}
                                            isDisabled={titulaires.length === 0}
                                        >
                                            Passer aux PJ <MdArrowForward />
                                        </Button>
                                    </HStack>
                                ) : (
                                    <HStack gap={4}>
                                        <Button
                                            colorScheme="blue"
                                            onClick={chargerDossier}
                                            isDisabled={isLoading}
                                        >
                                            Actualiser
                                        </Button>
                                        <Button
                                            color="white"
                                            bg="primary.dogerBlue.300"
                                            _hover={{ bg: "white",
                                                color: "primary.dogerBlue.300" }}
                                            onClick={handleSuivre}
                                            isDisabled={titulaires.length === 0}
                                        >
                                            Passer aux PJ <MdArrowForward />
                                        </Button>
                                    </HStack>
                                )}
                            </Flex>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default DossierSynthese;
