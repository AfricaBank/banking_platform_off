import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { RadioButton } from "@/components/customFormFields/RadioButton.tsx";
import { CustomDatePicker } from "../../customFormFields/CustomDatePicker";
import { DropDownList } from "../../customFormFields/DropDownList";
import { categori_socio_pro as socio } from "@/dataObject/ListCollection.ts";

export const ConformityBankingRelation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormFieldSet label="Conformité">
        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="detectionPpe"
              control={control}
              rules={{ required: "La détection PPE est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Détection PPE"
                  placeholder="Détection PPE"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
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

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="typePpe"
              control={control}
              rules={{ required: "Le type PPE est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Type de PPE"
                  placeholder="Type de PPE"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
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
          </VStack>
        </HStack>

        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="PPE local" />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="Sous sanction" />
          </VStack>
          <VStack align="flex-center" flex={1} width="32.5%"></VStack>
        </HStack>

        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
          <VStack align="flex-start" gap={1} flex="1" width="32.5%">
            <Controller
              name="dateIdentification"
              control={control}
              rules={{ required: "La date d’identification est obligatoire" }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date d’identification"
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="dateIdentification"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-center" flex={1} width="32.5%">
            <Controller
              name="dateInterrogation"
              control={control}
              rules={{
                required: "La date d’interrogation vigilance est obligatoire",
              }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date d’interrogation vigilance"
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="dateInterrogation"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-center" flex={1} width="32.5%"></VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Relation bancaire">
        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
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

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Code siège"
              placeholder="Code siège"
              {...register("codeSiege")}
              disabled
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Code racine"
              placeholder="Code racine"
              {...register("codeRacine")}
              disabled
            />
          </VStack>
        </HStack>

        <VStack align="flex-start" gap={1} width="32.5%">
          <Controller
            name="segmentDg"
            control={control}
            rules={{ required: "Le segment clientèle est obligatoire" }}
            render={({ field }) => (
              <DropDownList
                label="Segment clientèle vis-à-vis DG"
                placeholder="Segment clientèle vis-à-vis DG"
                collection={socio}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="segmentDg"
            render={({ message }) => (
              <Text color="red.500" fontSize="sm">
                {message}
              </Text>
            )}
          />
        </VStack>
      </FormFieldSet>

      <FormFieldSet label="Enfants et personnes à charge">
        <VStack align="flex-start" gap={1} width="32.5%">
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
