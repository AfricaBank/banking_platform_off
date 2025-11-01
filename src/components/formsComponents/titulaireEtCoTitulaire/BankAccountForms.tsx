import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { VStack, HStack, Text, Button, Box } from "@chakra-ui/react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { col2 } from "@/dataObject/ListCollection.ts";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export const BankAccountForms = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const [accountCount, setAccountCount] = useState(1);

  const addAccount = () => {
    setAccountCount(prev => prev + 1);
  };

  const removeAccount = () => {
    if (accountCount > 1) {
      setAccountCount(prev => prev - 1);
    }
  };

  const renderAccountFields = (accountIndex: number) => (
      <Box key={accountIndex} width="100%" mb={6}>
        {accountIndex > 0 && (
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Compte bancaire {accountIndex + 1}
            </Text>
        )}

        <FormFieldSet label={accountIndex === 0 ? "Compte bancaire" : ""}>
          {/* Première ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name={`accounts[${accountIndex}].type_compte`}
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Type de compte"}
                          collection={col2}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register(`accounts[${accountIndex}].type_compte`, {
                            required: "Le type de compte est obligatoire"
                          })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name={`accounts[${accountIndex}].type_compte`}
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Devise"
                  placeholder="Devise"
                  {...register(`accounts[${accountIndex}].devise`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Motif ouverture"
                  placeholder="Motif ouverture"
                  {...register(`accounts[${accountIndex}].motif_ouverture`)}
              />
            </VStack>
          </HStack>

          {/* Deuxième ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Racine"
                  placeholder="Racine"
                  {...register(`accounts[${accountIndex}].racine`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Clé"
                  placeholder="Clé"
                  {...register(`accounts[${accountIndex}].cle`)}
              />
            </VStack>
          </HStack>

          {/* Troisième ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Clé RIB"
                  placeholder="Clé RIB"
                  {...register(`accounts[${accountIndex}].cle_rib`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Convention de compte"
                  placeholder="Convention de compte"
                  {...register(`accounts[${accountIndex}].convention_compte`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Carton signature"
                  placeholder="Carton signature"
                  {...register(`accounts[${accountIndex}].carton_signature`)}
              />
            </VStack>
          </HStack>
        </FormFieldSet>
      </Box>
  );

  return (
      <>
        {/* Rendu des comptes bancaires */}
        {Array.from({ length: accountCount }, (_, index) =>
            renderAccountFields(index)
        )}

        {/* Boutons Ajouter/Supprimer */}
        <HStack width="100%" justifyContent="flex-start" spacing={4} mt={6}>
          <Button
              colorScheme="blue"
              onClick={addAccount}
              size="md"
          >
            Ajouter un compte
          </Button>

          {accountCount > 1 && (
              <Button
                  colorScheme="red"
                  onClick={removeAccount}
                  size="md"
                  variant="outline"
              >
                Supprimer le dernier compte
              </Button>
          )}
        </HStack>

        {/* Section Consentement et relation (inchangée) */}
        <FormFieldSet label="Consentement et relation">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Consentement crédit bureau"
                  placeholder="Consentement crédit bureau"
                  {...register("consentement_credit_bureau")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Nombre de personnes"
                  placeholder="Nombre de personnes"
                  {...register("nombre_personnes")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom personne"
                  placeholder="Nom personne"
                  {...register("nom_personne")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Prénom personne"
                  placeholder="Prénom personne"
                  {...register("prenom_personne")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Date de naissance personne"
                  placeholder="Date de naissance personne"
                  {...register("date_naissance_personne")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Sexe"
                  placeholder="Sexe"
                  {...register("sexe")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Commentaire de la relation"
                  placeholder="Commentaire de la relation"
                  {...register("commentaire_relation")}
              />
            </VStack>
          </HStack>
        </FormFieldSet>
      </>
  );
};
