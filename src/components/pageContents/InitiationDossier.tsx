import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Flex,
    Center,
    SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { FaCheck } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";

const InitiationDossier = () => {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const dateString = today.toISOString().split("T")[0];
        setCurrentDate(dateString);
    }, []);

    const navigate = useNavigate();
    const handleAbandoner = () => {
        navigate("/dossiers-gestion");
    };

    const FieldContainer = ({ label, children }: { label: string, children: React.ReactNode }) => (
        <Box>
            <Text fontSize="sm" fontWeight="bold" mb={1}>{label}</Text>
            {children}
        </Box>
    );

    return (
        <Box>
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>
            <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="800px" paddingLeft="100px">
                    <VStack spacing={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={8} spacingY={4} w="100%">
                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Date de création</Text>
                                <CustomDatePicker value={currentDate} />
                            </Box>
                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Type de personne</Text>
                                <DropDownList collection={undefined} label={""} />
                            </Box>

                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Code siège</Text>
                                <DropDownList collection={undefined} label={""} />
                            </Box>
                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Nature de la relation</Text>
                                <DropDownList collection={undefined} label={""} />
                            </Box>

                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Code exploitant</Text>
                                <InputTextField label={""} />
                            </Box>
                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Nom de la collectivité</Text>
                                <InputTextField label={""} />
                            </Box>

                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Nom de l'exploitant</Text>
                                <InputTextField label={""} />
                            </Box>
                            <Box w="200%">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>Civilité de la collectivité</Text>
                                <DropDownList collection={undefined} label={""} />
                            </Box>
                        </SimpleGrid>

                        <Flex justify="center" gap={4} mt={4} wrap="wrap">
                            <Button
                                color="white"
                                bg="primary.dogerBlue.300"
                                _hover={{ bg: "white", color: "primary.dogerBlue.300", borderColor: "primary.dogerBlue.300" }}>
                                <FaCheck /> Instruire le dossier
                            </Button>
                            <Button
                                color="state.red.300"
                                variant="outline"
                                borderColor="state.red.300"
                                _hover={{ bg: "state.red.300", color: "white" }}
                                onClick={handleAbandoner}>
                                <CgCloseR /> Abandonner
                            </Button>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default InitiationDossier;