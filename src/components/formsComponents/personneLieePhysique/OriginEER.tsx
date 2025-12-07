import { FormFieldSet } from "../FormFieldSet";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import {
  categori_clientel,
  modalite_eer,
  motif_eer,
} from "@/dataObject/ListCollection.ts";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";

export const OriginEER = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldSet label="Origine EER">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Catégorie clientèle */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="categori_clientel"
              control={control}
              rules={{ required: "La catégorie clientèle ets obligatoire " }}
              render={({ field }) => (
                <DropDownList
                  label="Catégorie clientèle "
                  placeholder="Catégorie clientèle "
                  collection={categori_clientel}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="categori_clientel"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Date EER */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="date_eer"
              control={control}
              rules={{
                required: "La date d'entrée en relation est obligatoire",
              }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date EER"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
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
            <Controller
              name="modalite_eer"
              control={control}
              rules={{ required: "La modalité EER est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Modalité EER "
                  placeholder="Modalité EER "
                  collection={modalite_eer}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="modalite_eer"
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
          <Controller
            name="motif_eer"
            control={control}
            rules={{ required: "Le motif eer est obligatoire" }}
            render={({ field }) => (
              <DropDownList
                label="Motif EER "
                placeholder="Motif EER "
                collection={motif_eer}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
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
