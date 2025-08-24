import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { VStack, HStack } from "@chakra-ui/react";

export const ResidancialContactForms = () => {
    return (
        <>
            <FormFieldSet label="Adresse et contact">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField label="Code postale  " placeholder="Code postale " />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1" mx={2}>
                        <InputTextField label="Localité " placeholder="Localité " />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField label="Domicile " placeholder="Domicile" />
                    </VStack>
                </HStack>

                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField
                            label="Situation logement"
                            placeholder="Situation logement "
                        />
                    </VStack>
                    {/* Laissez les deux autres espaces vides */}
                </HStack>
            </FormFieldSet>

            <FormFieldSet label="Contact et email">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField label="Mobile " placeholder="Mobile" />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1" mx={2}>
                        <InputTextField label="Adresse email " placeholder="Adresse email " />
                    </VStack>
                    {/* Laissez le troisième espace vide */}
                </HStack>
            </FormFieldSet>

            <FormFieldSet label="Statut de résidence ">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField
                            label="Pays d’adresse fiscale"
                            placeholder="Pays d’adresse fiscale"
                        />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1" mx={2}>
                        <InputTextField
                            label="Statut résidence "
                            placeholder="Statut résidence"
                        />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField
                            label="Date d’entrée territoire "
                            placeholder="Date d’entrée territoire "
                        />
                    </VStack>
                </HStack>
            </FormFieldSet>
        </>
    );
};