"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de la navigation
import {
  Box,
  Button,
  Center,
  Field,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup } from "@/components/ui/input-group";
import { LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import imageLogin from "../assets/logo/image-login.png";

// Import du service d'authentification
import { authService } from "./authService.ts";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // États des champs de saisie
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // États de gestion de l'UI d'authentification
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      // Appel du service isolé
      await authService.login({ email, password });
      
      // Redirection vers le tableau de bord configuré dans main.tsx
      navigate("/dashboard");
    } catch (err: unknown) {
      // Résolution de l'avertissement ESLint no-explicit-any
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // OPTIMISATION RESPONSIVE : Remplacement de height par minHeight pour éviter la coupure du contenu sur petit écran
    <Box minHeight="100vh" width="100vw" bg="white" p={{ base: 3, md: 5 }}>
      <SimpleGrid 
        columns={{ base: 1, md: 2 }} 
        minHeight={{ base: "calc(100vh - 24px)", md: "calc(100vh - 40px)" }}
        width="100%" 
        gap={{ base: 4, md: 6 }}
      >
        
        {/* SECTION GAUCHE : FORMULAIRE DE CONNEXION */}
        <Center 
          bgGradient="to-b" 
          gradientFrom="#eef4fa" 
          gradientTo="#ffffff"
          p={{ base: 4, sm: 6, md: 8 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="#dbe7f4"
          width="100%"
        >
          <Box
            bg="white"
            p={{ base: 6, sm: 8, md: 12 }}
            borderRadius="2xl"
            boxShadow="0px 20px 50px rgba(0, 0, 0, 0.04)"
            width="100%"
            maxWidth="450px"
          >
            <form onSubmit={handleSubmit}>
              <Stack gap={{ base: 6, md: 8 }}>
                <Box>
                  <Heading 
                    fontSize={{ base: "3xl", md: "4xl" }} // Taille de police adaptative
                    color="#003366" 
                    fontWeight="bold" 
                    letterSpacing="tight"
                  >
                    Connexion
                  </Heading>
                  <Text color="gray.400" fontSize="sm" mt={3} fontWeight="medium">
                    Accès sécurisé à vos comptes personnels.
                  </Text>
                </Box>

                {/* Bloc d'affichage élégant de l'erreur */}
                {errorMsg && (
                  <Box
                    p={3}
                    bg="red.50"
                    borderWidth="1px"
                    borderColor="red.200"
                    borderRadius="lg"
                  >
                    <Text color="red.600" fontSize="xs" fontWeight="semibold" textAlign="center">
                      {errorMsg}
                    </Text>
                  </Box>
                )}

                <Stack gap={5}>
                  {/* Champ Email */}
                  <Field.Root>
                    <Field.Label fontSize="sm" fontWeight="semibold" color="gray.500" mb={2}>
                      Email
                    </Field.Label>
                    <InputGroup width="100%" startElement={<Icon color="gray.400" fontSize="md"><LuMail /></Icon>}>
                      <Input
                        type="email"
                        required
                        placeholder="Entrez votre Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        height="48px"
                        borderRadius="lg"
                        borderColor="gray.200"
                        fontSize="sm"
                        _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Champ Mot de passe */}
                  <Field.Root>
                    <Field.Label fontSize="sm" fontWeight="semibold" color="gray.500" mb={2}>
                      Mot de passe
                    </Field.Label>
                    <InputGroup 
                      width="100%" 
                      startElement={<Icon color="gray.400" fontSize="md"><LuLock /></Icon>}
                      endElement={
                        <Icon 
                          color="gray.400" 
                          cursor="pointer" 
                          fontSize="lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <LuEyeOff /> : <LuEye />}
                        </Icon>
                      }
                    >
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Entrez le mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        height="48px"
                        borderRadius="lg"
                        borderColor="gray.200"
                        fontSize="sm"
                        _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                      />
                    </InputGroup>
                  </Field.Root>
                </Stack>

                <Flex 
                  direction={{ base: "column", sm: "row" }} // Aligne verticalement sur micro-écrans si nécessaire
                  gap={3}
                  justify="space-between" 
                  align={{ base: "flex-start", sm: "center" }} 
                  width="100%"
                >
                  <Checkbox 
                    checked={rememberMe} 
                    onCheckedChange={(e) => setRememberMe(!!e.checked)}
                    colorPalette="blue"
                    size="sm"
                  >
                    <Text fontSize="xs" color="gray.600" fontWeight="medium" ml={1}>
                      Se souvenir de moi
                    </Text>
                  </Checkbox>
                  <Text 
                    fontSize="xs" 
                    fontWeight="bold" 
                    color="#1a65cc" 
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Mot de passe oublié ?
                  </Text>
                </Flex>

                <Button
                  type="submit"
                  bg="#1d74db"
                  color="white"
                  height="50px"
                  borderRadius="xl"
                  fontSize="md"
                  fontWeight="bold"
                  loading={isSubmitting}
                  _hover={{ bg: "#155cb1" }}
                  width="100%"
                  mt={2}
                  boxShadow="0px 4px 12px rgba(29, 116, 219, 0.2)"
                >
                  Se connecter
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>

        {/* SECTION DROITE : BIENVENUE & ILLUSTRATION DIRECTE */}
        {/* OPTIMISATION RESPONSIVE : Masqué sur mobile, affiché à partir de l'écran 'md' (tablette/desktop) */}
        <Flex 
          display={{ base: "none", md: "flex" }}
          direction="column" 
          bg="white" 
          p={{ base: 6, md: 10 }} 
          justify="space-between" 
          align="center"
          borderRadius="2xl"
          border="1px solid"
          borderColor="#dbe7f4"
        >
          <Box />

          <VStack gap={8} textAlign="center" width="100%" maxWidth="500px">
            <Box>
              <Heading fontSize="3xl" color="#002b5c" fontWeight="bold" letterSpacing="tight">
                Bienvenue à AfricaBank
              </Heading>
              <Text color="gray.400" fontSize="xs" mt={3} px={4} lineHeight="tall" fontWeight="medium">
                La plateforme qui vous permet de mieux gérer vos clients en toute serenité
              </Text>
            </Box>

            <Box width="100%" maxW="380px" px={2}>
              <Image 
                src={imageLogin}
                alt="AfricaBank Logo and Presentation" 
                objectFit="contain"
                width="100%"
              />
            </Box>
          </VStack>

          <Box textAlign="center">
            <Text fontSize="11px" color="gray.400" fontWeight="medium" letterSpacing="wide">
              <Text as="span" fontWeight="bold" color="#002b5c">Africa Bank</Text> © 2024 Africa Bank. Secure Banking & Healthcare Systems.
            </Text>
          </Box>
        </Flex>

      </SimpleGrid>
    </Box>
  );
};

export default Login;