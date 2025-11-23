import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const OriginEER = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldSet label="Origine EER">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Catégorie clientèle */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie clientèle"
              placeholder="Catégorie clientèle"
              {...register("categpryClient", {
                required: "La Catégorie clientèle est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="categorie_clientele"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Date EER */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date EER"
              placeholder="Date EER"
              {...register("date_eer", {
                required: "La date d'entrée en relation est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="date_eer"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Modalité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Modalité"
              placeholder="Modalité"
              {...register("date_eer", {
                required: "La date d'entrée en relation est obligatoire",
              })}
            />

            <ErrorMessage
              errors={errors}
              name="date_eer"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>
        {/* Motif EER */}
        <VStack align="flex-start" gap={1} flex="1">
          <InputTextField
            label="Motif EER"
            placeholder="Motif EER"
            {...register("motif_eer", {
              required: "Le motif eer est obligatoire",
            })}
          />

          <ErrorMessage
            errors={errors}
            name="motif_eer"
            render={({ message }) => (
              <Text color="red.500" fontSize="sm">
                {message}
              </Text>
            )}
          />
        </VStack>
      </FormFieldSet>
    </>
  );
};
