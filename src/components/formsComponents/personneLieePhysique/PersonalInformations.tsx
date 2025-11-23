import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const PersonalInformations = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldSet label="Naissance">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
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
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de naissance"
              placeholder="Pays de naissance"
              {...register("pays_naissance", {
                required: "Le pays de naissance est obligatoire",
              })}
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

        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Prénom du père */}
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

          {/* Prénom de la mère */}
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

          {/* Nom de jeune fille de la mère */}
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

        {/* Naissance présumée */}
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
          {/* Situation familiale */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Situation familiale"
              placeholder="Situation familiale"
              {...register("situation_familiale", {
                required: "La situation familiale est obligatoire",
              })}
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

          {/* Adresse fiscale */}
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

          {/* Code postal */}
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
          {/* Numéro de téléphone */}
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

          {/* Régime matrimonial */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Régime matrimonial"
              placeholder="Régime matrimonial"
              {...register("regime_matrimonial", {
                required: "Le régime matrimonial est obligatoire",
              })}
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

          {/* Nom marital */}
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
          {/* Localité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Localité"
              placeholder="Localité"
              {...register("localite", {
                required: "La localité est obligatoire",
              })}
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

          {/* Pays */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays"
              placeholder="Pays"
              {...register("pays", {
                required: "Le pays est obligatoire",
              })}
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

          {/* Statut de résidence */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Statut de résidence"
              placeholder="Statut de résidence"
              {...register("statut_residence", {
                required: "Le statut de résidence est obligatoire",
              })}
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
          {/* Wilaya */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Wilaya"
              placeholder="Wilaya"
              {...register("wilaya", {
                required: "La Wilaya est obligatoire",
              })}
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

          {/* Commune */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Commune"
              placeholder="Commune"
              {...register("commune", {
                required: "La commune est obligatoire",
              })}
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
