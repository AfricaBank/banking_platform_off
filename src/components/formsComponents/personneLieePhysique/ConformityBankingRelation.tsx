import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const ConformityBankingRelation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {/* --- Bloc Conformité --- */}
      <FormFieldSet label="Conformité">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Détection PPE (obligatoire -> Controller) */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="detectionPpe"
              control={control}
              rules={{ required: "La détection PPE est obligatoire" }}
              render={({ field }) => (
                <InputTextField
                  label="Détection PPE"
                  placeholder="Détection PPE"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="detectionPpe"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Type PPE (obligatoire -> Controller) */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="typePpe"
              control={control}
              rules={{ required: "Le type PPE est obligatoire" }}
              render={({ field }) => (
                <InputTextField
                  label="Type de PPE"
                  placeholder="Type de PPE"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="typePpe"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Commentaire"
              placeholder="Commentaire"
              {...register("commentaire")}
            />
            <ErrorMessage
              errors={errors}
              name="commentaire"
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
          {/* PPE local (optionnel) */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="PPE local"
              placeholder="PPE local"
              {...register("ppeLocal")}
            />
          </VStack>

          {/* Sous sanction (optionnel) */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Sous sanction"
              placeholder="Sous sanction"
              {...register("sousSanction")}
            />
          </VStack>

          {/* Date d’identification (optionnel) */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date d’identification"
              placeholder="Date d’identification"
              {...register("dateIdentification")}
            />
          </VStack>
        </HStack>

        {/* Date interrogation vigilance (optionnel) */}
        <VStack align="flex-start" gap={1}>
          <InputTextField
            label="Date d’interrogation vigilance"
            placeholder="Date d’interrogation vigilance"
            {...register("dateInterrogation")}
          />
        </VStack>
      </FormFieldSet>

      {/* --- Bloc Relation bancaire --- */}
      <FormFieldSet label="Relation bancaire">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* ID Nationale (obligatoire -> Controller) */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="idNationale"
              control={control}
              rules={{ required: "L'ID nationale est obligatoire" }}
              render={({ field }) => (
                <InputTextField
                  label="ID Nationale"
                  placeholder="ID Nationale"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="idNationale"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Code siège (optionnel) */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Code siège"
              placeholder="Code siège"
              {...register("codeSiege")}
            />
          </VStack>

          {/* Code racine (optionnel) */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Code racine"
              placeholder="Code racine"
              {...register("codeRacine")}
            />
          </VStack>
        </HStack>

        {/* Segment clientèle DG (optionnel) */}
        <VStack align="flex-start" gap={1}>
          <InputTextField
            label="Segment clientèle vis-à-vis DG"
            placeholder="Segment clientèle vis-à-vis DG"
            {...register("segmentDg")}
          />
        </VStack>
      </FormFieldSet>

      {/* --- Bloc Enfants et personnes à charge --- */}
      <FormFieldSet label="Enfants et personnes à charge">
        <VStack align="flex-start" gap={1}>
          <InputTextField
            label="Enfants et personnes à charge"
            placeholder="Enfants et personnes à charge"
            {...register("nbEnfants")}
          />
        </VStack>
      </FormFieldSet>
    </>
  );
};
