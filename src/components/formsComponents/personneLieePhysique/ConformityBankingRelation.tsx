import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const ConformityBankingRelation = () => {
  return (
    <>
      <FormFieldSet label="Conformité ">
        <InputTextField label="Detéction PPE " placeholder="Detéction PPE  " />
        <InputTextField label="Type de PPE " placeholder="Type de PPE  " />
        <InputTextField label="Commentaire" placeholder="Commentaire " />
        <InputTextField label="PPE local " placeholder="PPE local  " />
        <InputTextField label="Sous sanction " placeholder="Sous sanction  " />
        <InputTextField
          label="Date d’identification "
          placeholder="Date d’identification  "
        />
        <InputTextField
          label="Date d’interrogation vigilance  "
          placeholder="Date d’interrogation vigilance   "
        />
      </FormFieldSet>
      <FormFieldSet label="Relation bancaire  ">
        <InputTextField label="ID Nationale" placeholder="ID Nationale " />
        <InputTextField label="Code siège " placeholder="Code siège  " />
        <InputTextField label="Code racine " placeholder="Code racine  " />
        <InputTextField
          label="Segment clientéle vis-à-vis DG "
          placeholder="Segment clientéle vis-à-vis DG  "
        />
      </FormFieldSet>
      <FormFieldSet label="Enfants et personnes à charge  ">
        <InputTextField
          label="Enfants et personnes à charge "
          placeholder="Enfants et personnes à charge  "
        />
      </FormFieldSet>
    </>
  );
};
