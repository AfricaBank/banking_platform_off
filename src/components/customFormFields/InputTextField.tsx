import React from "react";
import { Input, InputProps, Text } from "@chakra-ui/react";

interface inputInterface extends InputProps {
  label: string;
}

export const InputTextField = React.forwardRef<
  HTMLInputElement,
  inputInterface
>(({ label, ...props }, ref) => {
  return (
    <>
      <Text>{label}</Text>
      <Input ref={ref} {...props} rounded="7px" />
    </>
  );
});
