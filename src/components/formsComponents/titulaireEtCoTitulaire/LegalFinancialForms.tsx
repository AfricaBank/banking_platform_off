import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import {
  VStack,
  HStack, Text,
} from "@chakra-ui/react";
import {useFormContext} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

export const LegalFinancialForms = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
      <>
        <FormFieldSet label="Capacité juridique et sécurité ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Type du tiers " placeholder="Type du tiers" />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField label="Date effet " placeholder="Date effet e"
                              {...register("date_effet", {required: "Date d'effet est obligatoire"})}/>
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
              <InputTextField
                  label="Segment sécurité financièere "
                  placeholder="Segment sécurité financièere "
              />
            </VStack>
          </HStack>

          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField label="Profil client  " placeholder="Profil client  " />
            </VStack>
            {/* Laissez les deux autres espaces vides si nécessaire */}
          </HStack>
        </FormFieldSet>

        <FormFieldSet label="Activité professionnelle et économique   ">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Catégorie socio-professionnelle  "
                  placeholder="Catégorie socio-professionnelle e "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Secteur d’acitivié économique  "
                  placeholder="Secteur d’acitivié économique  "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Activité à risque "
                  placeholder="Activité à risque "
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
              <InputTextField
                  label="Date de création de l’activité  "
                  placeholder="Date de création de l’activité  "
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Pays d’activité "
                  placeholder="Pays d’activité  "
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
              <InputTextField label="Depuis quand " placeholder="Depuis quand " />
            </VStack>
          </HStack>
        </FormFieldSet>
      </>
  );
};