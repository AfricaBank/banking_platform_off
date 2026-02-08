"use client";
import { Box, Input, Button, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuArrowDown, LuCircleChevronLeft, LuSearch } from "react-icons/lu";
import { HiArrowCircleRight } from "react-icons/hi";

// Définition des types possibles pour les formulaires
type FormType = "nom" | "siege" | "idNational" | "idBeneficiaire";

const Filtre = () => {
  const [activeForm, setActiveForm] = useState<FormType>("nom");
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Typage du nom du formulaire
  const handleButtonClick = (formName: FormType) => {
    setActiveForm(formName);
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  // Typage de l'événement de soumission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const filterData = Object.fromEntries(formData);
    console.log(filterData);
  };

  // Typage de l'événement de réinitialisation
  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    // La méthode reset() est disponible sur l'élément form directement
    event.currentTarget.reset();
  };

  // Définition du style du placeholder (réutilisable via un objet de props)
  const inputStyles = {
    _placeholder: { color: "gray.400" },
  };

  return (
    <Box p={4} bg="gray.100" maxW="1200px" boxShadow="md" mb={5} mx="auto">
      <Flex justify="space-between" align="flex-start">
        {/* Boutons à gauche */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {(["nom", "siege", "idNational", "idBeneficiaire"] as FormType[]).map(
            (item) => (
              <Box key={item} position="relative" width="160px" m="10px">
                <Button
                  variant="outline"
                  borderColor="primary.dogerBlue.300"
                  color={
                    activeForm === item ? "white" : "primary.dogerBlue.300"
                  }
                  bg={
                    activeForm === item
                      ? "primary.dogerBlue.300"
                      : "transparent"
                  }
                  _hover={{ bg: "primary.dogerBlue.300", color: "white" }}
                  transition="all 0.3s ease-in-out"
                  w="100%"
                  onClick={() => handleButtonClick(item)}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Box
                    position="absolute"
                    right="-11px"
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <HiArrowCircleRight size={30} />
                  </Box>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              </Box>
            ),
          )}
        </Box>

        {/* Composant contenant le formulaire à droite */}
        <Box
          bg="white"
          width="45%"
          boxShadow="md"
          p={4}
          ml="auto"
          position="relative"
        >
          <IconButton
            bg="primary.dogerBlue.300"
            aria-label="Toggle form visibility"
            onClick={toggleFormVisibility}
            variant="outline"
            _hover={{ bg: "gray.200" }}
            position="absolute"
            top="-28px" // Remplacement du top={-7} par une valeur string pour la précision
            right="8px"
            borderRadius="full"
          >
            <LuArrowDown size={24} color="white" />
          </IconButton>

          {isFormVisible && (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <Box mb={4}>
                {activeForm === "nom" && (
                  <>
                    <Flex mb={4} gap={2}>
                      <Input
                        name="civilite"
                        placeholder="Civilité"
                        {...inputStyles}
                      />
                      <Input
                        name="prenom"
                        placeholder="Prénom"
                        {...inputStyles}
                      />
                    </Flex>
                    <Flex mb={4} gap={2}>
                      <Input name="nom" placeholder="Nom" {...inputStyles} />
                      <Input
                        type="date"
                        name="dateNaissance"
                        {...inputStyles}
                      />
                    </Flex>
                  </>
                )}

                {activeForm === "siege" && (
                  <Flex mb={4} gap={2}>
                    <Input name="siege" placeholder="Siège" {...inputStyles} />
                    <Input
                      name="racine"
                      placeholder="Racine"
                      {...inputStyles}
                    />
                  </Flex>
                )}

                {activeForm === "idNational" && (
                  <Input
                    name="idNational"
                    placeholder="Id National"
                    {...inputStyles}
                    mb={4}
                  />
                )}

                {activeForm === "idBeneficiaire" && (
                  <Input
                    name="idBeneficiaire"
                    placeholder="Id Bénéficiaire"
                    {...inputStyles}
                    mb={4}
                  />
                )}

                <Flex justify="flex-end" mt={4} gap={4}>
                  <Button
                    type="submit"
                    bg="primary.dogerBlue.300"
                    color="white"
                  >
                    <LuSearch /> Chercher
                  </Button>
                  <Button type="reset" variant="outline" colorPalette="red">
                    <LuCircleChevronLeft /> Réinitialiser
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
