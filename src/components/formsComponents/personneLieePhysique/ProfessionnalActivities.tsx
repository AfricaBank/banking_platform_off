import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack } from "@chakra-ui/react";

export const ProfessionnalActivities = () => {
  return (
    <>
      <FormFieldSet label="Catégories spécifiques">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie clientèle"
              placeholder="Catégorie clientèle"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie socio-professionnelle"
              placeholder="Catégorie socio-professionnelle"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Connaissance des informations internes"
              placeholder="Connaissance des informations internes"
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Dirigeant BE dans une société cotée"
              placeholder="Dirigeant BE dans une société cotée"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="BE dans une société cotée"
              placeholder="BE dans une société cotée"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Détention compte titre"
              placeholder="Détention compte titre"
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Délégation KYC"
              placeholder="Délégation KYC"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Présence de flux international"
              placeholder="Présence de flux international"
            />
          </VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Activité économique">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Secteur d’activité économique"
              placeholder="Secteur d’activité économique"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Libellé APE" placeholder="Libellé APE" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date de création de l’activité"
              placeholder="Date de création de l’activité"
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Principal pays d’activité"
              placeholder="Principal pays d’activité"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Activité à risque"
              placeholder="Activité à risque"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Indicateur privé professionnel"
              placeholder="Indicateur privé professionnel"
            />
          </VStack>
        </HStack>

        <InputTextField
          label="Avoirs contrôlés"
          placeholder="Avoirs contrôlés"
        />
      </FormFieldSet>

      <FormFieldSet label="Code sectoriel">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Libellé" placeholder="Libellé" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Pourcentage" placeholder="Pourcentage" />
          </VStack>
        </HStack>
      </FormFieldSet>
    </>
  );
};
