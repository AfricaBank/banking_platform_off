import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { countries, sexe } from "@/dataObject/ListCollection.ts";
import { RadioButton } from "@/components/customFormFields/RadioButton.tsx";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";

export const PersonalInformations = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldSet label="Naissance">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Date de naissance avec CustomDatePicker */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="date_naissance"
              control={control}
              rules={{ required: "La date de naissance est obligatoire" }}
              render={({ field }) => (
                <CustomDatePicker
                  nomDuChamp="Date de naissance *"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="date_naissance"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="pays_naissance"
              control={control}
              rules={{
                required: "Le pays de naissance est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays de naissance *"
                  placeholder="Pays de naissance"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="pays_naissance"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Lieu de naissance *"
              placeholder="Lieu de naissance"
              {...register("lieu_naissance", {
                required: "Le lieu de naissance est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="lieu_naissance"
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
              label="Prénom du père *"
              placeholder="Prénom du père"
              {...register("prenom_pere", {
                required: "Le prénom du père est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="prenom_pere"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom de la mère *"
              placeholder="Prénom de la mère"
              {...register("prenom_mere", {
                required: "Le prénom de la mère est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="prenom_mere"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom de jeune fille de la mère *"
              placeholder="Nom de jeune fille de la mère"
              {...register("nom_jeune_fille_mere", {
                required: "Le nom de jeune fille de la mère est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nom_jeune_fille_mere"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>
        <VStack align="flex-start" gap={1} flex="1">
          <RadioButton label="Naissance présumé ? *" />
        </VStack>
      </FormFieldSet>

      <FormFieldSet label="Situation de famille">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="situation_familiale"
              control={control}
              rules={{
                required: "La situation familiale est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Situation familiale *"
                  placeholder="Situation familiale"
                  collection={sexe}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="situation_familiale"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Adresse fiscale *"
              placeholder="Adresse fiscale"
              {...register("adresse_fiscale", {
                required: "L'adresse fiscale est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="adresse_fiscale"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Code postal"
              placeholder="Code postal"
              {...register("code_postal")}
            />
          </VStack>
        </HStack>
      </FormFieldSet>

      <FormFieldSet label="Contact et adresse">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Numéro de téléphone *"
              placeholder="Numéro de téléphone"
              {...register("numero_telephone", {
                required: "Le numéro de téléphone est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="numero_telephone"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="regime_matrimonial"
              control={control}
              rules={{
                required: "Le régime matrimonial est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Régime matrimonial *"
                  placeholder="Régime matrimonial"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="regime_matrimonial"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom marital *"
              placeholder="Nom marital"
              {...register("nom_marital", {
                required: "Le nom marital est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nom_marital"
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
              name="localite"
              control={control}
              rules={{
                required: "La localité est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Localité *"
                  placeholder="Localité"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="localite"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="pays"
              control={control}
              rules={{
                required: "Le pays est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays *"
                  placeholder="Pays"
                  collection={countries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="pays"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="statut_residence"
              control={control}
              render={({ field }) => (
                <DropDownList
                  label="Statut de résidence"
                  placeholder="Statut de résidence"
                  collection={sexe}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="wilaya"
              control={control}
              rules={{
                required: "La Wilaya est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Wilaya *"
                  placeholder="Wilaya"
                  collection={sexe}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="wilaya"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="commune"
              control={control}
              rules={{
                required: "La commune est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Commune *"
                  placeholder="Commune"
                  collection={sexe}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="commune"
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
