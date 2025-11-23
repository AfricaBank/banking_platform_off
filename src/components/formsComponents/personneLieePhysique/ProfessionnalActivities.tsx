import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const ProfessionnalActivities = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldSet label="Catégories spécifiques">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Catégorie clientèle */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie clientèle"
              placeholder="Catégorie clientèle"
              {...register("categorie_clientele", {
                required: "La catégorie clientèle est obligatoire",
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

          {/* Catégorie socio-professionnelle */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Catégorie socio-professionnelle"
              placeholder="Catégorie socio-professionnelle"
              {...register("categorie_socio_professionnelle", {
                required: "La catégorie socio-professionnelle est obligatoire",
              })}
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

          {/* Connaissance des informations internes */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Connaissance des informations internes"
              placeholder="Connaissance des informations internes"
              {...register("connaissance_info_internes", {
                required:
                  "L'information sur la connaissance interne est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="connaissance_info_internes"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Dirigeant BE dans une société cotée */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Dirigeant BE dans une société cotée"
              placeholder="Dirigeant BE dans une société cotée"
              {...register("dirigeant_be_soc_cotee", {
                required: "Cette information est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="dirigeant_be_soc_cotee"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* BE dans une société cotée */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="BE dans une société cotée"
              placeholder="BE dans une société cotée"
              {...register("be_soc_cotee", {
                required: "Cette information est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="be_soc_cotee"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Détention compte titre */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Détention compte titre"
              placeholder="Détention compte titre"
              {...register("detention_compte_titre", {
                required:
                  "L'information sur la détention de compte titre est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="detention_compte_titre"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Délégation KYC */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Délégation KYC"
              placeholder="Délégation KYC"
              {...register("delegation_kyc", {
                required: "L'information sur la délégation KYC est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="delegation_kyc"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>

          {/* Présence de flux international */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Présence de flux international"
              placeholder="Présence de flux international"
              {...register("presence_flux_international", {
                required:
                  "L'information sur les flux internationaux est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="presence_flux_international"
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
      ---
      <FormFieldSet label="Activité économique">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Secteur d’activité économique */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Secteur d’activité économique"
              placeholder="Secteur d’activité économique"
              {...register("secteur_activite_eco", {
                required: "Le secteur d’activité économique est obligatoire",
              })}
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

          {/* Libellé APE */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Libellé APE"
              placeholder="Libellé APE"
              {...register("libelle_ape", {
                required: "Le libellé APE est obligatoire",
              })}
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

          {/* Date de création de l’activité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Date de création de l’activité"
              placeholder="Date de création de l’activité"
              {...register("date_creation_activite", {
                required: "La date de création de l’activité est obligatoire",
              })}
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
          {/* Principal pays d’activité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Principal pays d’activité"
              placeholder="Principal pays d’activité"
              {...register("principal_pays_activite", {
                required: "Le principal pays d’activité est obligatoire",
              })}
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

          {/* Activité à risque */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Activité à risque"
              placeholder="Activité à risque"
              {...register("activite_a_risque", {
                required:
                  "L'information sur l'activité à risque est obligatoire",
              })}
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

          {/* Indicateur privé professionnel */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Indicateur privé professionnel"
              placeholder="Indicateur privé professionnel"
              {...register("indicateur_prive_pro", {
                required: "L'indicateur privé professionnel est obligatoire",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="indicateur_prive_pro"
              render={({ message }) => (
                <Text color="red.500" fontSize="sm">
                  {message}
                </Text>
              )}
            />
          </VStack>
        </HStack>

        {/* Avoirs contrôlés */}
        <VStack align="flex-start" gap={1} flex="1">
          <InputTextField
            label="Avoirs contrôlés"
            placeholder="Avoirs contrôlés"
            {...register("avoirs_controles", {
              required: "Les avoirs contrôlés sont obligatoires",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="avoirs_controles"
            render={({ message }) => (
              <Text color="red.500" fontSize="sm">
                {message}
              </Text>
            )}
          />
        </VStack>
      </FormFieldSet>
      ---
      <FormFieldSet label="Code sectoriel">
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Libellé */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Libellé"
              placeholder="Libellé"
              {...register("code_sectoriel_libelle", {
                required: "Le libellé est obligatoire",
              })}
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

          {/* Pourcentage */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pourcentage"
              placeholder="Pourcentage"
              {...register("code_sectoriel_pourcentage", {
                required: "Le pourcentage est obligatoire",
              })}
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
          {/* Espace vide pour alignement */}
          <VStack align="flex-start" gap={1} flex="1" />
        </HStack>
      </FormFieldSet>
    </>
  );
};
