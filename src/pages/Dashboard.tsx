import { SimpleButton } from "@/components/customButtons/SimpleButton";
import { SimpleIconButton } from "@/components/customButtons/SimpleIconButton";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { CheckBoxField } from "@/components/customFormFields/CheckBoxField";

export const Dashboard = () => {
  return (
    <>
      <div>je suis dashboard</div>
      <SimpleButton colorScheme="red">Click me</SimpleButton>
      <div>
        <SimpleIconButton>Icon</SimpleIconButton>
        <InputTextField />
        <CheckBoxField>je suis chec </CheckBoxField>
      </div>
    </>
  );
};
