import { Box, Text, Button, Input, HStack, VStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecherchePersonne = () => {
    const navigate = useNavigate();
    const [searchFilters, setSearchFilters] = useState({
        nom: "",
        prenom: "",
        dateNaissance: "",
    });
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

    const personnesData = [
        {
            id: "1",
            matricule: "12345",
            nom: "Koffi",
            prenom: "Kousaïo",
            profession: "Architecture",
            dateNaissance: "13/05/1990",
            nationalite: "Notiforme",
            paysResidence: "Côt d'invite"
        },
        {
            id: "2",
            matricule: "87954",
            nom: "Gattia",
            prenom: "Alastata",
            profession: "Enseignant",
            dateNaissance: "12/06/1996",
            nationalite: "Notiforme",
            paysResidence: "Côt d'invite"
        },
        {
            id: "3",
            matricule: "98768",
            nom: "K'Ouessan",
            prenom: "Noussa",
            profession: "Ingelateur",
            dateNaissance: "1/09/1975",
            nationalite: "Notiforme",
            paysResidence: "Côt d'invite"
        },
        {
            id: "4",
            matricule: "01990",
            nom: "Tracré",
            prenom: "Kousaïo",
            profession: "Médecin",
            dateNaissance: "2/10/1979",
            nationalite: "Notiforme plateau",
            paysResidence: "Côt d'invite"
        }
    ];

    const filteredData = personnesData.filter(personne =>
        (!searchFilters.nom || personne.nom.toLowerCase().includes(searchFilters.nom.toLowerCase())) &&
        (!searchFilters.prenom || personne.prenom.toLowerCase().includes(searchFilters.prenom.toLowerCase())) &&
        (!searchFilters.dateNaissance || personne.dateNaissance.includes(searchFilters.dateNaissance))
    );

    const handleFilterChange = (field: string, value: string) => {
        setSearchFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleResetFilters = () => {
        setSearchFilters({
            nom: "",
            prenom: "",
            dateNaissance: "",
        });
        setSelectedPerson(null);
    };

    const handlePersonSelection = (personneId: string) => {
        // Sélectionne la nouvelle personne, désélectionne la précédente
        setSelectedPerson(prev => prev === personneId ? null : personneId);
    };

    const handleAnnuler = () => {
        navigate(-1);
    };

    const handleSuivant = () => {
        if (selectedPerson) {
            const selectedPersonne = personnesData.find(personne => personne.id === selectedPerson);
            console.log("Personne sélectionnée:", selectedPersonne);
            navigate("/ajout-titulaire", { state: { personne: selectedPersonne } });
        }
    };

    return (
        <Box>
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">RECHERCHE DE PERSONNES</Text>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.100" px={4}>
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="1400px">
                    {/* Section Identifiant */}
                    <VStack gap={6} align="stretch" mb={8}>
                        <Text fontSize="lg" fontWeight="bold" color="blue.500">
                            Recherchez la personne !
                        </Text>

                        <HStack gap={4}>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Nom</Text>
                                <Input
                                    placeholder="Nom"
                                    value={searchFilters.nom}
                                    onChange={(e) => handleFilterChange("nom", e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Prénom</Text>
                                <Input
                                    placeholder="Prénom"
                                    value={searchFilters.prenom}
                                    onChange={(e) => handleFilterChange("prenom", e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Date de naissance</Text>
                                <Input
                                    type="date"
                                    placeholder="Date de naissance"
                                    value={searchFilters.dateNaissance}
                                    onChange={(e) => handleFilterChange("dateNaissance", e.target.value)}
                                />
                            </Box>
                        </HStack>

                        {/* Boutons */}
                        <HStack justify="flex-end" gap={4}>
                            <Button
                                color="red.500"
                                variant="outline"
                                borderColor="red.500"
                                _hover={{ bg: "red.500", color: "white" }}
                                onClick={handleResetFilters}
                            >
                                Réinitialiser
                            </Button>
                            <Button
                                color="white"
                                bg="blue.500"
                                _hover={{ bg: "blue.600" }}
                                onClick={() => console.log("Recherche appliquée")}
                            >
                                Appliquer
                            </Button>
                        </HStack>
                    </VStack>

                    {/* Tableau avec checkbox simplifié */}
                    <Box border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" mb={6}>
                        {/* En-tête */}
                        <Flex
                            bg="blue.500"
                            height="40px"
                            align="center"
                            px={4}
                            color="white"
                            fontWeight="bold"
                        >
                            <Box width="50px">-</Box>
                            <Box flex={1}>Matricule</Box>
                            <Box flex={1}>Nom</Box>
                            <Box flex={1}>Prénom</Box>
                            <Box flex={1}>Profession</Box>
                            <Box flex={1}>Date de naissance</Box>
                            <Box flex={1}>Nationalité</Box>
                            <Box flex={1}>Pays de résidence</Box>
                        </Flex>

                        {/* Corps */}
                        <Box maxH="400px" overflowY="auto">
                            {filteredData.map((personne) => (
                                <Flex
                                    key={personne.id}
                                    align="center"
                                    px={4}
                                    py={3}
                                    borderBottom="1px"
                                    borderColor="gray.100"
                                    bg={selectedPerson === personne.id ? "blue.50" : "white"}
                                    _hover={{ bg: "gray.50" }}
                                    onClick={() => handlePersonSelection(personne.id)}
                                    cursor="pointer"
                                >
                                    {/* Checkbox visuel simple */}
                                    <Box
                                        width="50px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box
                                            width="20px"
                                            height="20px"
                                            border="2px solid"
                                            borderColor={selectedPerson === personne.id ? "blue.500" : "gray.400"}
                                            borderRadius="4px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bg={selectedPerson === personne.id ? "blue.500" : "white"}
                                        >
                                            {selectedPerson === personne.id && (
                                                <Box
                                                    width="12px"
                                                    height="12px"
                                                    bg="white"
                                                    borderRadius="2px"
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                    <Box flex={1}>{personne.matricule}</Box>
                                    <Box flex={1}>{personne.nom}</Box>
                                    <Box flex={1}>{personne.prenom}</Box>
                                    <Box flex={1}>{personne.profession}</Box>
                                    <Box flex={1}>{personne.dateNaissance}</Box>
                                    <Box flex={1}>{personne.nationalite}</Box>
                                    <Box flex={1}>{personne.paysResidence}</Box>
                                </Flex>
                            ))}
                        </Box>
                    </Box>

                    {/* Boutons Annuler et Suivant */}
                    <Flex justifyContent="space-between" mt={8}>
                        <Button
                            color="red.500"
                            variant="outline"
                            borderColor="red.500"
                            _hover={{ bg: "red.500", color: "white" }}
                            onClick={handleAnnuler}
                        >
                            Annuler
                        </Button>

                        <Button
                            color="white"
                            bg="blue.500"
                            _hover={{ bg: "blue.200" }}
                            isDisabled={!selectedPerson}
                            onClick={handleSuivant}
                        >
                            Suivant
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default RecherchePersonne;
