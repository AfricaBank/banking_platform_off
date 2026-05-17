import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  subtitle?: string;
  submitLabel?: string; // Ex: "Enregistrer" ou "Créer l'agent"
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const FormContainer = ({
  children,
  subtitle = "Saisir les informations obligatoires",
  submitLabel = "Enregistrer",
  onSave,
  onCancel,
  isSaving = false,
}: FormContainerProps) => {
  return (
    <Box
      w="full"
      bg="white"
      p={6}
      rounded="lg"
      boxShadow="0 1px 10px rgba(0,0,0,0.15)"
    >
      <VStack align="stretch" gap={6}>
        {/* Sous-titre indicatif global */}
        <Text color="gray.400" fontSize="xs" fontWeight="medium">
          {subtitle}
        </Text>

        {/* Emplacement des différentes sections de formulaires */}
        <VStack align="stretch" gap={8} w="full">
          {children}
        </VStack>

        {/* Barre d'actions */}
        <Flex gap={4} justify="center" mt={4}>
          <Button
            bg="dogerBlue.500"
            color="white"
            px={8}
            rounded="md"
            fontWeight="medium"
            fontSize="sm"
            onClick={onSave}
            loading={isSaving}
            _hover={{ bg: "dogerBlue.600" }}
          >
            {submitLabel}
          </Button>

          <Button
            variant="outline"
            borderColor="errorRed.400"
            color="errorRed.400"
            px={8}
            rounded="md"
            fontWeight="medium"
            fontSize="sm"
            onClick={onCancel}
            _hover={{ bg: "errorRed.50" }}
          >
            Annuler
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
