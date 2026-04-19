// src/components/pageContents/RecherchePersonne.tsx

import {
    Box, Text, Button, Input, HStack,
    VStack, Flex, Spinner, Badge
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDossier } from "@/context/DossierContext";
import { rechercherPersonne, selectionnerTiersExistant } from "@/api/dossierApi";
import type {
    RecherchePersonneRequest,
    TiersDTO
} from "@/types/dossier.types";

// ─── Types locaux ─────────────────────────────────────────────────────────────

interface LocationState {
    dossierId: number;
    referenceDossier: string;
    typePersonne: string;
    natureRelation: string;
}

// ─── Composant ────────────────────────────────────────────────────────────────

const RecherchePersonne = () => {
    const navigate   = useNavigate();
    const location   = useLocation();
    const { dossier } = useDossier();

    // Récupérer les infos du dossier depuis le state de navigation
    // ou depuis le Context (les deux sont disponibles)
    const state = location.state as LocationState | null;
    const dossierId = state?.dossierId ?? dossier?.id;
    const referenceDossier = state?.referenceDossier ?? dossier?.referenceDossier;

    // ── État local ────────────────────────────────────────────────────────────

    const [filters, setFilters] = useState({
        nom: "",
        prenom: "",
        dateNaissance: "",
    });

    const [dossiersEnCours, setDossiersEnCours] = useState<TiersDTO[]>([]);
    const [tiersExistants, setTiersExistants]   = useState<TiersDTO[]>([]);
    const [selectedTiersId, setSelectedTiersId] = useState<number | null>(null);
    const [isLoading, setIsLoading]             = useState(false);
    const [isSelecting, setIsSelecting]         = useState(false);
    const [apiError, setApiError]               = useState<string | null>(null);
    const [hasSearched, setHasSearched]         = useState(false);

    // ── Recherche initiale au montage (dossiers en cours) ─────────────────────
    useEffect(() => {
        if (dossierId) {
            handleRechercher();
        }
    }, []);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleReinitialiser = () => {
        setFilters({ nom: "", prenom: "", dateNaissance: "" });
        setSelectedTiersId(null);
        setDossiersEnCours([]);
        setTiersExistants([]);
        setHasSearched(false);
        setApiError(null);
    };

    const handleRechercher = async () => {
        setIsLoading(true);
        setApiError(null);
        setSelectedTiersId(null);

        const request: RecherchePersonneRequest = {
            dossierId: dossierId,
            ...(filters.nom          && { nom: filters.nom }),
            ...(filters.prenom       && { prenom: filters.prenom }),
            ...(filters.dateNaissance && { dateNaissance: filters.dateNaissance }),
        };

        try {
            const result = await rechercherPersonne(request);
            setDossiersEnCours(result.dossiersEnCours ?? []);
            setTiersExistants(result.tiersExistants   ?? []);
            setHasSearched(true);
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors de la recherche."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Sélection d'un tiers existant → lier au dossier et passer à la création
    const handleSelectionnerTiers = async () => {
        if (!selectedTiersId || !dossierId) return;

        setIsSelecting(true);
        try {
            await selectionnerTiersExistant(dossierId, selectedTiersId);
            navigate("/ajout-titulaire", {
                state: { dossierId, tiersId: selectedTiersId }
            });
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Erreur lors de la sélection du tiers."
            );
        } finally {
            setIsSelecting(false);
        }
    };

    // Créer un nouveau tiers → aller directement au formulaire de création
    const handleCreerNouveauTiers = () => {
        navigate("/creation-tiers", {
            state: {
                dossierId,
                referenceDossier,
                // Pré-remplir avec les critères saisis
                nomInitial:    filters.nom,
                prenomInitial: filters.prenom,
            }
        });
    };

    const handleAnnuler = () => navigate(-1);

    // ── Tous les tiers affichés (en cours + existants) ────────────────────────
    const tousLesTiers = [...dossiersEnCours, ...tiersExistants];

    // ── Rendu ─────────────────────────────────────────────────────────────────

    return (
        <Box>
            {/* En-tête */}
            <Box
                h="50px" bg="#C9E1F8" mt="10px"
                display="flex" alignItems="center"
                pl="20px" borderRadius="md"
            >
                <HStack gap={4}>
                    <Text fontWeight="bold">RECHERCHE DE PERSONNES</Text>
                    {referenceDossier && (
                        <Badge colorScheme="blue" fontSize="sm">
                            Dossier : {referenceDossier}
                        </Badge>
                    )}
                </HStack>
            </Box>

            <Box
                display="flex" justifyContent="center"
                alignItems="center" minH="100vh"
                bg="gray.100" px={4}
            >
                <Box
                    p={8} borderWidth={1} borderRadius="lg"
                    bg="white" boxShadow="lg"
                    w="full" maxW="1400px"
                >
                    {/* Erreur API */}
                    {apiError && (
                        <Box
                            mb={4} p={3}
                            bg="red.50" border="1px solid"
                            borderColor="red.300" borderRadius="md"
                        >
                            <Text color="red.600" fontSize="sm">{apiError}</Text>
                        </Box>
                    )}

                    {/* Filtres de recherche */}
                    <VStack gap={6} align="stretch" mb={8}>
                        <Text fontSize="lg" fontWeight="bold" color="blue.500">
                            Recherchez la personne !
                        </Text>

                        <HStack gap={4}>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Nom</Text>
                                <Input
                                    placeholder="Nom"
                                    value={filters.nom}
                                    onChange={e => handleFilterChange("nom", e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleRechercher()}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Prénom</Text>
                                <Input
                                    placeholder="Prénom"
                                    value={filters.prenom}
                                    onChange={e => handleFilterChange("prenom", e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleRechercher()}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>
                                    Date de naissance
                                </Text>
                                <Input
                                    type="date"
                                    value={filters.dateNaissance}
                                    onChange={e => handleFilterChange("dateNaissance", e.target.value)}
                                />
                            </Box>
                        </HStack>

                        <HStack justify="flex-end" gap={4}>
                            <Button
                                color="red.500" variant="outline"
                                borderColor="red.500"
                                _hover={{ bg: "red.500", color: "white" }}
                                onClick={handleReinitialiser}
                                isDisabled={isLoading}
                            >
                                Réinitialiser
                            </Button>
                            <Button
                                color="white" bg="blue.500"
                                _hover={{ bg: "blue.600" }}
                                onClick={handleRechercher}
                                isDisabled={isLoading}
                            >
                                {isLoading
                                    ? <HStack gap={2}><Spinner size="sm"/><Text>Recherche...</Text></HStack>
                                    : "Appliquer"
                                }
                            </Button>
                        </HStack>
                    </VStack>

                    {/* Tableau des résultats */}
                    <Box
                        border="1px" borderColor="gray.200"
                        borderRadius="md" overflow="hidden" mb={6}
                    >
                        {/* En-tête tableau */}
                        <Flex
                            bg="blue.500" height="40px"
                            align="center" px={4}
                            color="white" fontWeight="bold"
                        >
                            <Box width="50px">-</Box>
                            <Box flex={1}>Nom</Box>
                            <Box flex={1}>Prénom</Box>
                            <Box flex={1}>Date de naissance</Box>
                            <Box flex={1}>Nationalité</Box>
                            <Box flex={1}>Pays de résidence</Box>
                            <Box flex={1}>Type</Box>
                        </Flex>

                        {/* Corps tableau */}
                        <Box maxH="400px" overflowY="auto">
                            {!hasSearched && (
                                <Flex
                                    align="center" justify="center"
                                    py={8} color="gray.400"
                                >
                                    <Text fontSize="sm">
                                        Lancez une recherche pour afficher les résultats
                                    </Text>
                                </Flex>
                            )}

                            {hasSearched && tousLesTiers.length === 0 && (
                                <Flex
                                    align="center" justify="center"
                                    py={8} color="gray.500"
                                >
                                    <VStack gap={2}>
                                        <Text fontSize="sm">
                                            Aucune personne trouvée.
                                        </Text>
                                        <Text fontSize="xs" color="gray.400">
                                            Vous pouvez créer un nouveau tiers.
                                        </Text>
                                    </VStack>
                                </Flex>
                            )}

                            {tousLesTiers.map((tiers) => {
                                const isEnCours = dossiersEnCours
                                    .some(d => d.id === tiers.id);
                                const isSelected = selectedTiersId === tiers.id;

                                return (
                                    <Flex
                                        key={tiers.id}
                                        align="center" px={4} py={3}
                                        borderBottom="1px" borderColor="gray.100"
                                        bg={isSelected ? "blue.50" : "white"}
                                        _hover={{ bg: isEnCours ? "gray.50" : "blue.50" }}
                                        // Dossiers en cours = lecture seule
                                        onClick={() => !isEnCours && setSelectedTiersId(
                                            isSelected ? null : tiers.id ?? null
                                        )}
                                        cursor={isEnCours ? "default" : "pointer"}
                                        opacity={isEnCours ? 0.7 : 1}
                                    >
                                        {/* Checkbox visuel */}
                                        <Box
                                            width="50px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {!isEnCours && (
                                                <Box
                                                    width="20px" height="20px"
                                                    border="2px solid"
                                                    borderColor={isSelected ? "blue.500" : "gray.400"}
                                                    borderRadius="4px"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    bg={isSelected ? "blue.500" : "white"}
                                                >
                                                    {isSelected && (
                                                        <Box
                                                            width="10px" height="10px"
                                                            bg="white" borderRadius="2px"
                                                        />
                                                    )}
                                                </Box>
                                            )}
                                        </Box>

                                        <Box flex={1}>{tiers.nom ?? "—"}</Box>
                                        <Box flex={1}>{tiers.prenom ?? "—"}</Box>
                                        <Box flex={1}>{tiers.dateNaissance ?? "—"}</Box>
                                        <Box flex={1}>{tiers.paysNationalite ?? "—"}</Box>
                                        <Box flex={1}>{tiers.paysAdresseFiscale ?? "—"}</Box>
                                        <Box flex={1}>
                                            <Badge
                                                colorScheme={isEnCours ? "orange" : "green"}
                                                fontSize="xs"
                                            >
                                                {isEnCours ? "En cours" : "ATLAS"}
                                            </Badge>
                                        </Box>
                                    </Flex>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* Boutons d'action */}
                    <Flex justifyContent="space-between" mt={8}>
                        <Button
                            color="red.500" variant="outline"
                            borderColor="red.500"
                            _hover={{ bg: "red.500", color: "white" }}
                            onClick={handleAnnuler}
                            isDisabled={isLoading || isSelecting}
                        >
                            Annuler
                        </Button>

                        <HStack gap={4}>
                            {/* Toujours possible de créer un nouveau tiers */}
                            <Button
                                color="white" bg="green.500"
                                _hover={{ bg: "green.600" }}
                                onClick={handleCreerNouveauTiers}
                                isDisabled={isLoading || isSelecting}
                            >
                                Créer un nouveau tiers
                            </Button>

                            {/* Actif uniquement si un tiers ATLAS est sélectionné */}
                            <Button
                                color="white" bg="blue.500"
                                _hover={{ bg: "blue.600" }}
                                isDisabled={!selectedTiersId || isSelecting}
                                onClick={handleSelectionnerTiers}
                            >
                                {isSelecting
                                    ? <HStack gap={2}>
                                        <Spinner size="sm"/>
                                        <Text>Sélection...</Text>
                                    </HStack>
                                    : "Choisir cette personne"
                                }
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default RecherchePersonne;
