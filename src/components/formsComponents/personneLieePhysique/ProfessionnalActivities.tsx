import { FormFieldSet } from "../FormFieldSet";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { RadioButton } from "@/components/customFormFields/RadioButton.tsx";
import { DropDownList } from "../../customFormFields/DropDownList";
import { SearchableDropDownList } from "../../customFormFields/SearchableDropDownList";
import { InputTextField } from "../../customFormFields/InputTextField";
import { CustomDatePicker } from "../../customFormFields/CustomDatePicker";
import {
  categori_socio_pro as socio,
  countryCollection,
} from "@/dataObject/ListCollection.ts";

export const ProfessionnalActivities = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormFieldSet label="Catégories spécifiques">
        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="categorie_clientele"
              control={control}
              rules={{ required: "La catégorie clientèle est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Catégorie clientèle *"
                  placeholder="Catégorie clientèle"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
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

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="categorie_socio_professionnelle"
              control={control}
              rules={{
                required: "La catégorie socio-professionnelle est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Catégorie socio-professionnelle *"
                  placeholder="Catégorie socio-professionnelle"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="categorie_socio_professionnelle"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
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
            <RadioButton label="Connaissance des informations internes *" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="Dirigeant BE dans une société cotée *" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="BE dans une société cotée *" />
          </VStack>
        </HStack>

        <HStack
          width="100%"
          justifyContent="space-between"
          mb={4}
          align="flex-start"
        >
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="Détention compte titre *" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="Délégation KYC *" />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <RadioButton label="Présence de flux international *" />
          </VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Activité économique">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="secteur_activite_eco"
              control={control}
              rules={{
                required: "Le secteur d’activité économique est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Secteur d’activité économique *"
                  placeholder="Secteur d’activité économique"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
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
              name="libelle_ape"
              control={control}
              rules={{ required: "Le libellé APE est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Libellé APE *"
                  placeholder="Libellé APE"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="libelle_ape"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Remplacement par CustomDatePicker */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="date_creation_activite"
              control={control}
              rules={{
                required: "La date de création de l’activité est obligatoire",
              }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date de création de l’activité *"
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
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="principal_pays_activite"
              control={control}
              rules={{
                required: "Le principal pays d’activité est obligatoire",
              }}
              render={({ field }) => (
                <SearchableDropDownList
                  label="Principal pays d’activité *"
                  placeholder="Rechercher un pays..."
                  collection={countryCollection}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="principal_pays_activite"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="activite_a_risque"
              control={control}
              rules={{
                required:
                  "L'information sur l'activité à risque est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Activité à risque *"
                  placeholder="Activité à risque"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="activite_a_risque"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="indicateur_prive_pro"
              control={control}
              render={({ field }) => (
                <DropDownList
                  label="Indicateur privé professionnel"
                  placeholder="Indicateur privé professionnel"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </VStack>
        </HStack>

        <VStack align="flex-start" gap={1} flex="1">
          <InputTextField
            label="Avoirs contrôlés"
            placeholder="Avoirs contrôlés"
            {...register("avoirs_controles")}
          />
        </VStack>
      </FormFieldSet>

      <FormFieldSet label="Code sectoriel">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="code_sectoriel_libelle"
              control={control}
              rules={{ required: "Le libellé est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Libellé *"
                  placeholder="Libellé"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="code_sectoriel_libelle"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="code_sectoriel_pourcentage"
              control={control}
              rules={{ required: "Le pourcentage est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Pourcentage *"
                  placeholder="Pourcentage"
                  collection={socio}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="code_sectoriel_pourcentage"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" />
        </HStack>
      </FormFieldSet>
    </>
  );
};
