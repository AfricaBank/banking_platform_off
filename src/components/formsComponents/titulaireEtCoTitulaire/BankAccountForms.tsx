import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const BankAccountForms = () => {
  return (
    <>
      <FormFieldSet label="Compte bancaire ">
        <InputTextField label="Type de compte " placeholder="Type de compte " />
        <InputTextField label="Devise" placeholder="Devise" />
        <InputTextField
          label="Motif ouverture "
          placeholder="Motif ouverture "
        />
        <InputTextField label="Adresse email" placeholder="Adresse email " />
        <InputTextField label="Racine " placeholder="Racine" />
        <InputTextField label="Clé" placeholder="Clé" />
        <InputTextField label="Clé RIB" placeholder="Clé RIB" />
        <InputTextField
          label="Convention de compte  "
          placeholder="Convention de compte "
        />
        <InputTextField
          label="Carton signature  "
          placeholder="Carton signature "
        />
      </FormFieldSet>

      <FormFieldSet label="Concentement et relation  ">
        <InputTextField
          label="Concentement crédit bureau  "
          placeholder="Concentement crédit bureau  "
        />
        <InputTextField
          label="Nombre de personnes"
          placeholder="Nombre de personnes"
        />
        <InputTextField label="Nom personne " placeholder="Nom personne " />
        <InputTextField
          label="Prénom personne  "
          placeholder="Prénom personne  "
        />
        <InputTextField
          label="Date de naissance personne "
          placeholder="Date de naissance personne "
        />
        <InputTextField label="Sexe" placeholder="Sexe" />
        <InputTextField
          label="Commentaire de la relation"
          placeholder="Commentaire de la relation "
        />
      </FormFieldSet>
    </>
  );
};
