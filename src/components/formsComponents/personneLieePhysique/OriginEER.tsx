import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack } from "@chakra-ui/react";

export const OriginEER = () => {
  return (
    <>
      <FormFieldSet label="Origine EER">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie clientèle"
              placeholder="Catégorie clientèle"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Date EER" placeholder="Date EER" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Modalité" placeholder="Modalité" />
          </VStack>
        </HStack>

        <InputTextField label="Motif EER" placeholder="Motif EER" />
      </FormFieldSet>
    </>
  );
};
