import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { VStack, HStack } from "@chakra-ui/react";

export const ConformityBankingRelation = () => {
  return (
    <>
      <FormFieldSet label="Conformité ">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Détection PPE" placeholder="Détection PPE" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Type de PPE" placeholder="Type de PPE" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Commentaire" placeholder="Commentaire" />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="PPE local" placeholder="PPE local" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Sous sanction" placeholder="Sous sanction" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date d’identification"
              placeholder="Date d’identification"
            />
          </VStack>
        </HStack>

        <InputTextField
          label="Date d’interrogation vigilance"
          placeholder="Date d’interrogation vigilance"
        />
      </FormFieldSet>

      <FormFieldSet label="Relation bancaire">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="ID Nationale" placeholder="ID Nationale" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Code siège" placeholder="Code siège" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Code racine" placeholder="Code racine" />
          </VStack>
        </HStack>

        <InputTextField
          label="Segment clientèle vis-à-vis DG"
          placeholder="Segment clientèle vis-à-vis DG"
        />
      </FormFieldSet>

      <FormFieldSet label="Enfants et personnes à charge">
        <InputTextField
          label="Enfants et personnes à charge"
          placeholder="Enfants et personnes à charge"
        />
      </FormFieldSet>
    </>
  );
};
