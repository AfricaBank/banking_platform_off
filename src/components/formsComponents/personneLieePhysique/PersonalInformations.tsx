import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { countries, sexe } from "@/dataObject/ListCollection.ts";
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
          <VStack align="flex-start" gap={1} flex="1">
            {/* Date de naissance (laissé en InputTextField car c'est une date) */}
            <InputTextField
              label="Date de naissance"
              placeholder="Date de naissance"
              {...register("prenom", {
                required: "La date de naissance st obligatoire",
              })}
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

          {/* CHAMP CONVERTIT : Pays de naissance */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="pays_naissance"
              control={control}
              rules={{
                required: "Le pays de naissance est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays de naissance"
                  placeholder="Pays de naissance"
                  collection={countries} // Collection de pays
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
              label="Lieu de naissance"
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

        {/* Reste du FormFieldSet Naissance non modifié (Inputs) */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Prénom du père"
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
              label="Prénom de la mère"
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
              label="Nom de jeune fille de la mère"
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
          <InputTextField
            label="Naissance présumée"
            placeholder="Naissance présumée"
            {...register("naissance_presumee", {
              required: "La naissance présumée est obligatoire",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="naissance_presumee"
            render={({ message }) => (
              <Text color="red.500" fontSize="sm">
                {message}
              </Text>
            )}
          />
        </VStack>
      </FormFieldSet>
      ---
      <FormFieldSet label="Situation de famille">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* CHAMP CONVERTIT : Situation familiale */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="situation_familiale"
              control={control}
              rules={{
                required: "La situation familiale est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Situation familiale"
                  placeholder="Situation familiale"
                  collection={sexe} // Collection de situations familiales
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
              label="Adresse fiscale"
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
              {...register("code_postal", {
                required: "Le code postal est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="code_postal"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>
      </FormFieldSet>
      ---
      <FormFieldSet label="Contact et adresse">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Numéro de téléphone"
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

          {/* CHAMP CONVERTIT : Régime matrimonial */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="regime_matrimonial"
              control={control}
              rules={{
                required: "Le régime matrimonial est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Régime matrimonial"
                  placeholder="Régime matrimonial"
                  collection={countries} // Collection des régimes matrimoniaux
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
              label="Nom marital"
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
          {/* CHAMP CONVERTIT : Localité */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="localite"
              control={control}
              rules={{
                required: "La localité est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Localité"
                  placeholder="Localité"
                  collection={countries} // Collection de localités
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

          {/* CHAMP CONVERTIT : Pays */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="pays"
              control={control}
              rules={{
                required: "Le pays est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Pays"
                  placeholder="Pays"
                  collection={countries} // Collection de pays
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

          {/* CHAMP CONVERTIT : Statut de résidence (Nommé 'RESIDENT' dans votre liste) */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="statut_residence" // Utilisation de l'ancien nom de champ
              control={control}
              rules={{
                required: "Le statut de résidence est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Statut de résidence"
                  placeholder="Statut de résidence"
                  collection={sexe} // Collection des statuts de résidence
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="statut_residence"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* CHAMP CONVERTIT : Wilaya */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="wilaya"
              control={control}
              rules={{
                required: "La Wilaya est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Wilaya"
                  placeholder="Wilaya"
                  collection={sexe} // Collection des wilayas
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

          {/* CHAMP CONVERTIT : Commune */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="commune"
              control={control}
              rules={{
                required: "La commune est obligatoire",
              }}
              render={({ field }) => (
                <DropDownList
                  label="Commune"
                  placeholder="Commune"
                  collection={sexe} // Collection des communes
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

          {/* Espace vide pour alignement */}
          <VStack align="flex-start" gap={1} flex="1" />
        </HStack>
      </FormFieldSet>
    </>
  );
};
