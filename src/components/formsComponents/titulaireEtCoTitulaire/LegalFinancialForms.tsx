import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "@/components/customFormFields/InputTextField";

export const LegalFinancialForms = () => {
  return (
    <>
      <FormFieldSet label="Capacité juridique et sécurité ">
        <InputTextField label="Type du tiers " placeholder="Type du tiers" />
        <InputTextField label="Date effet " placeholder="Date effet e" />
        <InputTextField
          label="Segment sécurité financièere "
          placeholder="Segment sécurité financièere "
        />
        <InputTextField label="Profil client  " placeholder="Profil client  " />
      </FormFieldSet>

      <FormFieldSet label="Activité professionnelle et économique   ">
        <InputTextField
          label="Catégorie socio-professionnelle  "
          placeholder="Catégorie socio-professionnelle e "
        />
        <InputTextField
          label="Secteur d’acitivié économique  "
          placeholder="Secteur d’acitivié économique  "
        />
        <InputTextField
          label="Activité à risque "
          placeholder="Activité à risque "
        />
        <InputTextField
          label="Description activité "
          placeholder="Description activité "
        />
        <InputTextField
          label="Date de création de l’activité  "
          placeholder="Date de création de l’activité  "
        />
        <InputTextField
          label="Pays d’activité "
          placeholder="Pays d’activité  "
        />
        <InputTextField
          label="Pourcentge de l’activité  "
          placeholder="Pourcentge de l’activité "
        />
        <InputTextField
          label="Cumilé des pourcentages d’activités  "
          placeholder="Cumilé des pourcentages d’activités "
        />
        <InputTextField
          label="Commentaire activités "
          placeholder="Commentaire activités "
        />
      </FormFieldSet>
      <FormFieldSet label="Employeur et revenu">
        <InputTextField
          label="Nom de l’employeur  "
          placeholder="Nom de l’employeur "
        />
        <InputTextField
          label="Domiciliation salaire "
          placeholder="Domiciliation salaire "
        />
        <InputTextField label="Depuis quand " placeholder="Depuis quand " />
      </FormFieldSet>
    </>
  );
};
