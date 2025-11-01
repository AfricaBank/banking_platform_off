import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import {
  VStack,
  HStack, Text,
} from "@chakra-ui/react";
import {useFormContext, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {DropDownList} from "@/components/customFormFields/DropDownList.tsx";
import {
    activiteARisque,
    col2,
    natureJuridique,
    secteurActivite,
    segmentSecuriteFinanciere
} from "@/dataObject/ListCollection.ts";

export const LegalFinancialForms = () => {

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  return (
      <>
        <FormFieldSet label="Capacité juridique et sécurité ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="capacite_juridique"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Capacité juridique"}
                          collection={natureJuridique}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register("capacite_juridique", { required: "La capacité juridique est obligatoire" })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="capacite_juridique"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="date_effet"
                  control={control}
                  rules={{ required: "La date d'effet est obligatoire" }}
                  render={({ field }) => (
                      <CustomDatePicker
                          nomDuChamp="Date d'effet"
                          value={field.value}
                          onChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="date_effet"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="segment_securite"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Segment de sécurité financièere"}
                          collection={segmentSecuriteFinanciere}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
            </VStack>
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Activité professionnelle et économique   ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="categori_socio_professionnelle"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Catégorie socio-professionnelle"}
                          collection={col2}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register("categori_socio_professionnelle", { required: "La catégorie professionelle est obligatoire" })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="categori_socio_professionnelle"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="secteur_activite_eco"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Secteur d’acitivié économique "}
                          collection={secteurActivite}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register("secteur_activite_eco", { required: "Le secteur économique est obligatoire" })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="secteur_activite_eco"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="activite_risque"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Activité à risque"}
                          collection={activiteARisque}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register("activite_risque", { required: "L'activité à risque est obligatoire" })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="activite_risque"
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
              <InputTextField
                  label="Description activité "
                  placeholder="Description activité "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="date_creation_activite"
                  control={control}
                  rules={{ required: "La date de création de l’activité est obligatoire" }}
                  render={({ field }) => (
                      <CustomDatePicker
                          nomDuChamp="Date de création de l’activité"
                          value={field.value}
                          onChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="date_creation_activite"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="pays_activite"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Pays d’activité"}
                          collection={col2}
                          value={field.value}
                          onValueChange={field.onChange}
                          {...register("pays_activite", { required: "Le pays d'activité est obligatoire" })}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="pays_activite"
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
              <InputTextField
                  label="Pourcentge de l’activité  "
                  placeholder="Pourcentge de l’activité "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Cumilé des pourcentages d’activités  "
                  placeholder="Cumilé des pourcentages d’activités "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Commentaire activités "
                  placeholder="Commentaire activités "
              />
            </VStack>
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Employeur et revenu">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom de l’employeur  "
                  placeholder="Nom de l’employeur "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Domiciliation salaire "
                  placeholder="Domiciliation salaire "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="depuis_quand"
                  control={control}
                  // rules={{ required: "La date de création de l’activité est obligatoire" }}
                  render={({ field }) => (
                      <CustomDatePicker
                          nomDuChamp="Depuis quand"
                          value={field.value}
                          onChange={field.onChange}
                      />
                  )}
              />
            </VStack>
          </HStack>
        </FormFieldSet>
      </>
  );
};
