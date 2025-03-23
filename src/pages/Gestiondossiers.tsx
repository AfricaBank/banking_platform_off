import { Text } from "@chakra-ui/react";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { CalendarField } from "@/components/customFormFields/CalendarField";

export const Gestiondossiers = () => {
  return (
    <>
      <Text>je suis gestion des dossiers </Text>
      <InputTextField label="nom d'utilisateur" />
    </>
  );
};
