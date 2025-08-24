import {
    Box,
    Button,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { FaCheck } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import {Lists} from "@/components/constants/Lists.tsx";

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
    const customList = [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
    ];

    return (
        <Box>
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>
            <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="800px">
                    <Flex justify="center" gap={10} mt={10} wrap="wrap">
                        <CustomDatePicker nomDuChamp="Date de création" />
                        <DropDownList label={" Type de personne"} collection={Lists.categorieClient} />
                    </Flex>
                    <Flex justify="center" gap={10} mt={10} wrap="wrap">
                        <DropDownList label={" Code siège"} collection={Lists.categorieClient} />
                        <DropDownList label={"Nature de la relation"} collection={Lists.categorieClient}  />
                    </Flex>

                    <Flex justify="center" gap={10} mt={10} wrap="wrap">
                        <InputTextField label={"Code exploitant"} />
                        <InputTextField label={"Nom de la collectivité"} />
                    </Flex>
                    <Flex justify="center" gap={10} mt={10} wrap="wrap">
                        <InputTextField label={"Nom de l'exploitant"} />
                        <DropDownList label={"Civilité de la collectivité"} collection={Lists.categorieClient} />
                    </Flex>
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
                </Box>
            </Flex>
        </Box>
    );
};

export default InitiationDossier;