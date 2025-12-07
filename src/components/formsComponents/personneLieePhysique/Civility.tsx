import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import {
  civilite,
  countries,
  document_type,
  sexe,
} from "@/dataObject/ListCollection.ts";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";

export const Civility = () => {
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
            <Controller
              name="nationality"
              control={control}
              rules={{ required: "Le pays de nationalité est obligatoire." }}
              render={({ field }) => (
                <DropDownList
                  label="Pays de nationalité"
                  placeholder="Pays de nationalité"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="nationality"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
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
            <Controller
              name="doubleNationality"
              control={control}
              rules={{
                required: "Le pays de double nationalité est obligatoire.",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays de double nationalité"
                  placeholder="Pays de double nationalité"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="doubleNationality"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Document d’identification */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="document_type"
              control={control}
              rules={{
                required:
                  "Le type de document d'identification est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Document d'identification"
                  placeholder="Document d'identification"
                  collection={document_type}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="document_type"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Pays d’émission */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Numéro du document"
              placeholder="NUméro du document"
              {...register("document_id", {
                required: "Le numéro du document est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="document_id"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="deliver_country"
              control={control}
              rules={{
                required: "Le Pays d'émission est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays de délivrance"
                  placeholder="Pays de délivrance"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="deliver_country"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="delivered_date"
              control={control}
              rules={{ required: "La date d'émission est obligatoire" }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date d'émission"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="delivered_date"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>
      </FormFieldSet>
    </>
  );
};
