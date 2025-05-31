import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";

export const UserIdentificationForms = () => {
  return (
    <>
      <FormFieldSet label="Informations personnelles">
        <InputTextField label="Type du tiers " placeholder="Type du tiers" />
        <InputTextField
          label="Catégorie clientèle "
          placeholder="Catégorie clientèle"
        />
        <InputTextField
          label="Matricule de l'agent"
          placeholder="Matricule de l'agent"
        />
        <InputTextField label="Nom de famille " placeholder="Nom de famille " />
        <InputTextField label="Prénom" placeholder="Prénom" />
        <InputTextField label="Nom abrégé" placeholder="Nom abrégé" />
        <InputTextField label="Civilité " placeholder="Civilité" />
        <InputTextField label="Sexe" placeholder="Sexe" />
        <CustomDatePicker nomDuChamp="Date de nissance/" />
        <InputTextField
          label="Lieu de nqissqnce"
          placeholder="Lieu de naissance"
        />
        <InputTextField
          label="Pays de naissance "
          placeholder="Pays de naissance"
        />
        <InputTextField
          label="Numéro d'identification fiscale"
          placeholder="Numéro d'identification fiscalee"
        />
        <InputTextField
          label="Pays de nationalité"
          placeholder="Pays de nationalité"
        />
        <InputTextField
          label="Pays de double nationalité"
          placeholder="Pays de double nationalité"
        />
      </FormFieldSet>
      <FormFieldSet label="Informations famillilaes et personnelles ">
        <InputTextField
          label="Situation de famille "
          placeholder="Situation de famille "
        />
        <InputTextField
          label="Régime matrimoniale "
          placeholder="Régime matrimoniale "
        />
        <InputTextField label="Nom marital" placeholder="Nom marital" />
        <InputTextField label="Prénom du père " placeholder="Prénom du père " />
        <InputTextField
          label="Prénom de la mère "
          placeholder="Prénom de la mère "
        />
        <InputTextField
          label="Nom de la jeune fille "
          placeholder="Nom de la jeune fille "
        />
        <InputTextField
          label="Nombre d’enfants en charge "
          placeholder="Nombre d’enfants en charge "
        />
        <InputTextField
          label="Nom de l’enfant "
          placeholder="Nom de l’enfant "
        />
        <InputTextField
          label="Prénom de l’enfant "
          placeholder="Prénom de l’enfant "
        />
        <InputTextField
          label="Date de naissance "
          placeholder="Date de naissance "
        />
        <InputTextField
          label="Sexe de l’enfant "
          placeholder="Sexe de l’enfant "
        />
      </FormFieldSet>
      <FormFieldSet label="Informations légales ">
        <InputTextField
          label="Numéro d’immatriculation "
          placeholder="Numéro d’immatriculation "
        />
        <InputTextField
          label="Numéro d’acte de naissance "
          placeholder="Numéro d’acte de naissance "
        />
        <InputTextField
          label="Pays d’immatriculation "
          placeholder="Pays d’immatriculation "
        />
        <InputTextField label="Date d’EER" placeholder="Date d’EER" />
        <InputTextField label="Motif de l’EER " placeholder="Motif de l’EER " />
        <InputTextField
          label="Modalité de l’EER "
          placeholder="Modalité de l’EER "
        />
        <InputTextField
          label="Pays de réalisation KYC "
          placeholder="Pays de réalisation KYC "
        />
      </FormFieldSet>
    </>
  );
};
