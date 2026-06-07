"use client";

import React, { useState } from "react";
import { Button, Flex, Heading, Text, Center } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "@chakra-ui/react"; // Remplacé par les imports officiels v3
import { LuX, LuCheck  } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Suppression",
  description = "Êtes-vous sûr de vouloir effectuer cette action ? C'est irréversible.",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(details) => !details.open && onClose()}
      placement="center" // Centrage natif géré par le positioner en v3
      motionPreset="slide-in-bottom"
    >
      {/* Arrière-plan flouté */}
      <DialogBackdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />
      
      <DialogPositioner>
        <DialogContent
          borderRadius="2xl"
          p={6}
          maxWidth="450px"
          w="90%"
          bg="white"
          boxShadow="lg"
          position="relative"
        >
          {/* Trigger de fermeture (croix en haut à droite) */}
          <DialogCloseTrigger 
            position="absolute"
            top="4"
            right="4"
            color="gray.400"
            _hover={{ color: "gray.600" }}
          />

          <DialogBody p={0} mt={2} textAlign="center">
            {/* Cercle d'avertissement rouge/orangé de la maquette */}
            <Center mb={4}>
              <Flex
                align="center"
                justify="center"
                w="64px"
                h="64px"
                bg="red.50"
                borderRadius="full"
                color="red.400"
              >
                <FiAlertTriangle  size={30} />
              </Flex>
            </Center>

            {/* Titre & Description */}
            <Heading size="md" mb={2} color="gray.800" fontWeight="bold">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={6} lineHeight="tall">
              {description}
            </Text>

            {/* Actions : Annuler & Confirmer */}
            <Flex gap={4} justify="center" w="100%">
              <Button
                onClick={onClose}
                variant="outline"
                borderColor="red.300"
                color="red.500"
                borderRadius="lg"
                h="44px"
                flex={1}
                disabled={isSubmitting}
                _hover={{ bg: "red.50" }}
              >
                <Flex align="center" justify="center" gap={2}>
                  <LuX size={16} />
                  Annuler
                </Flex>
              </Button>

              <Button
                onClick={handleConfirm}
                bg="blue.500"
                color="white"
                borderRadius="lg"
                h="44px"
                flex={1}
                loading={isSubmitting} // Propriété v3 (isLoading devient loading)
                _hover={{ bg: "blue.600" }}
              >
                <Flex align="center" justify="center" gap={2}>
                  <LuCheck size={16} />
                  Confirmer
                </Flex>
              </Button>
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};