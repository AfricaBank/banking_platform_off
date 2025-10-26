import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack } from "@chakra-ui/react";

export const PersonalInformations = () => {
  return (
    <>
      <FormFieldSet label="Naissance">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date de naissance"
              placeholder="Date de naissance"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de naissance"
              placeholder="Pays de naissance"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Lieu de naissance"
              placeholder="Lieu de naissance"
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom du père"
              placeholder="Prénom du père"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom de la mère"
              placeholder="Prénom de la mère"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom de jeune fille de la mère"
              placeholder="Nom de jeune fille de la mère"
            />
          </VStack>
        </HStack>

        <InputTextField
          label="Naissance présumée"
          placeholder="Naissance présumée"
        />
      </FormFieldSet>

      <FormFieldSet label="Situation de famille">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Situation familiale"
              placeholder="Situation familiale"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Adresse fiscale"
              placeholder="Adresse fiscale"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Code postal" placeholder="Code postal" />
          </VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Contact et adresse">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Numéro de téléphone"
              placeholder="Numéro de téléphone"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Régime matrimonial"
              placeholder="Régime matrimonial"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Nom marital" placeholder="Nom marital" />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Localité" placeholder="Localité" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Pays" placeholder="Pays" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Statut de résidence"
              placeholder="Statut de résidence"
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Wilaya" placeholder="Wilaya" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Commune" placeholder="Commune" />
          </VStack>
        </HStack>
      </FormFieldSet>
    </>
  );
};
