import { Button, ButtonProps } from "../ui/button";
import React from "react";

interface SimpleButtonInterface extends ButtonProps {}

export const SimpleButton = React.forwardRef<
  HTMLButtonElement,
  SimpleButtonInterface
>(({ children, ...props }, ref) => {
  return (
    <Button ref={ref} {...props} rounded="6%">
      {children}
    </Button>
  );
});
