import { Box, Text } from "@chakra-ui/react";

interface FormFieldSetProps {
  label: string;
  children: React.ReactNode;
}

export const FormFieldSet: React.FC<FormFieldSetProps> = ({
  label,
  children,
}) => {
  return (
    <>
      <Box
        color="black"
        width="100%"
        p={3}
        borderRadius="10px"
        bg="#FCFCFF"
        mb="15px"
      >
        <Box mb="12px">
          <Text>{label}</Text>
        </Box>
        <Box gap="6" display="flex" flexWrap="wrap" mb="15px">
          {children}
        </Box>
      </Box>
    </>
  );
};
