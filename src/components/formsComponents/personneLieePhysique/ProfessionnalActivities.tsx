import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const ProfessionnalActivities = () => {
  return (
    <>
      <FormFieldSet label="Catégories spécifiques ">
        <InputTextField
          label="Catégorie clientèle"
          placeholder="Catégorie clientèle"
        />
        <InputTextField
          label="Catégorie socio-professionnelle  "
          placeholder="Catégorie socio-professionnelle "
        />
        <InputTextField
          label="Connaissance des informaatio internr "
          placeholder="Connaissance des informaatio internr "
        />
        <InputTextField
          label="Dirigeant BE dans une socièté cotée "
          placeholder="Dirigeant BE dans une socièté cotée "
        />
        <InputTextField
          label=" BE dans une socièté cotée "
          placeholder=" BE dans une socièté cotée "
        />
        <InputTextField
          label="Detention compte titre  "
          placeholder="Detention compte titre "
        />
        <InputTextField label="Délégation KYC " placeholder="Délégation KYC " />
        <InputTextField
          label="Présence de flux international  "
          placeholder="Présence de flux international "
        />
      </FormFieldSet>
      <FormFieldSet label="Activité économique ">
        <InputTextField
          label="Secteur d’activité économique"
          placeholder="Secteur d’activité économique"
        />
        <InputTextField label="Libellé APE" placeholder="Libellé APE" />
        <InputTextField
          label="Date de création de l’activité "
          placeholder="Date de création de l’activité "
        />
        <InputTextField
          label="Principale pays d’activité "
          placeholder="Principale pays d’activité "
        />
        <InputTextField
          label="Activité à risque "
          placeholder="Activité à risque "
        />
        <InputTextField
          label="Indicateur privé professionnel "
          placeholder="Indicateur privé professionnel "
        />
        <InputTextField
          label="Avoirs controlés "
          placeholder="Avoirs controlés "
        />
      </FormFieldSet>
      <FormFieldSet label="Code sectoriel ">
        <InputTextField label="Libellé " placeholder="Libellé " />
        <InputTextField label="Pourcentage  " placeholder="Pourcentage  " />
      </FormFieldSet>
    </>
  );
};
