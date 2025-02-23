import { Box, Input, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {LuAArrowDown, LuArrowDown, LuCircleChevronLeft, LuSearch} from "react-icons/lu";
import { HiArrowCircleRight, HiArrowCircleDown } from "react-icons/hi";

const Filtre = () => {
    const [activeForm, setActiveForm] = useState("nom"); // "nom" affiché par défaut
    const [isFormVisible, setIsFormVisible] = useState(true); // Formulaire visible par défaut

    const handleButtonClick = (formName) => {
        setActiveForm(formName);
        setIsFormVisible(true); // Réafficher le formulaire si on change de filtre
    };

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filterData = Object.fromEntries(formData);
        console.log(filterData);
    };

    const handleReset = (event) => {
        event.target.reset();
    };

    const inputPlaceholderStyle = {
        _placeholder: { color: "gray.400" },
    };

    return (
        <Box p={4} bg="gray.100" maxW="1200px" boxShadow="md" mb={5} mx="auto">
            <Flex justify="space-between" align="flex-start">
                {/* Boutons à gauche */}
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    {["nom", "siege", "idNational", "idBeneficiaire"].map((item) => (
                        <Box key={item} position="relative" width="160px" m="10px">
                            <Button
                                variant="outline"
                                borderColor="primary.dogerBlue.300"
                                color={activeForm === item ? "white" : "primary.dogerBlue.300"}
                                bg={activeForm === item ? "primary.dogerBlue.300" : "transparent"}
                                _hover={{ bg: "primary.dogerBlue.300", color: "white" }}
                                transition="all 0.3s ease-in-out"
                                w="100%"
                                onClick={() => handleButtonClick(item)}
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                position="relative"
                            >
                                <Box position="absolute" right="-11px" top="50%" transform="translateY(-50%)">
                                    <HiArrowCircleRight size={30} />
                                </Box>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Button>
                        </Box>
                    ))}
                </Box>

                {/* Composant contenant le formulaire à droite */}
                <Box bg="white" width="45%" boxShadow="md" p={4} ml="auto" position="relative">
                    {/* Toggle Visibility */}
                    <IconButton
                        bg="primary.dogerBlue.300"
                        aria-label="Toggle form visibility"
                        onClick={toggleFormVisibility}
                        variant="outline"
                        _hover={{ bg: "gray.200" }}
                        position="absolute"
                        top={-7}
                        right={2}
                        borderRadius = "100%"
                    ><LuArrowDown size={24} color="white"/> </IconButton>

                    {isFormVisible && (
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
                                    <Button type="submit" borderRadius="sm" borderColor="primary.dogerBlue.300" bg="primary.dogerBlue.300" mr={4}>
                                        <Icon bg="white" color="primary.dogerBlue.300" borderRadius="md">
                                            <LuSearch />
                                        </Icon>
                                        Chercher
                                    </Button>
                                    <Button type="reset" borderRadius="md" borderColor="state.red.300" color="state.red.300" variant="outline">
                                        <Icon bg="white" color="State.red.300" borderRadius="md">
                                            <LuCircleChevronLeft />
                                        </Icon>{" "}
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
