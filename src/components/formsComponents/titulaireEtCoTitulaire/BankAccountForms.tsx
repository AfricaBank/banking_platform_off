import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { civilite, sexe } from "@/dataObject/ListCollection.ts";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const BankAccountForms = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormFieldSet label="Identité">
        {/* Première ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Civilité */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="civilite"
              control={control}
              rules={{ required: "La civilité est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Civilité"
                  placeholder="Civilité"
                  collection={civilite}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="civilite"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Sexe */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="sexe"
              control={control}
              rules={{ required: "Le sexe est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Sexe"
                  placeholder="Genre"
                  collection={sexe}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="sexe"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Prénom */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom"
              placeholder="Prénom"
              {...register("prenom", { required: "Le prénom est obligatoire" })}
            />
            <ErrorMessage
              errors={errors}
              name="prenom"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        {/* Deuxième ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Nom */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom de famille"
              placeholder="Nom de famille"
              {...register("nom", { required: "Le nom est obligatoire" })}
            />
            <ErrorMessage
              errors={errors}
              name="nom"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Nationalité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de nationalité"
              placeholder="Pays de nationalité"
              {...register("paysNationalite")}
            />
          </VStack>

          {/* Nom abrégé */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom abrégé"
              placeholder="Nom abrégé"
              {...register("nomAbrege")}
            />
          </VStack>
        </HStack>

        {/* Troisième ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Double nationalité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de double nationalité"
              placeholder="Pays de double nationalité"
              {...register("doubleNationalite")}
            />
          </VStack>

          {/* Document d’identification */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Document d’identification"
              placeholder="Document d’identification"
              {...register("documentId")}
            />
          </VStack>

          {/* Pays d’émission */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays d’émission du document"
              placeholder="Pays d’émission du document"
              {...register("paysEmission")}
            />
          </VStack>
        </HStack>

        {/* Date de délivrance */}
        <VStack align="flex-start" gap={1} flex="1">
          <InputTextField
            label="Date de délivrance"
            placeholder="Date de délivrance"
            {...register("dateDelivrance")}
          />
        </VStack>
      </FormFieldSet>
    </>
  );
};
