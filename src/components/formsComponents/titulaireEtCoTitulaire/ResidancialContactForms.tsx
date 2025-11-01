import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import {VStack, HStack, Text} from "@chakra-ui/react";
import {useFormContext, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {DropDownList} from "@/components/customFormFields/DropDownList.tsx";
import {col2} from "@/dataObject/ListCollection.ts";

export const ResidancialContactForms = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();
    return (
        <>
            <FormFieldSet label="Adresse et contact">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField label="Code postale  " placeholder="Code postale " />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1" mx={2}>
                        <InputTextField
                            label="Ville "
                            placeholder="Ville "
                            {...register("ville", { required: "Vous devez renseigner la ville" })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="ville"
                            render={({ message }) => (
                                <Text color="red.500" fontSize="sm">
                                    {message}
                                </Text>
                            )}
                        />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField
                            label="Domicile "
                            placeholder="Domicile"
                            {...register("adresse", { required: "L'adresse est obligatoire" })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="adresse"
                            render={({ message }) => (
                                <Text color="red.500" fontSize="sm">
                                    {message}
                                </Text>
                            )}
                        />
                    </VStack>
                </HStack>
            </FormFieldSet>

            <FormFieldSet label="Contact et email">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <InputTextField
                            label="Mobile "
                            placeholder="Mobile"
                            {...register("mobile", { required: "Le numéro de téléphone est obligatoire" })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="mobile"
                            render={({ message }) => (
                                <Text color="red.500" fontSize="sm">
                                    {message}
                                </Text>
                            )}
                        />
                    </VStack>
                    <VStack align="flex-start" gap={1} flex="1" mx={2}>
                        <InputTextField
                            label="Adresse email "
                            placeholder="Adresse email "
                            {...register("email", { required: "L'adresse mail est obligatoire" })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => (
                                <Text color="red.500" fontSize="sm">
                                    {message}
                                </Text>
                            )}
                        />
                    </VStack>
                </HStack>
            </FormFieldSet>

            <FormFieldSet label="Statut de résidence ">
                <HStack width="100%" justifyContent="space-between" mb={4}>
                    <VStack align="flex-start" gap={1} flex="1">
                        <Controller
                            name="pays_adresse_fiscal"
                            control={control}
                            render={({ field }) => (
                                <DropDownList
                                    label={"Pays d’adresse fiscale"}
                                    collection={col2}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    {...register("pays_adresse_fiscal", { required: "La pays d'adresse fiscale est obligatoire" })}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="pays_adresse_fiscal"
                            render={({ message }) => (
                                <Text color="red.500" fontSize="sm">
                                    {message}
                                </Text>
                            )}
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
