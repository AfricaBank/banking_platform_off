import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import { useFormContext, Controller } from "react-hook-form";
import { Text, VStack, HStack } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { categori_clientel, civilite, sexe, type_Tiers } from "@/dataObject/ListCollection.ts";

export const UserIdentificationForms = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
      <>
        <FormFieldSet label="Informations personnelles">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="tiers"
                  control={control}
                  rules={{ required: "Le type de tiers est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Type du tiers"}
                          collection={type_Tiers}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="tiers"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="categorie_cliente"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Catégorie clientèle"}
                          collection={categori_clientel}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Matricule de l'agent"
                  placeholder="Matricule de l'agent"
                  {...register("matricule_agent")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom de famille"
                  placeholder="Nom de famille"
                  {...register("nom", {
                    required: "Le nom de famille est obligatoire",
                  })}
              />
              <ErrorMessage
                  errors={errors}
                  name="nom"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Prénom"
                  placeholder="Prénom"
                  {...register("prenom", { required: "Le prénom est obligatoire" })}
              />
              <ErrorMessage
                  errors={errors}
                  name="prenom"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom abrégé"
                  placeholder="Nom abrégé"
                  {...register("nom_abrege")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="civilite"
                  control={control}
                  rules={{ required: "La civilité est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Civilité"}
                          collection={civilite}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="civilite"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="sexe"
                  control={control}
                  rules={{ required: "Le genre est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Sexe"}
                          collection={sexe}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="sexe"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="date_naissance"
                  control={control}
                  rules={{ required: "La date de naissance est obligatoire" }}
                  render={({ field }) => (
                      <CustomDatePicker
                          nomDuChamp="Date de naissance"
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
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
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
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="pays_naissance"
                  control={control}
                  rules={{ required: "Le pays de naissance est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Pays de naissance"}
                          collection={type_Tiers}
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
                  label="Numéro d'identification fiscale"
                  placeholder="Numéro d'identification fiscale"
                  {...register("numero_identification_fiscale")}
              />
            </VStack>
          </HStack>

          <HStack width="60%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="nationalite"
                  control={control}
                  rules={{ required: "La nationalité est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Pays de nationalité"}
                          collection={type_Tiers}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="nationalite"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <Controller
                  name="double_nationalite"
                  control={control}
                  render={({ field }) => (
                      <DropDownList
                          label={"Pays de double nationalité"}
                          collection={type_Tiers}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
            </VStack>
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Informations familiales et personnelles">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Situation de famille"
                  placeholder="Situation de famille"
                  {...register("situation_famille")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Régime matrimonial"
                  placeholder="Régime matrimonial"
                  {...register("regime_matrimonial")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom marital"
                  placeholder="Nom marital"
                  {...register("nom_marital")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Prénom du père"
                  placeholder="Prénom du père"
                  {...register("prenom_pere")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Prénom de la mère"
                  placeholder="Prénom de la mère"
                  {...register("prenom_mere")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom de jeune fille"
                  placeholder="Nom de jeune fille"
                  {...register("nom_jeune_fille")}
              />
            </VStack>
          </HStack>

          <HStack width="32%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nombre d'enfants en charge"
                  placeholder="Nombre d'enfants en charge"
                  {...register("nombre_enfants_charge")}
              />
            </VStack>
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Informations légales">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Numéro d'immatriculation"
                  placeholder="Numéro d'immatriculation"
                  {...register("numero_immatriculation")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Numéro d'acte de naissance"
                  placeholder="Numéro d'acte de naissance"
                  {...register("numero_acte_naissance")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Pays d'immatriculation"
                  placeholder="Pays d'immatriculation"
                  {...register("pays_immatriculation")}
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="date_EER"
                  control={control}
                  rules={{ required: "La date EER est obligatoire" }}
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
                  name="date_EER"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Motif de l'EER"
                  placeholder="Motif de l'EER"
                  {...register("motif_EER", {
                    required: "Motif EER est obligatoire",
                  })}
              />
              <ErrorMessage
                  errors={errors}
                  name="motif_EER"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Modalité de l'EER"
                  placeholder="Modalité de l'EER"
                  {...register("modalite_EER", {
                    required: "Modalité EER est obligatoire",
                  })}
              />
              <ErrorMessage
                  errors={errors}
                  name="modalite_EER"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
          </HStack>

          <HStack width="32%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name="pays_kyc"
                  control={control}
                  rules={{ required: "Pays KYC est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Pays KYC"}
                          collection={type_Tiers}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name="pays_kyc"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
          </HStack>
        </FormFieldSet>
      </>
  );
};
