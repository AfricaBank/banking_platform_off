import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StepperBoxProps extends BoxProps {
  children?: ReactNode;
}

export const StepperBox: React.FC<StepperBoxProps> = ({ children }) => {
  return (
    <Box
      p={4}
      borderRadius="md"
      boxShadow="sm"
      height="100%"
      width="17%"
      backgroundColor="primary.dogerBlue.400"
    >
      {children}
    </Box>
  );
};
