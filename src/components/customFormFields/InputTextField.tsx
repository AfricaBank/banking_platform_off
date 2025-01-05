import React from "react";
import { Input, InputProps } from "@chakra-ui/react";

interface inputInterface extends InputProps {}

export const InputTextField = React.forwardRef<
  HTMLInputElement,
  inputInterface
>(({ ...props }, ref) => {
  return <Input ref={ref} {...props} />;
});
