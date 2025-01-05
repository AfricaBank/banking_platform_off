import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface BoxIconInterface extends BoxProps {}

export const BoxIcon = React.forwardRef<HTMLDivElement, BoxIconInterface>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        {...props}
        width="20px"
        height="20px"
        bg="white"
        borderRadius="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginLeft="10px"
      >
        {children}
      </Box>
    );
  }
);
