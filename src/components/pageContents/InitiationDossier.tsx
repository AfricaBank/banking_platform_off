
// src/pages/InitiationDossier.tsx

import {
    Box,
    Button,
    Text,
    Flex,
    HStack,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import { Box, Button, Text, Flex, HStack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { FaCheck } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import {
    codeSiege,
    typePersonne,
    natureRelationPP,
    civilite,
    codeExploitant as codeExploitantCollection,
} from "@/dataObject/ListCollection.ts";
import { ErrorMessage } from "@hookform/error-message";
import { initierDossier } from "@/api/dossierApi";
import { useDossier } from "@/context/DossierContext";
import type { InitiationDossierRequest } from "@/types/dossier.types";

// ─── Map lookup codeExploitant → nomExploitant ────────────────────────────────

const exploitantNomMap: Record<string, string> = {
    EXP01: "BNP Paribas — Direction Régionale Est",
    EXP02: "BNP Paribas — Direction Régionale Ouest",
};

const COLLECTIVITE_VALUES = ["COLLECTIVITE", "COMPTE_JOINT_EPOUX", "AUTRES_COMPTS_JOINTS"];
const ENTITE_JURIDIQUE_VALUE = "ENTITE_JURIDIQUE";

type InitiationFormValues = {
    dateCreation: string;
    typePersonne: string;
    codeSiege: string;
    codeExploitant: string;
    nomExploitant: string;
    natureRelation: string;
    nomCollectivite: string;
    civiliteCollectivite: string;
};

const InitiationDossier = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { setDossier } = useDossier();

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today.toISOString().split("T")[0]);
    }, []);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<InitiationFormValues>({
        defaultValues: {
            dateCreation: "",
            typePersonne: "",
            codeSiege: "",
            codeExploitant: "",
            nomExploitant: "",
            natureRelation: "",
            nomCollectivite: "",
            civiliteCollectivite: "",
        },
    });

    useEffect(() => {
        if (currentDate) setValue("dateCreation", currentDate);
    }, [currentDate, setValue]);

    useEffect(() => {
        if (codeExploitantCollection.items.length === 1) {
            const single = codeExploitantCollection.items[0];
            setValue("codeExploitant", single.value);
            setValue("nomExploitant", exploitantNomMap[single.value] ?? "");
        }
    }, [setValue]);

    const watchedTypePersonne   = useWatch({ control, name: "typePersonne" });
    const watchedNatureRelation = useWatch({ control, name: "natureRelation" });

    const isPersonnePhysique = watchedTypePersonne === "Personne physique";
    const isPersonneMorale   = watchedTypePersonne === "Personne morale";
    const hasTypePersonne    = isPersonnePhysique || isPersonneMorale;
    const isCollectivite     = isPersonnePhysique
        && COLLECTIVITE_VALUES.includes(watchedNatureRelation);

    const handleTypePersonneChange = (value: string) => {
        setValue("natureRelation",
            value === "Personne morale" ? ENTITE_JURIDIQUE_VALUE : "");
        setValue("nomCollectivite", "");
        setValue("civiliteCollectivite", "");
    };

    const handleNatureRelationChange = (value: string) => {
        if (!COLLECTIVITE_VALUES.includes(value)) {
            setValue("nomCollectivite", "");
            setValue("civiliteCollectivite", "");
        }
    };

    const handleCodeExploitantChange = (value: string) => {
        setValue("nomExploitant", exploitantNomMap[value] ?? "");
    };

    // ── Soumission avec appel API ─────────────────────────────────────────────

    const onSubmit = async (data: InitiationFormValues) => {
        setIsSubmitting(true);
        setApiError(null);

        const payload: InitiationDossierRequest = {
            createur: "COMMERCIAL",
            typePersonne: data.typePersonne,
            codeSiege: data.codeSiege,
            natureRelation: data.natureRelation,
            codeExploitant: data.codeExploitant,
            nomExploitant: data.nomExploitant || undefined,
            ...(isCollectivite && {
                nomCollectivite: data.nomCollectivite,
                civiliteCollectivite: data.civiliteCollectivite,
            }),
        };

        try {
            const dossier = await initierDossier(payload);

            // Stocker dans le Context pour les étapes suivantes
            setDossier(dossier);

            // Rediriger vers la recherche de personne avec l'ID du dossier
            navigate("/recherchePersonne", {
                state: {
                    dossierId: dossier.id,
                    referenceDossier: dossier.referenceDossier,
                    typePersonne: dossier.typePersonne,
                    natureRelation: dossier.natureRelation,
                },
            });
        } catch (err: any) {
            setApiError(
                err.response?.data?.message
                ?? "Une erreur est survenue lors de l'initialisation du dossier."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            <Box
                h="50px"
                bg="#C9E1F8"
                mt="10px"
                display="flex"
                alignItems="center"
                pl="20px"
                borderRadius="md"
            >
                <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
            </Box>

            <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
                <Box
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    bg="white"
                    boxShadow="lg"
                    w="full"
                    maxW="800px"
                >
                    {/* Message d'erreur API */}
                    {apiError && (
                        <Box
                            mb={4}
                            p={3}
                            bg="red.50"
                            border="1px solid"
                            borderColor="red.300"
                            borderRadius="md"
                        >
                            <Text color="red.600" fontSize="sm">{apiError}</Text>
                        </Box>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={8} align="stretch">

                            {/* Ligne 1 : Date | Type de personne */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Date de création</Text>
                                    <Controller
                                        name="dateCreation"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomDatePicker
                                                nomDuChamp=""
                                                value={field.value || currentDate}
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
                                                collection={typePersonne}
                                                value={field.value}
                                                onValueChange={(val) => {
                                                    field.onChange(val);
                                                    handleTypePersonneChange(val);
                                                }}
                                            />
                                        )}
                                    />
                                    <ErrorMessage errors={errors} name="typePersonne"
                                                  render={({ message }) => (
                                                      <Text color="red.500" fontSize="sm">{message}</Text>
                                                  )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Ligne 2 : Code siège | Nature de la relation */}
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
                                                collection={codeSiege}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <ErrorMessage errors={errors} name="codeSiege"
                                                  render={({ message }) => (
                                                      <Text color="red.500" fontSize="sm">{message}</Text>
                                                  )}
                                    />
                                </VStack>

                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Nature de la relation *</Text>
                                    {isPersonneMorale ? (
                                        <InputTextField
                                            label=""
                                            value="Entité juridique"
                                            onChange={() => {}}
                                            isDisabled={true}
                                        />
                                    ) : (
                                        <Controller
                                            name="natureRelation"
                                            control={control}
                                            rules={{
                                                required: hasTypePersonne
                                                    ? "La nature de la relation est obligatoire"
                                                    : false,
                                            }}
                                            render={({ field }) => (
                                                <DropDownList
                                                    label=""
                                                    collection={natureRelationPP}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        handleNatureRelationChange(val);
                                                    }}
                                                    isDisabled={!hasTypePersonne}
                                                />
                                            )}
                                        />
                                    )}
                                    <ErrorMessage errors={errors} name="natureRelation"
                                                  render={({ message }) => (
                                                      <Text color="red.500" fontSize="sm">{message}</Text>
                                                  )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Ligne 3 : Code exploitant | Nom exploitant */}
                            <HStack gap={8} align="flex-start">
                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Code exploitant *</Text>
                                    <Controller
                                        name="codeExploitant"
                                        control={control}
                                        rules={{ required: "Le code exploitant est obligatoire" }}
                                        render={({ field }) => (
                                            codeExploitantCollection.items.length === 1 ? (
                                                <InputTextField
                                                    label=""
                                                    value={codeExploitantCollection.items[0].label}
                                                    onChange={() => {}}
                                                    isDisabled={true}
                                                />
                                            ) : (
                                                <DropDownList
                                                    label=""
                                                    collection={codeExploitantCollection}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        handleCodeExploitantChange(val);
                                                    }}
                                                />
                                            )
                                        )}
                                    />
                                    <ErrorMessage errors={errors} name="codeExploitant"
                                                  render={({ message }) => (
                                                      <Text color="red.500" fontSize="sm">{message}</Text>
                                                  )}
                                    />
                                </VStack>

                                <VStack align="flex-start" gap={1} flex="1">
                                    <Text fontSize="sm" fontWeight="bold">Nom de l'exploitant</Text>
                                    <Controller
                                        name="nomExploitant"
                                        control={control}
                                        render={({ field }) => (
                                            <InputTextField
                                                label=""
                                                value={field.value}
                                                onChange={field.onChange}
                                                isDisabled={true}
                                                placeholder="Renseigné automatiquement"
                                            />
                                        )}
                                    />
                                </VStack>
                            </HStack>

                            {/* Ligne 4 : Collectivité (conditionnel) */}
                            {isCollectivite && (
                                <HStack gap={8} align="flex-start">
                                    <VStack align="flex-start" gap={1} flex="1">
                                        <Text fontSize="sm" fontWeight="bold">
                                            Nom de la collectivité *
                                        </Text>
                                        <Controller
                                            name="nomCollectivite"
                                            control={control}
                                            rules={{
                                                required: "Le nom de la collectivité est obligatoire",
                                                maxLength: { value: 50, message: "Maximum 50 caractères" },
                                            }}
                                            render={({ field }) => (
                                                <InputTextField
                                                    label=""
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    maxLength={50}
                                                />
                                            )}
                                        />
                                        <ErrorMessage errors={errors} name="nomCollectivite"
                                                      render={({ message }) => (
                                                          <Text color="red.500" fontSize="sm">{message}</Text>
                                                      )}
                                        />
                                    </VStack>

                                    <VStack align="flex-start" gap={1} flex="1">
                                        <Text fontSize="sm" fontWeight="bold">
                                            Civilité de la collectivité *
                                        </Text>
                                        <Controller
                                            name="civiliteCollectivite"
                                            control={control}
                                            rules={{ required: "La civilité est obligatoire" }}
                                            render={({ field }) => (
                                                <DropDownList
                                                    label=""
                                                    collection={civilite}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                />
                                            )}
                                        />
                                        <ErrorMessage errors={errors} name="civiliteCollectivite"
                                                      render={({ message }) => (
                                                          <Text color="red.500" fontSize="sm">{message}</Text>
                                                      )}
                                        />
                                    </VStack>
                                </HStack>
                            )}

                            {/* Boutons */}
                            <HStack justify="center" gap={4} mt={4}>
                                <Button
                                    type="submit"
                                    color="white"
                                    bg="primary.dogerBlue.300"
                                    _hover={{
                                        bg: "white",
                                        color: "primary.dogerBlue.300",
                                        borderColor: "primary.dogerBlue.300",
                                    }}
                                    isDisabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <HStack gap={2}>
                                            <Spinner size="sm" />
                                            <Text>Initialisation...</Text>
                                        </HStack>
                                    ) : (
                                        <HStack gap={2}>
                                            <FaCheck />
                                            <Text>Instruire le dossier</Text>
                                        </HStack>
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    color="state.red.300"
                                    variant="outline"
                                    borderColor="state.red.300"
                                    _hover={{ bg: "state.red.300", color: "white" }}
                                    onClick={() => navigate("/dossiers")}
                                    isDisabled={isSubmitting}
                                >
                                    <HStack gap={2}>
                                        <CgCloseR />
                                        <Text>Abandonner</Text>
                                    </HStack>
                                </Button>
                            </HStack>

                        </VStack>
                    </form>
                </Box>
            </Flex>
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateCreation: currentDate,
      typePersonne: "",
      codeSiege: "",
      natureRelation: "",
      codeExploitant: "",
      nomCollectivite: "",
      nomExploitant: "",
      civiliteCollectivite: "",
    },
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
      <Box
        h="50px"
        bg="#C9E1F8"
        mt="10px"
        display="flex"
        alignItems="center"
        pl="20px"
        borderRadius="md"
      >
        <Text fontWeight="bold">INITIALISATION DE DOSSIER</Text>
      </Box>
      <Flex justify="center" align="center" minH="100vh" bg="gray.100" px={4}>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          bg="white"
          boxShadow="lg"
          w="full"
          maxW="800px"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={8} align="stretch">
              {/* Première ligne - deux colonnes */}
              <HStack gap={8} align="flex-start">
                <VStack align="flex-start" gap={1} flex="1">
                  <Text fontSize="sm" fontWeight="bold">
                    Date de création
                  </Text>
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
                  <Text fontSize="sm" fontWeight="bold">
                    Type de personne *
                  </Text>
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
                  <Text fontSize="sm" fontWeight="bold">
                    Code siège *
                  </Text>
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
                  <Text fontSize="sm" fontWeight="bold">
                    Nature de la relation *
                  </Text>
                  <Controller
                    name="natureRelation"
                    control={control}
                    rules={{
                      required: "La nature de la relation est obligatoire",
                    }}
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
                  <Text fontSize="sm" fontWeight="bold">
                    Code exploitant *
                  </Text>
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
                  <Text fontSize="sm" fontWeight="bold">
                    Nom de la collectivité *
                  </Text>
                  <Controller
                    name="nomCollectivite"
                    control={control}
                    rules={{
                      required: "Le nom de la collectivité est obligatoire",
                    }}
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
                  <Text fontSize="sm" fontWeight="bold">
                    Nom de l'exploitant *
                  </Text>
                  <Controller
                    name="nomExploitant"
                    control={control}
                    rules={{
                      required: "Le nom de l'exploitant est obligatoire",
                    }}
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
                  <Text fontSize="sm" fontWeight="bold">
                    Civilité de la collectivité *
                  </Text>
                  <Controller
                    name="civiliteCollectivite"
                    control={control}
                    rules={{
                      required:
                        "La civilité de la collectivité est obligatoire",
                    }}
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
                  _hover={{
                    bg: "white",
                    color: "primary.dogerBlue.300",
                    borderColor: "primary.dogerBlue.300",
                  }}
                >
                  <FaCheck /> Instruire le dossier
                </Button>
                <Button
                  type="button"
                  color="state.red.300"
                  variant="outline"
                  borderColor="state.red.300"
                  _hover={{ bg: "state.red.300", color: "white" }}
                  onClick={handleAbandoner}
                >
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
