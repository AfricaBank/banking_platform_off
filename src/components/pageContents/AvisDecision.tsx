// src/components/pageContents/AvisDecision.tsx
import {
    Box, Text, Flex, HStack, VStack,
    Badge, Button, Spinner, Separator, Textarea,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDossier } from "@/context/DossierContext";
import {
    getDossierById,
    getPJParDossier,
    soumettreAvisDecision,
    getAvisDecision,
} from "@/api/dossierApi";
import type { AvisDecisionDTO, PieceJustificativeDTO } from "@/types/dossier.types";

// ─── Types locaux ─────────────────────────────────────────────────────────────

interface LocationState {
    dossierId: number;
    referenceDossier?: string;
}

type Decision = "VALIDE" | "A_REGULARISER" | "REJETE";

const DECISION_LABELS: Record<Decision, string> = {
    VALIDE:        "✓ Valider le dossier",
    A_REGULARISER: "↩ Renvoyer pour régularisation",
    REJETE:        "✗ Rejeter le dossier",
};

const DECISION_COLORS: Record<Decision, string> = {
    VALIDE:        "green",
    A_REGULARISER: "orange",
    REJETE:        "red",
};

// ─── Composant carte PJ (lecture seule) ───────────────────────────────────────

const CartePJ = ({ pj }: { pj: PieceJustificativeDTO }) => (
    <Flex
        align="center" px={3} py={2} mb={1}
        bg="gray.50" borderRadius="md"
        border="1px solid" borderColor="gray.200"
    >
        <HStack gap={2} flex={1}>
            <Text fontSize="xs">📄</Text>
            <VStack align="flex-start" gap={0}>
                <Text fontSize="xs" fontWeight="semibold">{pj.nomDocument}</Text>
                <Text fontSize="xs" color="gray.500">
                    {pj.libelle} — Réf. : {pj.docubaseId}
                </Text>
            </VStack>
        </HStack>
        <Badge colorScheme={pj.attache ? "green" : "orange"} fontSize="xs">
            {pj.attache ? "Attaché" : "Manquant"}
        </Badge>
    </Flex>
);

// ─── Composant principal ──────────────────────────────────────────────────────

const AvisDecision = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { dossier: dossierContext } = useDossier();

    const state     = location.state as LocationState | null;
    const dossierId = state?.dossierId ?? dossierContext?.id;
    const reference = state?.referenceDossier ?? dossierContext?.referenceDossier;

    const [dossier,      setDossier]      = useState<any | null>(null);
    const [pjList,       setPjList]       = useState<PieceJustificativeDTO[]>([]);
    const [avisExistant, setAvisExistant] = useState<AvisDecisionDTO | null>(null);
    const [isLoading,    setIsLoading]    = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError,     setApiError]     = useState<string | null>(null);
    const [succes,       setSucces]       = useState<string | null>(null);

    // Formulaire décision
    const [decision,     setDecision]     = useState<Decision | "">("");
    const [commentaire,  setCommentaire]  = useState("");
    const [motifRenvoi,  setMotifRenvoi]  = useState("");
    const [motifRejet,   setMotifRejet]   = useState("");

    useEffect(() => {
        if (dossierId) chargerDonnees();
    }, [dossierId]);

    const chargerDonnees = async () => {
        if (!dossierId) return;
        setIsLoading(true);
        try {
            const [dossierData, pjData, avisData] = await Promise.all([
                getDossierById(dossierId),
                getPJParDossier(dossierId),
                getAvisDecision(dossierId),
            ]);
            setDossier(dossierData);
            setPjList(pjData);
            if (avisData) {
                setAvisExistant(avisData);
                setDecision(avisData.decision);
                setCommentaire(avisData.commentaire ?? "");
                setMotifRenvoi(avisData.motifRenvoi ?? "");
                setMotifRejet(avisData.motifRejet ?? "");
            }
        } catch (err: any) {
            setApiError(
                err.response?.data?.message ?? "Erreur lors du chargement."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Dossier déjà décidé → écran en lecture seule
    const dossierDecide = !!avisExistant
        || (dossier?.statut === "VALIDE")
        || (dossier?.statut === "REJETE");

    // Validation formulaire
    const formulaireValide = (): boolean => {
        if (!decision) return false;
        if (decision === "A_REGULARISER" && !motifRenvoi.trim()) return false;
        if (decision === "REJETE" && !motifRejet.trim()) return false;
        return true;
    };

    const handleSoumettre = async () => {
        if (!dossierId || !decision) return;
        setIsSubmitting(true);
        setApiError(null);
        try {
            const dto: AvisDecisionDTO = {
                decision,
                commentaire:  commentaire.trim() || undefined,
                motifRenvoi:  decision === "A_REGULARISER" ? motifRenvoi.trim() : undefined,
                motifRejet:   decision === "REJETE" ? motifRejet.trim() : undefined,
                validateur:   "John Doe", // TODO : remplacer par l'utilisateur connecté
                dossierEERId: dossierId,
            };
            const avis = await soumettreAvisDecision(dossierId, dto);
            setAvisExistant(avis);
            setSucces(
                decision === "VALIDE"
                    ? "Dossier validé avec succès."
                    : decision === "A_REGULARISER"
                        ? "Dossier renvoyé à l'initiateur pour régularisation."
                        : "Dossier rejeté."
            );
            await chargerDonnees();
        } catch (err: any) {
            setApiError(
                err.response?.data?.message ?? "Erreur lors de la soumission."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Regroupement PJ par personne pour la consultation
    const pjParTiers = pjList.reduce<Record<string, PieceJustificativeDTO[]>>(
        (acc, pj) => {
            const key = String(pj.tiersId ?? "sans-tiers");
            acc[key] = [...(acc[key] ?? []), pj];
            return acc;
        },
        {}
    );

    return (
        <Box>
            {/* En-tête */}
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex"
                 alignItems="center" pl="20px" borderRadius="md">
                <HStack gap={4}>
                    <Text fontWeight="bold">AVIS & DÉCISION</Text>
                    {reference && (
                        <Badge colorScheme="blue" fontSize="sm">
                            Dossier : {reference}
                        </Badge>
                    )}
                    {dossier?.statut && (
                        <Badge
                            colorScheme={
                                dossier.statut === "VALIDE" ? "green"
                                    : dossier.statut === "REJETE" ? "red"
                                        : dossier.statut === "A_REGULARISER_METIER" ? "orange"
                                            : "blue"
                            }
                            fontSize="sm"
                        >
                            {dossier.statut}
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

                    {/* Succès */}
                    {succes && (
                        <Box mb={4} p={3} bg="green.50" border="1px solid"
                             borderColor="green.300" borderRadius="md">
                            <Text color="green.700" fontSize="sm">✓ {succes}</Text>
                        </Box>
                    )}

                    {isLoading ? (
                        <Flex justify="center" align="center" h="300px">
                            <Spinner size="lg" color="blue.500" />
                        </Flex>
                    ) : (
                        <Box bg="white" borderRadius="lg" boxShadow="lg" p={8}>

                            {/* ── Section 1 : Infos dossier ───────────────── */}
                            <Text fontWeight="bold" fontSize="md" color="blue.600"
                                  mb={3} pb={2} borderBottom="2px solid"
                                  borderColor="blue.100">
                                Informations du dossier
                            </Text>
                            {dossier && (
                                <Box mb={6} p={4} bg="gray.50" borderRadius="md">
                                    <HStack gap={8} flexWrap="wrap">
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
                                            <Text fontSize="xs" color="gray.500">
                                                Nature relation
                                            </Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.natureRelation}
                                            </Text>
                                        </VStack>
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Initiateur</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.createur}
                                            </Text>
                                        </VStack>
                                        <VStack align="flex-start" gap={0}>
                                            <Text fontSize="xs" color="gray.500">Date création</Text>
                                            <Text fontWeight="bold" fontSize="sm">
                                                {dossier.dateCreation?.slice(0, 10)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            )}

                            {/* ── Section 2 : Personnes du dossier ────────── */}
                            <Text fontWeight="bold" fontSize="md" color="blue.600"
                                  mb={3} pb={2} borderBottom="2px solid"
                                  borderColor="blue.100">
                                Personnes
                            </Text>
                            <Box mb={6}>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                    mb={3}
                                    onClick={() =>
                                        navigate("/dossier-synthese", {
                                            state: {
                                                dossierId,
                                                referenceDossier: reference,
                                                modeConsultation: true,
                                            },
                                        })
                                    }
                                >
                                    👁 Consulter toutes les personnes →
                                </Button>
                                {dossier?.titulairePrincipal && (
                                    <Flex align="center" p={3} bg="blue.50"
                                          borderRadius="md" border="1px solid"
                                          borderColor="blue.200">
                                        <Text fontSize="sm" fontWeight="semibold">
                                            Titulaire : {dossier.titulairePrincipal.nom}{" "}
                                            {dossier.titulairePrincipal.prenom}
                                        </Text>
                                        <Badge ml={3} colorScheme="blue" fontSize="xs">
                                            ID : {dossier.titulairePrincipal.id}
                                        </Badge>
                                    </Flex>
                                )}
                            </Box>

                            {/* ── Section 3 : Pièces justificatives ───────── */}
                            <Text fontWeight="bold" fontSize="md" color="blue.600"
                                  mb={3} pb={2} borderBottom="2px solid"
                                  borderColor="blue.100">
                                Pièces justificatives indexées
                            </Text>
                            <Box mb={6}>
                                {pjList.length === 0 ? (
                                    <Text fontSize="sm" color="gray.400">
                                        Aucune pièce justificative.
                                    </Text>
                                ) : (
                                    <VStack align="stretch" gap={3}>
                                        {Object.entries(pjParTiers).map(([tiersId, pjs]) => (
                                            <Box key={tiersId}>
                                                <Text fontSize="xs" color="gray.500"
                                                      fontWeight="semibold" mb={1}>
                                                    Tiers ID : {tiersId}
                                                </Text>
                                                {pjs.map((pj) => (
                                                    <CartePJ key={pj.id} pj={pj} />
                                                ))}
                                            </Box>
                                        ))}
                                    </VStack>
                                )}
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                    mt={3}
                                    onClick={() =>
                                        navigate("/pieces-justificatives", {
                                            state: { dossierId, referenceDossier: reference },
                                        })
                                    }
                                >
                                    👁 Voir les documents en détail →
                                </Button>
                            </Box>

                            <Separator mb={6} />

                            {/* ── Section 4 : Décision ────────────────────── */}
                            <Text fontWeight="bold" fontSize="md" color="blue.600"
                                  mb={4} pb={2} borderBottom="2px solid"
                                  borderColor="blue.100">
                                Décision du validateur
                            </Text>

                            {/* Avis déjà rendu → lecture seule */}
                            {dossierDecide && avisExistant ? (
                                <Box p={4} bg="gray.50" borderRadius="md"
                                     border="1px solid" borderColor="gray.200">
                                    <HStack mb={3}>
                                        <Text fontSize="sm" fontWeight="semibold">
                                            Décision :
                                        </Text>
                                        <Badge
                                            colorScheme={
                                                DECISION_COLORS[avisExistant.decision]
                                            }
                                            fontSize="sm"
                                        >
                                            {avisExistant.decision}
                                        </Badge>
                                    </HStack>
                                    {avisExistant.commentaire && (
                                        <Box mb={2}>
                                            <Text fontSize="xs" color="gray.500">
                                                Commentaire
                                            </Text>
                                            <Text fontSize="sm">
                                                {avisExistant.commentaire}
                                            </Text>
                                        </Box>
                                    )}
                                    {avisExistant.motifRenvoi && (
                                        <Box mb={2}>
                                            <Text fontSize="xs" color="gray.500">
                                                Motif de renvoi
                                            </Text>
                                            <Text fontSize="sm" color="orange.700">
                                                {avisExistant.motifRenvoi}
                                            </Text>
                                        </Box>
                                    )}
                                    {avisExistant.motifRejet && (
                                        <Box mb={2}>
                                            <Text fontSize="xs" color="gray.500">
                                                Motif du rejet
                                            </Text>
                                            <Text fontSize="sm" color="red.700">
                                                {avisExistant.motifRejet}
                                            </Text>
                                        </Box>
                                    )}
                                    <Text fontSize="xs" color="gray.400" mt={2}>
                                        Par {avisExistant.validateur} —{" "}
                                        {avisExistant.dateDecision?.toString().slice(0, 16)}
                                    </Text>
                                </Box>
                            ) : (
                                /* Formulaire de décision */
                                <VStack align="stretch" gap={4}>
                                    {/* Liste déroulante Décision */}
                                    <Box>
                                        <Text fontSize="sm" fontWeight="semibold" mb={2}>
                                            Décision *
                                        </Text>
                                        <select
                                            value={decision}
                                            onChange={(e) => {
                                                setDecision(e.target.value as Decision | "");
                                                setCommentaire("");
                                                setMotifRenvoi("");
                                                setMotifRejet("");
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                border: "1px solid #CBD5E0",
                                                fontSize: "14px",
                                                background: "white",
                                            }}
                                        >
                                            <option value="">-- Choisir une décision --</option>
                                            <option value="VALIDE">
                                                {DECISION_LABELS.VALIDE}
                                            </option>
                                            <option value="A_REGULARISER">
                                                {DECISION_LABELS.A_REGULARISER}
                                            </option>
                                            <option value="REJETE">
                                                {DECISION_LABELS.REJETE}
                                            </option>
                                        </select>
                                    </Box>

                                    {/* Commentaire optionnel — VALIDE */}
                                    {decision === "VALIDE" && (
                                        <Box>
                                            <Text fontSize="sm" fontWeight="semibold" mb={2}>
                                                Commentaire (optionnel)
                                            </Text>
                                            <Textarea
                                                placeholder="Votre analyse ou commentaire..."
                                                value={commentaire}
                                                onChange={(e) =>
                                                    setCommentaire(e.target.value)
                                                }
                                                rows={4}
                                                borderColor="gray.300"
                                                _focus={{ borderColor: "green.400" }}
                                            />
                                        </Box>
                                    )}

                                    {/* Motif de renvoi — A_REGULARISER */}
                                    {decision === "A_REGULARISER" && (
                                        <Box>
                                            <Text fontSize="sm" fontWeight="semibold"
                                                  mb={2} color="orange.600">
                                                Motif de renvoi *
                                            </Text>
                                            <Textarea
                                                placeholder="Précisez les manquements du dossier (données manquantes, documents insuffisants, personnes à ajouter...)."
                                                value={motifRenvoi}
                                                onChange={(e) =>
                                                    setMotifRenvoi(e.target.value)
                                                }
                                                rows={5}
                                                borderColor="orange.300"
                                                _focus={{ borderColor: "orange.400" }}
                                            />
                                        </Box>
                                    )}

                                    {/* Motif du rejet — REJETE */}
                                    {decision === "REJETE" && (
                                        <Box>
                                            <Text fontSize="sm" fontWeight="semibold"
                                                  mb={2} color="red.600">
                                                Motif du rejet *
                                            </Text>
                                            <Textarea
                                                placeholder="Précisez le motif du rejet définitif."
                                                value={motifRejet}
                                                onChange={(e) =>
                                                    setMotifRejet(e.target.value)
                                                }
                                                rows={5}
                                                borderColor="red.300"
                                                _focus={{ borderColor: "red.400" }}
                                            />
                                        </Box>
                                    )}
                                </VStack>
                            )}

                            <Separator mt={6} mb={6} />

                            {/* Actions */}
                            <Flex justify="space-between" align="center">
                                <Button
                                    variant="outline"
                                    colorScheme="gray"
                                    onClick={() =>
                                        navigate("/pieces-justificatives", {
                                            state: { dossierId,
                                                referenceDossier: reference },
                                        })
                                    }
                                >
                                    ← Retour aux PJ
                                </Button>

                                {!dossierDecide && (
                                    <Button
                                        bg={
                                            decision === "VALIDE" ? "green.500"
                                                : decision === "A_REGULARISER" ? "orange.400"
                                                    : decision === "REJETE" ? "red.500"
                                                        : "blue.500"
                                        }
                                        color="white"
                                        isDisabled={
                                            !formulaireValide() || isSubmitting
                                        }
                                        onClick={handleSoumettre}
                                    >
                                        {isSubmitting ? (
                                            <HStack gap={2}>
                                                <Spinner size="sm" />
                                                <Text>Enregistrement...</Text>
                                            </HStack>
                                        ) : decision === "VALIDE"
                                            ? "Valider le dossier"
                                            : decision === "A_REGULARISER"
                                                ? "Renvoyer pour régularisation"
                                                : decision === "REJETE"
                                                    ? "Confirmer le rejet"
                                                    : "Soumettre la décision"}
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default AvisDecision;
