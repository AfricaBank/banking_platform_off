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
      <><Text color="#6E7C7C">{label}</Text><Input
          ref={ref}
          {...props}
          rounded="7px"
          bg="white"
          width="90%"
          _placeholder={{opacity: 0.2}}/></>
  );
});
