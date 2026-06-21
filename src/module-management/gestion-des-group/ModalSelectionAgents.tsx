"use client";

import { useEffect, useState } from "react";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  Button,
  VStack,
  Text,
  Spinner,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { CloseButton } from "@/components/ui/close-button";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";

interface ModalSelectionAgentsProps {
  isOpen: boolean;
  onClose: () => void;
  nomGroupeCourant: string;
  onConfirm: (selectedAgentIds: string[]) => Promise<void>;
}

export const ModalSelectionAgents = ({
  isOpen,
  onClose,
  nomGroupeCourant,
  onConfirm,
}: ModalSelectionAgentsProps) => {
  const [agentsEligibles, setAgentsEligibles] = useState<AgentData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAllAgents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/agents");
        if (!response.ok) throw new Error("Erreur lors de la récupération des agents");
        
        const allAgents: AgentData[] = await response.json();

        // Filtrer les agents qui ne sont pas encore dans ce groupe
        const filtrés = allAgents.filter(
          (agent) => agent.groupe !== nomGroupeCourant
        );
        
        setAgentsEligibles(filtrés);
        setSelectedIds([]); 
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAgents();
  }, [isOpen, nomGroupeCourant]);

  const handleToggleAgent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);
    try {
      await onConfirm(selectedIds);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(details) => !details.open && onClose()}
      placement="center"
    >
      {/* L'overlay de fond sombre et flouté */}
      <DialogBackdrop />

      {/* AJOUT DE DIALOGPOSITIONER : C'est ce composant qui force le centrage exact dans la fenêtre */}
      <DialogPositioner>
        <DialogContent 
          borderRadius="xl" 
          boxShadow="2xl"
          bg="white"
          p={2}
          width="100%"
          maxW="md"
        >
          <DialogHeader>
            <DialogTitle fontSize="md" color="gray.700" fontWeight="bold">
              Sélectionner les agents à ajouter
            </DialogTitle>
            <DialogCloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top="4" right="4" />
            </DialogCloseTrigger>
          </DialogHeader>
          
          <DialogBody maxH="300px" overflowY="auto" px={6} py={2}>
            {isLoading ? (
              <Center p={6}>
                <Spinner size="md" color="blue.500" />
              </Center>
            ) : agentsEligibles.length === 0 ? (
              <Text fontSize="sm" color="gray.500" textAlign="center" py={6}>
                Tous les agents disponibles sont déjà affectés à ce groupe.
              </Text>
            ) : (
              <VStack align="stretch" gap={3}>
                {agentsEligibles.map((agent) => (
                  <Flex
                    key={agent.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    align="center"
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                    onClick={() => handleToggleAgent(agent.id)}
                  >
                    <Checkbox
                      checked={selectedIds.includes(agent.id)}
                      onCheckedChange={() => handleToggleAgent(agent.id)}
                      colorPalette="blue"
                    />
                    <Box ml={3}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        {agent.nomComplet}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Matricule : {agent.matricule} | {agent.email}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            )}
          </DialogBody>

          <DialogFooter gap={3} px={6} py={4}>
            <Button 
              variant="outline" 
              borderColor="gray.300"
              color="gray.600"
              size="sm" 
              borderRadius="md"
              onClick={onClose} 
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              color="white"
              size="sm"
              borderRadius="md"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={selectedIds.length === 0}
            >
              Ajouter ({selectedIds.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};