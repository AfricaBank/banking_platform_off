import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const Civility = () => {
  return (
    <>
      <FormFieldSet label="Identitié">
        <InputTextField label="Civilité" placeholder="Civilité " />
        <InputTextField label="Sexe" placeholder="Sexe" />
        <InputTextField label="Prénom" placeholder="Prénom" />
        <InputTextField
          label="Nom de famille  "
          placeholder="Nom de famille  "
        />
        <InputTextField
          label="Pays de nationalité  "
          placeholder="Pays de nationalité  "
        />
        <InputTextField label="Nom abrégé " placeholder="Nom abrégé " />
        <InputTextField
          label="Pays de double nationalité "
          placeholder="Pays de double nationalité "
        />
        <InputTextField label="NIN" placeholder="NIN" />
        <InputTextField
          label="Document d’identification"
          placeholder="Document d’identification"
        />
        <InputTextField
          label="Pays d’émission du document "
          placeholder="Pays d’émission du document "
        />
        <InputTextField
          label="Date de délivrance "
          placeholder="Date de délivrance "
        />
      </FormFieldSet>
    </>
  );
};
