import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Box,
    Input,
    Button,
    VStack,
    HStack,
    Center,
    Text, Flex,
} from "@chakra-ui/react";
import {InputTextField} from "@/components/customFormFields/InputTextField.tsx";
import {FaCheck} from "react-icons/fa";
import {CgCloseR} from "react-icons/cg";

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
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>
            <Center h="100vh" bg="gray.100">
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="790px">
                    <VStack>
                        <HStack>
                            <Flex gap="48">
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <InputTextField/>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Type de personne</Text>
                                    <InputTextField/>
                                </Box>
                            </Flex>
                        </HStack>
                        <HStack spacing={8}>
                            <Flex gap="48">
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <InputTextField/>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Type de personne</Text>
                                    <InputTextField/>
                                </Box>
                            </Flex>
                        </HStack>
                        <HStack spacing={8}>
                            <Flex gap="48">
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <InputTextField/>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Type de personne</Text>
                                    <InputTextField/>
                                </Box>
                            </Flex>
                        </HStack>
                        <HStack spacing={8}>
                            <Flex gap="48">
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <InputTextField/>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold">Type de personne</Text>
                                    <InputTextField/>
                                </Box>
                            </Flex>
                        </HStack>
                        <HStack spacing={8} justify="center" mt={4}>
                            <Button
                                color="white"
                                bg="primary.dogerBlue.300"
                                _hover={{ bg: "white", color: "primary.dogerBlue.300", borderColor:"primary.dogerBlue.300"}}>
                                <FaCheck />Instruire le dossier
                            </Button>
                            <Button
                                color="state.red.300"
                                variant="outline"
                                borderColor="state.red.300"
                                _hover={{ bg: "state.red.300", color: "white" }}
                                onClick={handleAbandoner}>
                                <CgCloseR /> Abandonner
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
};

export default InitiationDossier;
