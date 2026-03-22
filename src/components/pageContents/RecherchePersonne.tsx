// src/components/pageContents/RecherchePersonne.tsx

import {
    Box, Text, Button, Input, HStack,
    VStack, Flex, Spinner, Badge
  Box,
  Button,
  Text,
  Flex,
  HStack,
  VStack,
  Checkbox,
  Input,
  IconButton,
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  // Données simulées de recherche
  const searchData = [
    {
      id: "12345",
      matricule: "12345",
      nom: "Ixoff",
      prenom: "Kouadio",
      profession: "Architecte",
      dateNaissance: "13/05/1990",
      statut: "Notiforme",
      type: "CXI d'huile",
    },
    {
      id: "97564",
      matricule: "97564",
      nom: "Oistila",
      prenom: "Alissala",
      profession: "Enseignant",
      dateNaissance: "12/06/1996",
      statut: "Notiforme",
      type: "CXI d'huile",
    },
    {
      id: "98768",
      matricule: "98768",
      nom: "K'Ouessan",
      prenom: "Monasa",
      profession: "Ingénieur",
      dateNaissance: "1/09/1975",
      statut: "Notiforme",
      type: "CXI d'huile",
    },
    {
      id: "01990",
      matricule: "01990",
      nom: "Taseré",
      prenom: "Kouadio",
      profession: "Médecin",
      dateNaissance: "2/10/1979",
      statut: "Notiforme plateau",
      type: "CXI d'huile",
    },
  ];

  // Filtrer les données basées sur la recherche
  const filteredData = searchData.filter(
    (person) =>
      person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.matricule.includes(searchTerm) ||
      person.profession.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelection = (personId: string) => {
    setSelectedPerson(personId === selectedPerson ? null : personId);
  };

  const handleSuivant = () => {
    if (selectedPerson) {
      const person = searchData.find((p) => p.id === selectedPerson);
      console.log("Personne sélectionnée:", person);
      navigate("/ajout-titulaire", { state: { person } });
    }
  };

  const handleAjouter = () => {
    navigate("/ajout-manuel");
  };

  const handleAnnuler = () => {
    navigate("/dossiers-gestion");
  };

  return (
    <Box>
      <Box
        h="50px"
        bg="#C9E1F8"
        mt="10px"
        display="flex"
        alignItems="center"
        pl="20px"
        borderRadius="md"
      >
        <Text fontWeight="bold">RECHERCHE DE PERSONNE</Text>
      </Box>

      <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          bg="white"
          boxShadow="lg"
          w="full"
          maxW="1400px"
        >
          {/* Formulaire de recherche */}
          <VStack gap={6} align="stretch" mb={6}>
            <Text fontSize="lg" fontWeight="bold" color="primary.dogerBlue.300">
              Identifiant
            </Text>

            <HStack gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Nom
                </Text>
                <Input
                  placeholder="Nom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Prénom
                </Text>
                <Input
                  placeholder="Prénom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Date de naissance
                </Text>
                <Input type="date" placeholder="Date de naissance" />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Identifiant
                </Text>
                <Input
                  placeholder="Identifiant"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
            </HStack>

            <HStack gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Nom
                </Text>
                <Input
                  placeholder="Nom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Prénom
                </Text>
                <Input
                  placeholder="Prénom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Date de naissance
                </Text>
                <Input type="date" placeholder="Date de naissance" />
              </Box>
              <Box>
                <Button
                  mt={6}
                  color="white"
                  bg="primary.dogerBlue.300"
                  _hover={{ bg: "primary.dogerBlue.400" }}
                  leftIcon={<HiSearch />}
                >
                  Rechercher
                </Button>
              </Box>
            </HStack>
          </VStack>

          {/* Tableau simplifié sans composant Table */}
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
            mb={6}
          >
            {/* En-tête du tableau */}
            <Flex
              bg="primary.dogerBlue.300"
              height="40px"
              align="center"
              px={4}
              borderTopLeftRadius="md"
              borderTopRightRadius="md"
            >
              <Text width="50px" color="white" fontWeight="bold">
                Sélection
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Matricule
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Nom
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Prénom
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Profession
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Date de naissance
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Statut
              </Text>
              <Text flex={1} color="white" fontWeight="bold">
                Type
              </Text>
              <Text width="120px" color="white" fontWeight="bold">
                Actions
              </Text>
            </Flex>

            {/* Corps du tableau */}
            <Box maxH="400px" overflowY="auto">
              {filteredData.map((person) => (
                <Flex
                  key={person.id}
                  align="center"
                  px={4}
                  py={3}
                  borderBottom="1px"
                  borderColor="gray.100"
                  bg={selectedPerson === person.id ? "blue.50" : "white"}
                  _hover={{ bg: "gray.50" }}
                >
                  <Box width="50px">
                    <Checkbox
                      isChecked={selectedPerson === person.id}
                      onChange={() => handleSelection(person.id)}
                    />
                  </Box>
                  <Text flex={1}>{person.matricule}</Text>
                  <Text flex={1}>{person.nom}</Text>
                  <Text flex={1}>{person.prenom}</Text>
                  <Text flex={1}>{person.profession}</Text>
                  <Text flex={1}>{person.dateNaissance}</Text>
                  <Text flex={1}>{person.statut}</Text>
                  <Text flex={1}>{person.type}</Text>
                  <Box width="120px">
                    <HStack gap={1}>
                      <IconButton
                        aria-label="Voir détails"
                        bg="primary.dogerBlue.300"
                        size="sm"
                        onClick={() => console.log("Voir:", person.id)}
                        borderRadius="md"
                      >
                        <LuEye color="white" />
                      </IconButton>
                      <IconButton
                        aria-label="Modifier"
                        size="sm"
                        bg="orange.400"
                        onClick={() => console.log("Modifier:", person.id)}
                        borderRadius="md"
                      >
                        <LuPencil color="white" />
                      </IconButton>
                      <IconButton
                        aria-label="Supprimer"
                        bg="red.500"
                        size="sm"
                        borderRadius="md"
                        onClick={() => console.log("Supprimer:", person.id)}
                      >
                        <LuTrash2 color="white" />
                      </IconButton>
                    </HStack>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>

          {/* Boutons d'action */}
          <HStack justify="space-between" mt={6}>
            <Button
              color="state.red.300"
              variant="outline"
              borderColor="state.red.300"
              _hover={{ bg: "state.red.300", color: "white" }}
              onClick={handleAnnuler}
            >
              Annuler
            </Button>

            <HStack gap={4}>
              <Button
                color="white"
                bg="primary.dogerBlue.300"
                _hover={{ bg: "primary.dogerBlue.400" }}
                leftIcon={<HiPlus />}
                onClick={handleAjouter}
              >
                Ajouter
              </Button>

              <Button
                color="white"
                bg="green.500"
                _hover={{ bg: "green.600" }}
                isDisabled={!selectedPerson}
                onClick={handleSuivant}
              >
                Suivant
              </Button>
            </HStack>
          </HStack>

          {/* Footer */}
          <Box mt={8} textAlign="center" color="gray.500">
            <Text fontSize="sm">CSA 2025 © - By Rawlerie</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default RecherchePersonne;
