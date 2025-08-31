import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import {useFormContext, Controller} from "react-hook-form";
import {
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import {DropDownList} from "@/components/customFormFields/DropDownList.tsx";
import {col2} from "@/dataObject/ListCollection.ts";

export const UserIdentificationForms = () => {
  const {
    register,
    formState: { errors },
    control,
    watch
  } = useFormContext();

  // Surveillez les valeurs problématiques
  const tiersValue = watch("tiers");
  const dateNaissanceValue = watch("date_naissance");

  console.log("tiers value:", tiersValue);
  console.log("date_naissance value:", dateNaissanceValue);
  console.log("errors:", errors);

  return (
      <>
        <FormFieldSet label="Informations personnelles">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              {/* Utiliser Controller pour le DropDownList */}
              <Controller
                  name="tiers"
                  control={control}
                  rules={{ required: "Le type de tiers est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Type du tiers"}
                          collection={col2}
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
              <DropDownList
                  label="Catégorie clientèle "
                  collection={col2}/>
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Matricule de l'agent"
                  placeholder="Matricule de l'agent"
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom de famille "
                  placeholder="Nom de famille "
                  {...register("nom", { required: "Le nom de famille est obligatoire" })}
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
              <InputTextField label="Prénom" placeholder="Prénom"
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
              <InputTextField label="Nom abrégé" placeholder="Nom abrégé" />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Civilité " placeholder="Civilité"
                              {...register("civilite", { required: "La civilité est obligatoire" })}
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
              <InputTextField label="Sexe" placeholder="Sexe"
                              {...register("sexe", { required: "Le genre est obligatoire" })}
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
                          value={field.value} // Passez la valeur
                          onChange={field.onChange} // Passez le gestionnaire de changement
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
                  {...register("lieu_naissance", { required: "Le lieu de naissance est obligatoire" })}/>
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
              <InputTextField
                  label="Pays de naissance "
                  placeholder="Pays de naissance"
                  {...register("pays_naissance", { required: "Le pays de naissance est obligatoire" })}/>
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
                  placeholder="Numéro d'identification fiscalee"
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Pays de nationalité"
                  placeholder="Pays de nationalité"
                  {...register("nationalite", { required: "La nationalité est obligatoire" })}/>
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
              <InputTextField
                  label="Pays de double nationalité"
                  placeholder="Pays de double nationalité"
              />
            </VStack>
            {/* Troisième espace */}
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Informations famillilaes et personnelles ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Situation de famille "
                  placeholder="Situation de famille "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Régime matrimoniale "
                  placeholder="Régime matrimoniale "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Nom marital" placeholder="Nom marital" />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Prénom du père " placeholder="Prénom du père " />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Prénom de la mère "
                  placeholder="Prénom de la mère "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nom de la jeune fille "
                  placeholder="Nom de la jeune fille "
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Nombre d’enfants en charge "
                  placeholder="Nombre d’enfants en charge "
              />
            </VStack>
            {/*Pas besoin des informations sur l'enfant pour le moment*/}
          </HStack>

        </FormFieldSet>

        <FormFieldSet label="Informations légales ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Numéro d’immatriculation "
                  placeholder="Numéro d’immatriculation "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Numéro d’acte de naissance "
                  placeholder="Numéro d’acte de naissance "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Pays d’immatriculation "
                  placeholder="Pays d’immatriculation "
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Date d’EER" placeholder="Date d’EER"
                              {...register("date_EER", { required: "Date EER est obligatoire" })}/>
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
              <InputTextField label="Motif de l’EER " placeholder="Motif de l’EER "
                              {...register("motif_EER", { required: "Motif EER est obligatoire" })}
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
                  label="Modalité de l’EER "
                  placeholder="Modalité de l’EER "
                  {...register("modalite_EER", { required: "Modalité EER est obligatoire" })}/>
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

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Pays de réalisation KYC "
                  placeholder="Pays de réalisation KYC "
                  {...register("pays_kyc", { required: "Pays KYC est obligatoire" })}/>
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
            {/* Laissez les deux autres espaces vides si nécessaire */}
          </HStack>
        </FormFieldSet>
      </>
  );
};
