import {
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus, HiSearch } from "react-icons/hi";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

const RecherchePersonne = () => {
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
            type: "CXI d'huile"
        },
        {
            id: "97564",
            matricule: "97564",
            nom: "Oistila",
            prenom: "Alissala",
            profession: "Enseignant",
            dateNaissance: "12/06/1996",
            statut: "Notiforme",
            type: "CXI d'huile"
        },
        {
            id: "98768",
            matricule: "98768",
            nom: "K'Ouessan",
            prenom: "Monasa",
            profession: "Ingénieur",
            dateNaissance: "1/09/1975",
            statut: "Notiforme",
            type: "CXI d'huile"
        },
        {
            id: "01990",
            matricule: "01990",
            nom: "Taseré",
            prenom: "Kouadio",
            profession: "Médecin",
            dateNaissance: "2/10/1979",
            statut: "Notiforme plateau",
            type: "CXI d'huile"
        }
    ];

    // Filtrer les données basées sur la recherche
    const filteredData = searchData.filter(person =>
        person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.matricule.includes(searchTerm) ||
        person.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelection = (personId: string) => {
        setSelectedPerson(personId === selectedPerson ? null : personId);
    };

    const handleSuivant = () => {
        if (selectedPerson) {
            const person = searchData.find(p => p.id === selectedPerson);
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
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">RECHERCHE DE PERSONNE</Text>
            </Box>

            <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="1400px">
                    {/* Formulaire de recherche */}
                    <VStack gap={6} align="stretch" mb={6}>
                        <Text fontSize="lg" fontWeight="bold" color="primary.dogerBlue.300">
                            Identifiant
                        </Text>

                        <HStack gap={4}>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Nom</Text>
                                <Input
                                    placeholder="Nom"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Prénom</Text>
                                <Input
                                    placeholder="Prénom"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Date de naissance</Text>
                                <Input
                                    type="date"
                                    placeholder="Date de naissance"
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Identifiant</Text>
                                <Input
                                    placeholder="Identifiant"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                        </HStack>

                        <HStack gap={4}>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Nom</Text>
                                <Input
                                    placeholder="Nom"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Prénom</Text>
                                <Input
                                    placeholder="Prénom"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="bold" mb={2}>Date de naissance</Text>
                                <Input
                                    type="date"
                                    placeholder="Date de naissance"
                                />
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
                    <Box border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" mb={6}>
                        {/* En-tête du tableau */}
                        <Flex
                            bg="primary.dogerBlue.300"
                            height="40px"
                            align="center"
                            px={4}
                            borderTopLeftRadius="md"
                            borderTopRightRadius="md"
                        >
                            <Text width="50px" color="white" fontWeight="bold">Sélection</Text>
                            <Text flex={1} color="white" fontWeight="bold">Matricule</Text>
                            <Text flex={1} color="white" fontWeight="bold">Nom</Text>
                            <Text flex={1} color="white" fontWeight="bold">Prénom</Text>
                            <Text flex={1} color="white" fontWeight="bold">Profession</Text>
                            <Text flex={1} color="white" fontWeight="bold">Date de naissance</Text>
                            <Text flex={1} color="white" fontWeight="bold">Statut</Text>
                            <Text flex={1} color="white" fontWeight="bold">Type</Text>
                            <Text width="120px" color="white" fontWeight="bold">Actions</Text>
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
                                                size='sm'
                                                onClick={() => console.log("Voir:", person.id)}
                                                borderRadius="md"
                                            >
                                                <LuEye color="white"/>
                                            </IconButton>
                                            <IconButton
                                                aria-label="Modifier"
                                                size='sm'
                                                bg="orange.400"
                                                onClick={() => console.log("Modifier:", person.id)}
                                                borderRadius="md"
                                            >
                                                <LuPencil color="white" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Supprimer"
                                                bg="red.500"
                                                size='sm'
                                                borderRadius="md"
                                                onClick={() => console.log("Supprimer:", person.id)}
                                            >
                                                <LuTrash2 color="white"/>
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
