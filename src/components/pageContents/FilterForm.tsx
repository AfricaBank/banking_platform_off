import { Box, Input, Button, Flex, IconButton, useStyleConfig } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const Filtre = () => {
    const [activeForm, setActiveForm] = useState(null);

    const handleButtonClick = (formName) => {
        setActiveForm(formName);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filterData = Object.fromEntries(formData);
        console.log(filterData); // Traiter les données ici
    };

    const handleReset = (event) => {
        event.target.reset();
    };

    const inputPlaceholderStyle = {
        _placeholder: { color: "gray.400" },
    };

    const buttonStyle = (formName) => ({
        bg: activeForm === formName ? "blue.500" : "transparent",
        color: activeForm === formName ? "white" : "blue.500",
        _hover: { bg: "primary.dogerBlue.300", color: "white" },
        border: "1px solid",
        borderColor: "blue.500",
        position: "relative",
        w: "160px",
        m: "10px",
    });

    return (
        <Box p={4} bg="gray.100" maxW="1200px" boxShadow="md" mb={5} mx="auto">
            <Flex justify="center">
                <Box display="flex" flexDirection="column" mr={5} ml={10}>
                    {["nom", "siege", "idNational", "idBeneficiaire"].map((item) => (
                        <Button key={item} sx={buttonStyle(item)} onClick={() => handleButtonClick(item)}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Button>
                    ))}
                </Box>
                <Box bg="white" width="45%" boxShadow="md" p={4}>
                    {activeForm && (
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <Box mb={4}>
                                {activeForm === "nom" && (
                                    <>
                                        <Flex mb={4}>
                                            <Input name="civilite" placeholder="Civilité" sx={inputPlaceholderStyle} mr={2} />
                                            <Input name="prenom" placeholder="Prénom" sx={inputPlaceholderStyle} />
                                        </Flex>
                                        <Flex mb={4}>
                                            <Input name="nom" placeholder="Nom" sx={inputPlaceholderStyle} mr={2} />
                                            <Input type="date" name="dateNaissance" placeholder="JJ/MM/AA" sx={inputPlaceholderStyle} />
                                        </Flex>
                                    </>
                                )}
                                {activeForm === "siege" && (
                                    <Flex mb={4}>
                                        <Input name="siege" placeholder="Siège" sx={inputPlaceholderStyle} mr={2} />
                                        <Input name="racine" placeholder="Racine" sx={inputPlaceholderStyle} />
                                    </Flex>
                                )}
                                {activeForm === "idNational" && (
                                    <Input name="idNational" placeholder="Id National" sx={inputPlaceholderStyle} mb={4} />
                                )}
                                {activeForm === "idBeneficiaire" && (
                                    <Input name="idBeneficiaire" placeholder="Id Bénéficiaire" sx={inputPlaceholderStyle} mb={4} />
                                )}
                                <Flex justify="flex-end" mt={4}>
                                    <Button type="submit" colorScheme="blue" mr={4} leftIcon={<LuSearch />}>
                                        Chercher
                                    </Button>
                                    <Button type="reset" colorScheme="red" variant="outline">
                                        Réinitialiser
                                    </Button>
                                </Flex>
                            </Box>
                        </form>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Filtre;
