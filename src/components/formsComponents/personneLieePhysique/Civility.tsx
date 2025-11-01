import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack } from "@chakra-ui/react";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { civility, sexe } from "@/dataObject/ListCollection.ts";

export const Civility = () => {
  return (
    <>
      <FormFieldSet label="Identitié">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <DropDownList
              collection={civility}
              label="Civilité"
              placeholder="Civilité"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <DropDownList collection={sexe} label="sexe" placeholder="Genre" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Prénom" placeholder="Prénom" />
          </VStack>
        </HStack>
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom de famille  "
              placeholder="Nom de famille  "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de nationalité  "
              placeholder="Pays de nationalité  "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField label="Nom abrégé " placeholder="Nom abrégé " />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de double nationalité "
              placeholder="Pays de double nationalité "
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Document d’identification"
              placeholder="Document d’identification"
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays d’émission du document "
              placeholder="Pays d’émission du document "
            />
          </VStack>
        </HStack>

        <InputTextField
          label="Date de délivrance "
          placeholder="Date de délivrance "
        />
      </FormFieldSet>
    </>
  );
};
