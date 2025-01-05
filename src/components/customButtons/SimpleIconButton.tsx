import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

interface SimpleIconButtonInterface extends IconButtonProps {}

export const SimpleIconButton = React.forwardRef<
  HTMLButtonElement,
  SimpleIconButtonInterface
>(({ ...props }, ref) => {
  return <IconButton ref={ref} {...props}></IconButton>;
});
