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
    <Box width="30%">
      <Text color="#6E7C7C">{label}</Text>
      <Input
        ref={ref}
        {...props}
        rounded="7px"
        bg="white"
        width="100%"
        _placeholder={{ opacity: 0.2 }}
      />
    </Box>
  );
});
