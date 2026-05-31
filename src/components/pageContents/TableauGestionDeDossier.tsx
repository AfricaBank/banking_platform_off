"use client";
// src/components/pageContents/TableauGestionDeDossier.tsx

import {
    Box, Text, Flex, IconButton,
    Spinner, Badge, Button, HStack,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuPencil, LuTrash2, LuRefreshCw } from "react-icons/lu";
import { MdUndo } from "react-icons/md";

import FilterForm from "@/components/pageContents/FilterForm";
import { TableActionsBar } from "./TableActionsBar.tsx";
import { GenericTable, ColumnConfig } from "./GenericTable.tsx";
import { actions } from "./pageContents.constants.ts";

import {
    getAllDossiers,
    abandonnerDossier,
    reprendreDossier,
} from "@/api/dossierApi";
import type { DossierEER, StatutDossier } from "@/types/dossier.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retourne la route de reprise selon l'étape actuelle du dossier.
 * Extrêmement important : redirige l'agent exactement là où il en était.
 */
const getRepriseRoute = (dossier: DossierEER): string => {
    switch (dossier.etapeActuelle) {
        case "RECHERCHE_PERSONNE":
            return `/recherchePersonne`;
        case "CREATION_TIERS":
        case "AJOUT_TITULAIRE":
            return `/creation-tiers`;
        case "AJOUT_PERSONNES_LIEES":
            return `/dossier-synthese`;
        case "ATTACHEMENT_PJ":
            return `/pieces-justificatives`;
        case "CR_CONSEILLER":
            return `/cr-conseiller`;
        case "SOUMISSION_VALIDATION":
        case "EDITION_DOCUMENTS":
        case "ATTENTE_SIGNATURE":
        case "TERMINE":
            return `/dossier-synthese`;
        default:
            return `/dossier-synthese`;
    }
};

const STATUT_CONFIG: Record<StatutDossier, { label: string; color: string }> = {
    EN_COURS:                { label: "En cours",              color: "blue.500"   },
    COMPLET:                 { label: "Complet",               color: "green.500"  },
    ANNULE:                  { label: "Abandonné",             color: "red.500"    },
    VALIDE:                  { label: "Validé",                color: "green.600"  },
    A_COMPLETER_CONFORMITE:  { label: "À compléter (conf.)",   color: "orange.500" },
    A_COMPLETER_METIER:      { label: "À compléter (métier)",  color: "orange.500" },
    A_COMPLETER_DG:          { label: "À compléter (DG)",      color: "orange.500" },
    A_REGULARISER_METIER:    { label: "À régulariser",         color: "red.400"    },
    A_REGULARISER_BO_CN1:    { label: "À régulariser BO",      color: "red.400"    },
    A_REGULARISER_SIGNATURE: { label: "À signer",              color: "purple.500" },
    A_ABANDONNER_RESAISIE:   { label: "À abandonner",          color: "red.600"    },
};

const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("fr-FR");
};

const getNomTitulaire = (dossier: DossierEER): string => {
    if (dossier.titulairePrincipal?.nom) {
        return `${dossier.titulairePrincipal.prenom ?? ""} ${dossier.titulairePrincipal.nom}`.trim();
    }
    return "—";
};

// ─── Composant ────────────────────────────────────────────────────────────────

const Tableau = () => {
    const navigate = useNavigate();

    const [dossiers, setDossiers]           = useState<DossierEER[]>([]);
    const [isLoading, setIsLoading]         = useState(false);
    const [apiError, setApiError]           = useState<string | null>(null);
    const [actionId, setActionId]           = useState<number | null>(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage]   = useState(0);
    const [totalPages, setTotalPages]     = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // ── Chargement ────────────────────────────────────────────────────────────

    const chargerDossiers = useCallback(async (page = 0) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const result = await getAllDossiers(page, 20);
            setDossiers(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
            setCurrentPage(result.number);
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors du chargement des dossiers."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        chargerDossiers(0);
    }, [chargerDossiers]);

    // ── Abandon ───────────────────────────────────────────────────────────────

    const handleAbandonner = async (dossier: DossierEER) => {
        if (!confirm(
            `Voulez-vous abandonner le dossier ${dossier.referenceDossier} ?\n` +
            `Il pourra être repris ultérieurement.`
        )) return;

        setActionId(dossier.id);
        try {
            await abandonnerDossier(dossier.id);
            // Mettre à jour localement sans recharger toute la liste
            setDossiers(prev => prev.map(d =>
                d.id === dossier.id ? { ...d, statut: "ANNULE" } : d
            ));
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors de l'abandon du dossier."
            );
        } finally {
            setActionId(null);
        }
    };

    // ── Reprise ───────────────────────────────────────────────────────────────

    const handleReprendre = async (dossier: DossierEER) => {
        setActionId(dossier.id);
        try {
            const updated = await reprendreDossier(dossier.id);
            setDossiers(prev => prev.map(d =>
                d.id === dossier.id ? { ...d, statut: "EN_COURS" } : d
            ));
            // Rediriger vers l'étape en cours
            const route = getRepriseRoute(updated);
            navigate(route, {
                state: {
                    dossierId: updated.id,
                    referenceDossier: updated.referenceDossier,
                }
            });
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors de la reprise du dossier."
            );
        } finally {
            setActionId(null);
        }
    };

    // ── Modifier (reprendre là où on en était) ────────────────────────────────

    const handleModifier = (dossier: DossierEER) => {
        if (dossier.statut === "ANNULE") {
            handleReprendre(dossier);
            return;
        }
        const route = getRepriseRoute(dossier);
        navigate(route, {
            state: {
                dossierId: dossier.id,
                referenceDossier: dossier.referenceDossier,
            }
        });
    };

    // ── Colonnes ──────────────────────────────────────────────────────────────

    const columns: ColumnConfig<DossierEER>[] = [
        {
            header: "Prénom Nom / Raison sociale",
            key: "titulairePrincipal",
            render: (d) => <Text>{getNomTitulaire(d)}</Text>,
        },
        {
            header: "Numéro dossier",
            key: "referenceDossier",
            render: (d) => (
                <Text fontWeight="semibold" fontSize="sm">
                    {d.referenceDossier}
                </Text>
            ),
        },
        {
            header: "Processus",
            key: "etapeActuelle",
            render: (d) => <Text fontSize="xs">EER</Text>,
        },
        {
            header: "Statut",
            key: "statut",
            render: (d) => {
                const config = STATUT_CONFIG[d.statut] ?? {
                    label: d.statut, color: "gray.500"
                };
                return (
                    <Text fontWeight="bold" color={config.color} fontSize="sm">
                        {config.label}
                    </Text>
                );
            },
        },
        {
            header: "Étape",
            key: "etapeActuelle",
            render: (d) => (
                <Text fontSize="xs" color="gray.600">
                    {d.etapeActuelle?.replace(/_/g, " ")}
                </Text>
            ),
        },
        {
            header: "Exploitant",
            key: "codeExploitant",
            render: (d) => <Text fontSize="sm">{d.codeExploitant ?? "—"}</Text>,
        },
        {
            header: "Création",
            key: "dateCreation",
            render: (d) => (
                <Text fontSize="sm">{formatDate(d.dateCreation)}</Text>
            ),
        },
        {
            header: "Modification",
            key: "dateModification",
            render: (d) => (
                <Text fontSize="sm">{formatDate(d.dateModification)}</Text>
            ),
        },
        {
            header: "Actions",
            key: "actions",
            render: (d) => {
                const isActioning = actionId === d.id;
                const isAnnule = d.statut === "ANNULE";

                return (
                    <Flex gap={2} justify="center">
                        {/* Consulter — à implémenter plus tard */}
                        <IconButton
                            rounded="md"
                            aria-label="Voir"
                            size="xs"
                            bg="dogerBlue.500"
                            color="white"
                            onClick={() => console.log("Voir :", d.referenceDossier)}
                            isDisabled={isActioning}
                        >
                            <LuEye />
                        </IconButton>

                        {/* Modifier → reprend à l'étape en cours */}
                        <IconButton
                            rounded="md"
                            aria-label="Modifier"
                            size="xs"
                            bg="warnOrange.400"
                            color="white"
                            onClick={() => handleModifier(d)}
                            isDisabled={isActioning}
                        >
                            {isActioning ? <Spinner size="xs" /> : <LuPencil />}
                        </IconButton>

                        {isAnnule ? (
                            /* Reprendre si abandonné */
                            <IconButton
                                rounded="md"
                                aria-label="Reprendre"
                                size="xs"
                                bg="green.500"
                                color="white"
                                onClick={() => handleReprendre(d)}
                                isDisabled={isActioning}
                                title="Reprendre le dossier"
                            >
                                {isActioning ? <Spinner size="xs" /> : <MdUndo />}
                            </IconButton>
                        ) : (
                            /* Abandonner si actif */
                            <IconButton
                                rounded="md"
                                aria-label="Abandonner"
                                size="xs"
                                bg="errorRed.400"
                                color="white"
                                onClick={() => handleAbandonner(d)}
                                isDisabled={isActioning
                                    || d.statut === "VALIDE"}
                                title={d.statut === "VALIDE"
                                    ? "Un dossier validé ne peut pas être abandonné"
                                    : "Abandonner le dossier"}
                            >
                                {isActioning ? <Spinner size="xs" /> : <LuTrash2 />}
                            </IconButton>
                        )}
                    </Flex>
                );
            },
        },
    ];

    // ── Rendu ─────────────────────────────────────────────────────────────────

    return (
        <Box>
            {/* Barre d'actions */}
            <Box mb={6} paddingTop={2}>
                <TableActionsBar
                    buttons={actions}
                    onFilterClick={() => setIsFilterVisible(prev => !prev)}
                />
            </Box>

            {/* Filtre */}
            {isFilterVisible && (
                <Box mb={6}>
                    <FilterForm />
                </Box>
            )}

            {/* Erreur */}
            {apiError && (
                <Box mb={4} p={3} bg="red.50" border="1px solid"
                     borderColor="red.300" borderRadius="md">
                    <Text color="red.600" fontSize="sm">{apiError}</Text>
                </Box>
            )}

            {/* Chargement */}
            {isLoading ? (
                <Flex justify="center" align="center" h="200px">
                    <Spinner size="lg" color="blue.500" />
                </Flex>
            ) : (
                <>
                    <GenericTable data={dossiers} columns={columns} />

                    {/* Pagination + compteur */}
                    <Flex justify="space-between" align="center" mt={4}>
                        <Text fontSize="sm" color="gray.500">
                            {totalElements} dossier{totalElements > 1 ? "s" : ""} au total
                        </Text>

                        <HStack gap={2}>
                            <Button
                                size="xs"
                                isDisabled={currentPage === 0 || isLoading}
                                onClick={() => chargerDossiers(currentPage - 1)}
                            >
                                Précédent
                            </Button>
                            <Text fontSize="sm">
                                Page {currentPage + 1} / {totalPages || 1}
                            </Text>
                            <Button
                                size="xs"
                                isDisabled={currentPage >= totalPages - 1 || isLoading}
                                onClick={() => chargerDossiers(currentPage + 1)}
                            >
                                Suivant
                            </Button>
                            <IconButton
                                size="xs"
                                aria-label="Actualiser"
                                onClick={() => chargerDossiers(currentPage)}
                                isDisabled={isLoading}
                            >
                                <LuRefreshCw />
                            </IconButton>
                        </HStack>
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default Tableau;
