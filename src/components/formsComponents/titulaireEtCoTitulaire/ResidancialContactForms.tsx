import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";

export const ResidancialContactForms = () => {
  return (
    <>
      <FormFieldSet label="Adresse et contact">
        <InputTextField label="Code postale  " placeholder="Code postale " />
        <InputTextField label="Localité " placeholder="Localité " />
        <InputTextField label="Domicile " placeholder="Domicile" />
        <InputTextField
          label="Situation logement"
          placeholder="Situation logement "
        />
      </FormFieldSet>

      <FormFieldSet label="Contact et email">
        <InputTextField label="Mobile " placeholder="Mobile" />
        <InputTextField label="Adresse email " placeholder="Adresse email " />
      </FormFieldSet>
      <FormFieldSet label="Statut de résidence ">
        <InputTextField
          label="Pays d’adresse fiscale"
          placeholder="Pays d’adresse fiscale"
        />
        <InputTextField
          label="Statut résidence "
          placeholder="Statut résidence"
        />
        <InputTextField
          label="Date d’entrée territoire "
          placeholder="Date d’entrée territoire "
        />
      </FormFieldSet>
    </>
  );
};
