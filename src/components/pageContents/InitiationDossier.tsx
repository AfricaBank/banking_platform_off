import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Box,
    Input,
    Select,
    Button,
    VStack,
    HStack,
    Center,
    Text,
} from "@chakra-ui/react";

const InitiationDossier = () => {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const dateString = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
        setCurrentDate(dateString);
    }, []);

    const navigate = useNavigate();
    const handleAbandoner = () => {
        navigate("/dossiers-gestion");
    };

    return (
        <Box>
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px">
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>
            <Center h="100vh" bg="gray.100">
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="800px">
                    <VStack spacing={4} align="stretch">
                        <HStack spacing={4}>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                <Input type="date" value={currentDate} isReadOnly bg="gray.100" />
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Type de personne</Text>
                                <Select>
                                    <option value="PP">Personne Physique</option>
                                    <option value="PM">Personne Morale</option>
                                </Select>
                            </Box>
                        </HStack>

                        <HStack spacing={4}>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Code Siège</Text>
                                <Select>
                                    <option value="code1">Code 1</option>
                                    <option value="code2">Code 2</option>
                                    <option value="code3">Code 3</option>
                                </Select>
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Nature de la relation</Text>
                                <Input type="text" placeholder="Nature de la relation" />
                            </Box>
                        </HStack>

                        <HStack spacing={4}>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Code exploitant</Text>
                                <Select>
                                    <option value="type1">Code ex 1</option>
                                    <option value="type2">Code ex 2</option>
                                    <option value="type3">Code ex 3</option>
                                </Select>
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Nom de la collectivité</Text>
                                <Input type="text" placeholder="Nom de la collectivité" />
                            </Box>
                        </HStack>

                        <HStack spacing={4}>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Nom de l'exploitant</Text>
                                <Input type="text" placeholder="Issaga Gaye" bg="primary.dogerBlue.300" />
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold">Civilité de la collectivité</Text>
                                <Select>
                                    <option value="mr">Monsieur</option>
                                    <option value="mme">Madame</option>
                                    <option value="mlle">Mademoiselle</option>
                                </Select>
                            </Box>
                        </HStack>

                        <HStack spacing={8} justify="center" mt={4}>
                            <Button bg="primary.dogerBlue.500" color="white">Instruire le dossier</Button>
                            <Button colorScheme="red" variant="outline" onClick={handleAbandoner}>
                                Abandonner
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
};

export default InitiationDossier;
