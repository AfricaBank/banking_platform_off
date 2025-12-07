import {
    Box,
    Button,
    Text,
    Flex,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { FaCheck } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { col2 } from "@/dataObject/ListCollection.ts";
import { ErrorMessage } from "@hookform/error-message";

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

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dateCreation: currentDate,
            typePersonne: "",
            codeSiege: "",
            natureRelation: "",
            codeExploitant: "",
            nomCollectivite: "",
            nomExploitant: "",
            civiliteCollectivite: ""
        }
    });
    const onSubmit = () => {
        navigate("/recherche");
    };
    // const onSubmit = (data: any) => {
    //     console.log("Données du formulaire:", data);
    //     // Redirection vers la recherche de personne
    //     navigate("/recherche");
    // };

    return (
        <Box>
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex" alignItems="center" pl="20px" borderRadius="md">
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>
            <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
                <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" w="full" maxW="800px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={8} align="stretch">
                            {/* Première ligne - deux colonnes */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <Controller
                                        name="dateCreation"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomDatePicker
                                                nomDuChamp=""
                                                value={currentDate}
                                                onChange={field.onChange}
                                                isDisabled={true}
                                            />
                                        )}
                                    />
                                </VStack>
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Type de personne *</Text>
                                    <Controller
                                        name="typePersonne"
                                        control={control}
                                        rules={{ required: "Le type de personne est obligatoire" }}
                                        render={({ field }) => (
                                            <DropDownList
                                                label=""
                                                collection={col2}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="typePersonne"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Deuxième ligne - deux colonnes */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Code siège *</Text>
                                    <Controller
                                        name="codeSiege"
                                        control={control}
                                        rules={{ required: "Le code siège est obligatoire" }}
                                        render={({ field }) => (
                                            <DropDownList
                                                label=""
                                                collection={col2}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="codeSiege"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Nature de la relation *</Text>
                                    <Controller
                                        name="natureRelation"
                                        control={control}
                                        rules={{ required: "La nature de la relation est obligatoire" }}
                                        render={({ field }) => (
                                            <DropDownList
                                                label=""
                                                collection={col2}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="natureRelation"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Troisième ligne - deux colonnes */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Code exploitant *</Text>
                                    <Controller
                                        name="codeExploitant"
                                        control={control}
                                        rules={{ required: "Le code exploitant est obligatoire" }}
                                        render={({ field }) => (
                                            <InputTextField
                                                label=""
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="codeExploitant"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Nom de la collectivité *</Text>
                                    <Controller
                                        name="nomCollectivite"
                                        control={control}
                                        rules={{ required: "Le nom de la collectivité est obligatoire" }}
                                        render={({ field }) => (
                                            <InputTextField
                                                label=""
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="nomCollectivite"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Quatrième ligne - deux colonnes */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Nom de l'exploitant *</Text>
                                    <Controller
                                        name="nomExploitant"
                                        control={control}
                                        rules={{ required: "Le nom de l'exploitant est obligatoire" }}
                                        render={({ field }) => (
                                            <InputTextField
                                                label=""
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="nomExploitant"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Civilité de la collectivité *</Text>
                                    <Controller
                                        name="civiliteCollectivite"
                                        control={control}
                                        rules={{ required: "La civilité de la collectivité est obligatoire" }}
                                        render={({ field }) => (
                                            <DropDownList
                                                label=""
                                                collection={col2}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="civiliteCollectivite"
                                        render={({ message }) => (
                                            <Text color="red.500" fontSize="sm">
                                                {message}
                                            </Text>
                                        )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Boutons */}
                            <HStack justify="center" gap={4} mt={4}>
                                <Button
                                    type="submit"
                                    color="white"
                                    bg="primary.dogerBlue.300"
                                    _hover={{ bg: "white", color: "primary.dogerBlue.300", borderColor: "primary.dogerBlue.300" }}>
                                    <FaCheck /> Instruire le dossier
                                </Button>
                                <Button
                                    type="button"
                                    color="state.red.300"
                                    variant="outline"
                                    borderColor="state.red.300"
                                    _hover={{ bg: "state.red.300", color: "white" }}
                                    onClick={handleAbandoner}>
                                    <CgCloseR /> Abandonner
                                </Button>
                            </HStack>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </Box>
    );
};

export default InitiationDossier;
