import { FormFieldSet } from "../FormFieldSet";
import { InputTextField } from "../../customFormFields/InputTextField";

export const OriginEER = () => {
  return (
    <>
      <FormFieldSet label="Origine EER">
        <InputTextField
          label="Catégorie clientèle "
          placeholder="Catégorie clientèle  "
        />
        <InputTextField label="Date EER" placeholder="Date EER " />
        <InputTextField label="Modalité " placeholder="Modalité  " />
        <InputTextField label="Motif EER " placeholder="Motif EER  " />
      </FormFieldSet>
    </>
  );
};
