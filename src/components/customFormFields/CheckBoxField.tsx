import React from "react";
import { Checkbox, CheckboxProps } from "../ui/checkbox";

interface CheckBoxFieldInterface extends CheckboxProps {}

export const CheckBoxField = React.forwardRef<
  HTMLInputElement,
  CheckBoxFieldInterface
>(({ children, ...props }, ref) => {
  return (
    <Checkbox ref={ref} {...props}>
      {children}
    </Checkbox>
  );
});
