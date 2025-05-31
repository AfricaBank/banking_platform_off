import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const PersonalInformations = () => {
  return (
    <>
      <FormFieldSet label="Naissance ">
        <InputTextField
          label="Date de naissance  "
          placeholder="Date de naissance   "
        />
        <InputTextField
          label="Pays de naissance "
          placeholder="Pays de naissance  "
        />
        <InputTextField
          label="Lieu de naissance  "
          placeholder="Lieu de naissance   "
        />
        <InputTextField
          label="Prénom du père  "
          placeholder="Prénom du père   "
        />
        <InputTextField
          label="Prénom de la mère  "
          placeholder="Prénom de la mère   "
        />
        <InputTextField
          label="Nom du jeune fille de la mère "
          placeholder="Nom du jeune fille de la mère  "
        />
        <InputTextField
          label="Naissance présumé"
          placeholder="Naissance présumé "
        />
      </FormFieldSet>
      <FormFieldSet label="Situation de famille ">
        <InputTextField
          label="Situation familliale"
          placeholder="Situation familliale "
        />
        <InputTextField
          label="Adresse fiscale"
          placeholder="Adresse fiscale "
        />
        <InputTextField label="Code postal" placeholder="Code postal " />
      </FormFieldSet>
      <FormFieldSet label="Contact et adresse">
        <InputTextField
          label="Numéro de téléphone "
          placeholder="Numéro de téléphone  "
        />
        <InputTextField
          label="Regime matrimoniale"
          placeholder="Regime matrimoniale "
        />
        <InputTextField label="Nom marital " placeholder="Nom marital" />
        <InputTextField label="Localité" placeholder="Localité " />
        <InputTextField label="Pays" placeholder="Pays " />
        <InputTextField
          label="Statut de résidence "
          placeholder="Statut de résidence  "
        />
        <InputTextField label="Wilaya" placeholder="Wilaya " />
        <InputTextField label="Commune" placeholder="Commune " />
      </FormFieldSet>
    </>
  );
};
