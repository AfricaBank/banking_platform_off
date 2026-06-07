import React from "react";
import { Input, InputProps, Text, Box } from "@chakra-ui/react";

interface inputInterface extends InputProps {
  label: string;
}

export const InputTextField = React.forwardRef<
  HTMLInputElement,
  inputInterface
>(({ label, ...props }, ref) => {
  return (
    <Box width="100%">
      <Text color="#6E7C7C" fontSize="sm" mb={2} fontWeight="medium">
        {label}
      </Text>
      <Input
        ref={ref}
        rounded="7px"
        bg="white"
        width="100%"
        _placeholder={{ opacity: 0.4 }}
        
        // CORRECTION VISUELLE : Styles appliqués lorsque le champ est désactivé
        _disabled={{
          bg: "gray.100",          // Fond grisé pour marquer le blocage
          borderColor: "gray.300",  // Bordure adoucie
          color: "gray.500",        // Texte légèrement estompé
          cursor: "not-allowed",    // Curseur de souris "interdit"
          opacity: 0.8,
        }}

        // OPTIONNEL : Styles appliqués si tu préfères utiliser isReadOnly
        _readOnly={{
          bg: "gray.50",
          borderColor: "gray.200",
          cursor: "default",
        }}

        // Toutes les props (y compris isDisabled, isReadOnly, value, onChange) sont injectées ici
        {...props}
      />
    </Box>
  );
});

InputTextField.displayName = "InputTextField";