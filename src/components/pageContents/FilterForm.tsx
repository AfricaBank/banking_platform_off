"use client";
import { Box, Input, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuArrowDown, LuCircleChevronLeft, LuSearch } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { SimpleButton } from "../customButtons/SimpleButton.tsx";

type FormType = "nom" | "siege" | "idNational" | "idBeneficiaire";

const Filtre = () => {
  const [activeForm, setActiveForm] = useState<FormType>("nom");
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleButtonClick = (formName: FormType) => {
    setActiveForm(formName);
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.currentTarget.reset();
  };

  const inputStyles = {
    _placeholder: { color: "darkGrey.200" },
    focusBorderColor: "dogerBlue.400",
    borderColor: "lightGrey.300",
  };

  return (
    <Box
      p={6}
      bg="lightGrey.50"
      width="100%" // S'adapte au parent
      borderRadius="lg"
      boxShadow="sm"
      mb={5}
    >
      <Flex justify="space-between" align="stretch">
        {/* Panneau de sélection des filtres (Largeur fixe de 200px) */}
        <Box display="flex" flexDirection="column" gap={3} m="40px">
          {(["nom", "siege", "idNational", "idBeneficiaire"] as FormType[]).map(
            (item) => {
              const isActive = activeForm === item;
              return (
                <Box key={item} position="relative" width="200px">
                  <SimpleButton
                    variant="outline"
                    borderColor="dogerBlue.300"
                    color={isActive ? "white" : "dogerBlue.400"}
                    bg={isActive ? "dogerBlue.400" : "transparent"}
                    _hover={{ bg: "dogerBlue.500", color: "white" }}
                    transition="all 0.2s ease"
                    w="100%"
                    height="45px"
                    onClick={() => handleButtonClick(item)}
                    justifyContent="flex-start"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {item === "idNational"
                        ? "ID National"
                        : item === "idBeneficiaire"
                          ? "ID Bénéficiaire"
                          : item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>

                    <IconButton
                      position="absolute"
                      right="-15px"
                      top="50%"
                      transform="translateY(-50%)"
                      bg={isActive ? "white" : "dogerBlue.400"}
                      color={isActive ? "dogerBlue.400" : "white"}
                      transition="color 0.2s"
                      borderRadius="100%"
                      w="42px"
                      h="42px"
                      zIndex={2}
                    >
                      <FaArrowRight size={20} />
                    </IconButton>
                  </SimpleButton>
                </Box>
              );
            },
          )}
        </Box>

        {/* Zone du Formulaire (Prend tout l'espace restant) */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={6}
          position="relative"
          border="1px solid"
          borderColor="lightGrey.100"
          m="40px"
          w="60%"
        >
          <IconButton
            bg="sidebar.itemActive"
            aria-label="Toggle form"
            onClick={toggleFormVisibility}
            _hover={{ bg: "dogerBlue.600" }}
            position="absolute"
            top="-20px"
            right="20px"
            borderRadius="full"
            boxShadow="lg"
            zIndex={3}
          >
            <LuArrowDown size={20} color="white" />
          </IconButton>

          {isFormVisible && (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <Box>
                {activeForm === "nom" && (
                  <>
                    <Flex mb={4} gap={4}>
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
                    <Flex mb={4} gap={4}>
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
                  <Flex mb={4} gap={4}>
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
                    placeholder="Identifiant National"
                    {...inputStyles}
                    mb={4}
                  />
                )}

                {activeForm === "idBeneficiaire" && (
                  <Input
                    name="idBeneficiaire"
                    placeholder="Identifiant Bénéficiaire"
                    {...inputStyles}
                    mb={4}
                  />
                )}

                <Flex justify="flex-end" mt={6} gap={4}>
                  <SimpleButton
                    type="submit"
                    bg="sidebar.itemActive"
                    color="white"
                    px={8}
                    _hover={{ bg: "dogerBlue.600" }}
                  >
                    <LuSearch />
                    <Text as="span" ml="2">
                      Chercher
                    </Text>
                  </SimpleButton>
                  <SimpleButton
                    type="reset"
                    variant="outline"
                    color="errorRed.400"
                    _hover={{ bg: "errorRed.50" }}
                    borderColor="errorRed.400"
                  >
                    <LuCircleChevronLeft />
                    <Text as="span" ml="2">
                      Réinitialiser
                    </Text>
                  </SimpleButton>
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
