import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { VStack, HStack } from "@chakra-ui/react";

export const BankAccountForms = () => {
  return (
    <>
      <FormFieldSet label="Compte bancaire ">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Type de compte "
              placeholder="Type de compte "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField label="Devise" placeholder="Devise" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Motif ouverture "
              placeholder="Motif ouverture "
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Adresse email"
              placeholder="Adresse email "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField label="Racine " placeholder="Racine" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Clé" placeholder="Clé" />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Clé RIB" placeholder="Clé RIB" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField
              label="Convention de compte  "
              placeholder="Convention de compte "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Carton signature  "
              placeholder="Carton signature "
            />
          </VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Concentement et relation  ">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Concentement crédit bureau  "
              placeholder="Concentement crédit bureau  "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField
              label="Nombre de personnes"
              placeholder="Nombre de personnes"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Nom personne " placeholder="Nom personne " />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom personne  "
              placeholder="Prénom personne  "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField
              label="Date de naissance personne "
              placeholder="Date de naissance personne "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Sexe" placeholder="Sexe" />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Commentaire de la relation"
              placeholder="Commentaire de la relation "
            />
          </VStack>
          {/* Laissez les deux autres espaces vides si nécessaire */}
        </HStack>
      </FormFieldSet>
    </>
  );
};
