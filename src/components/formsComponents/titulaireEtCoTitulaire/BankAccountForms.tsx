import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
<<<<<<< HEAD
import { civilite, sexe } from "@/dataObject/ListCollection.ts";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
=======
import { col2, sexe } from "@/dataObject/ListCollection.ts";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useEffect } from "react";
>>>>>>> df33cf4e2b13700213eac49689724786ae9496d5

export const BankAccountForms = () => {
  const {
    register,
    control,
<<<<<<< HEAD
    formState: { errors },
  } = useFormContext();

=======
    watch,
    setValue,
  } = useFormContext();

  const [accountCount, setAccountCount] = useState(1);
  const [personCount, setPersonCount] = useState(0);

  // Surveiller le champ "Nombre de personnes en charge"
  const nombrePersonnesWatch = watch("nombre_personnes");

  // Effet pour mettre à jour le nombre de personnes quand la valeur change
  useEffect(() => {
    const nombre = parseInt(nombrePersonnesWatch) || 0;
    setPersonCount(nombre);

    // Réinitialiser les champs des personnes supprimées
    if (nombre < personCount) {
      for (let i = nombre; i < personCount; i++) {
        setValue(`personnes[${i}].nom`, "");
        setValue(`personnes[${i}].prenom`, "");
        setValue(`personnes[${i}].date_naissance`, "");
        setValue(`personnes[${i}].sexe`, "");
      }
    }
  }, [nombrePersonnesWatch, personCount, setValue]);

  const addAccount = () => {
    setAccountCount(prev => prev + 1);
  };

  const removeAccount = () => {
    if (accountCount > 1) {
      setAccountCount(prev => prev - 1);
    }
  };

  const renderAccountFields = (accountIndex: number) => (
      <Box key={accountIndex} width="100%" mb={6}>
        {accountIndex > 0 && (
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Compte bancaire {accountIndex + 1}
            </Text>
        )}

        <FormFieldSet label={accountIndex === 0 ? "Compte bancaire" : ""}>
          {/* Première ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <Controller
                  name={`accounts[${accountIndex}].type_compte`}
                  control={control}
                  rules={{ required: "Le type de compte est obligatoire" }}
                  render={({ field }) => (
                      <DropDownList
                          label={"Type de compte"}
                          collection={col2}
                          value={field.value}
                          onValueChange={field.onChange}
                      />
                  )}
              />
              <ErrorMessage
                  errors={errors}
                  name={`accounts[${accountIndex}].type_compte`}
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Devise"
                  placeholder="Devise"
                  {...register(`accounts[${accountIndex}].devise`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Motif ouverture"
                  placeholder="Motif ouverture"
                  {...register(`accounts[${accountIndex}].motif_ouverture`)}
              />
            </VStack>
          </HStack>

          {/* Deuxième ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Racine"
                  placeholder="Racine"
                  {...register(`accounts[${accountIndex}].racine`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Clé"
                  placeholder="Clé"
                  {...register(`accounts[${accountIndex}].cle`)}
              />
            </VStack>
          </HStack>

          {/* Troisième ligne */}
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Clé RIB"
                  placeholder="Clé RIB"
                  {...register(`accounts[${accountIndex}].cle_rib`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Convention de compte"
                  placeholder="Convention de compte"
                  {...register(`accounts[${accountIndex}].convention_compte`)}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Carton signature"
                  placeholder="Carton signature"
                  {...register(`accounts[${accountIndex}].carton_signature`)}
              />
            </VStack>
          </HStack>
        </FormFieldSet>
      </Box>
  );

  const renderPersonFields = (personIndex: number) => (
      <Box key={personIndex} width="100%" mb={6}>
        <Text fontSize="md" fontWeight="semibold" mb={3}>
          Personne en charge {personIndex + 1}
        </Text>

        <HStack width="100%" justifyContent="space-between" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
                label="Nom personne"
                placeholder="Nom personne"
                {...register(`personnes[${personIndex}].nom`, {
                  required: "Le nom est obligatoire"
                })}
            />
            <ErrorMessage
                errors={errors}
                name={`personnes[${personIndex}].nom`}
                render={({ message }) => (
                    <Text color="red.500" fontSize="sm">
                      {message}
                    </Text>
                )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1" mx={2}>
            <InputTextField
                label="Prénom personne"
                placeholder="Prénom personne"
                {...register(`personnes[${personIndex}].prenom`, {
                  required: "Le prénom est obligatoire"
                })}
            />
            <ErrorMessage
                errors={errors}
                name={`personnes[${personIndex}].prenom`}
                render={({ message }) => (
                    <Text color="red.500" fontSize="sm">
                      {message}
                    </Text>
                )}
            />
          </VStack>
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
                label="Date de naissance personne"
                placeholder="Date de naissance personne"
                {...register(`personnes[${personIndex}].date_naissance`, {
                  required: "La date de naissance est obligatoire"
                })}
            />
            <ErrorMessage
                errors={errors}
                name={`personnes[${personIndex}].date_naissance`}
                render={({ message }) => (
                    <Text color="red.500" fontSize="sm">
                      {message}
                    </Text>
                )}
            />
          </VStack>
        </HStack>

        <HStack width="100%" justifyContent="flex-start" mb={4}>
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
                name={`personnes[${personIndex}].sexe`}
                control={control}
                rules={{ required: "Le sexe est obligatoire" }}
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
                name={`personnes[${personIndex}].sexe`}
                render={({ message }) => (
                    <Text color="red.500" fontSize="sm">
                      {message}
                    </Text>
                )}
            />
          </VStack>
        </HStack>
      </Box>
  );

>>>>>>> df33cf4e2b13700213eac49689724786ae9496d5
  return (
    <>
      <FormFieldSet label="Identité">
        {/* Première ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Civilité */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="civilite"
              control={control}
              rules={{ required: "La civilité est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Civilité"
                  placeholder="Civilité"
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

          {/* Sexe */}
          <VStack align="flex-start" gap={1} flex="1">
            <Controller
              name="sexe"
              control={control}
              rules={{ required: "Le sexe est obligatoire" }}
              render={({ field }) => (
                <DropDownList
                  label="Sexe"
                  placeholder="Genre"
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

          {/* Prénom */}
          <VStack align="flex-start" gap={1} flex="1">
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
        </HStack>

<<<<<<< HEAD
        {/* Deuxième ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Nom */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom de famille"
              placeholder="Nom de famille"
              {...register("nom", { required: "Le nom est obligatoire" })}
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

          {/* Nationalité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de nationalité"
              placeholder="Pays de nationalité"
              {...register("paysNationalite")}
            />
          </VStack>
=======
        {/* Section Consentement et relation */}
        <FormFieldSet label="Consentement et relation">
          <HStack width="100%" justifyContent="space-between" mb={4}>
            <VStack align="flex-start" gap={1} flex="1">
              <InputTextField
                  label="Consentement crédit bureau"
                  placeholder="Consentement crédit bureau"
                  {...register("consentement_credit_bureau")}
              />
            </VStack>
            <VStack align="flex-start" gap={1} flex="1" mx={2}>
              <InputTextField
                  label="Nombre de personnes en charge"
                  placeholder="Nombre de personnes"
                  type="number"
                  min="0"
                  {...register("nombre_personnes", {
                    min: { value: 0, message: "Le nombre doit être positif" }
                  })}
              />
              <ErrorMessage
                  errors={errors}
                  name="nombre_personnes"
                  render={({ message }) => (
                      <Text color="red.500" fontSize="sm">
                        {message}
                      </Text>
                  )}
              />
            </VStack>
          </HStack>

          {/* Affichage conditionnel des personnes en charge */}
          {personCount > 0 && (
              <Box width="100%" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Personnes en charge ({personCount})
                </Text>
                {Array.from({ length: personCount }, (_, index) =>
                    renderPersonFields(index)
                )}
              </Box>
          )}
>>>>>>> df33cf4e2b13700213eac49689724786ae9496d5

          {/* Nom abrégé */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Nom abrégé"
              placeholder="Nom abrégé"
              {...register("nomAbrege")}
            />
          </VStack>
        </HStack>

        {/* Troisième ligne */}
        <HStack width="100%" justifyContent="space-between" mb={4}>
          {/* Double nationalité */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays de double nationalité"
              placeholder="Pays de double nationalité"
              {...register("doubleNationalite")}
            />
          </VStack>

          {/* Document d’identification */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Document d’identification"
              placeholder="Document d’identification"
              {...register("documentId")}
            />
          </VStack>

          {/* Pays d’émission */}
          <VStack align="flex-start" gap={1} flex="1">
            <InputTextField
              label="Pays d’émission du document"
              placeholder="Pays d’émission du document"
              {...register("paysEmission")}
            />
          </VStack>
        </HStack>

        {/* Date de délivrance */}
        <VStack align="flex-start" gap={1} flex="1">
          <InputTextField
            label="Date de délivrance"
            placeholder="Date de délivrance"
            {...register("dateDelivrance")}
          />
        </VStack>
      </FormFieldSet>
    </>
  );
};
