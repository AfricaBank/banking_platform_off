import { Flex, Badge, IconButton } from "@chakra-ui/react";
import { LuEye, LuLock } from "react-icons/lu";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { ColumnConfig } from "@/components/pageContents/GenericTable.tsx";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";

interface ColumnsConfigProps {
  onViewAgent: (agent: AgentData) => void;
  onToggleStatus: (agent: AgentData) => void;
}

export const getAgentColumns = ({
  onViewAgent,
  onToggleStatus,
}: ColumnsConfigProps): ColumnConfig<AgentData>[] => [
  { header: "Matricule", key: "matricule" },
  { header: "Nom complet", key: "nomComplet" },
  { header: "Email", key: "email" },
  { header: "Agence", key: "agence" },
  {
    header: "Statut",
    key: "statut",
    render: (item) => {
      const isActive = item.statut === "Actif";
      return (
        <Badge
          variant="outline"
          colorScheme={isActive ? "teal" : "red"}
          borderRadius="full"
          px={4}
          py={0.5}
          bg="white"
          fontSize="xs"
          fontWeight="bold"
          textTransform="none"
        >
          {isActive ? "Activé" : "Désactivé"}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    key: "actions",
    render: (item) => {
      const isActive = item.statut === "Actif";
      return (
        <Flex gap={3} justify="center" align="center">
          <IconButton
            rounded="8px"
            aria-label="Voir l'agent"
            size="xs"
            bg="dogerBlue.500"
            color="white"
            boxShadow="sm"
            onClick={() => onViewAgent(item)}
          >
            <LuEye size={14} />
          </IconButton>

          <IconButton
            rounded="8px"
            aria-label={isActive ? "Désactiver l'agent" : "Activer l'agent"}
            size="xs"
            bg="white"
            color="gray.400"
            borderWidth="1px"
            borderColor="gray.100"
            boxShadow="sm"
            _hover={{ bg: "gray.50", color: "gray.600" }}
            onClick={() => onToggleStatus(item)}
          >
            {isActive ? <LuLock size={14} /> : <FaUnlockKeyhole size={14} />}
          </IconButton>
        </Flex>
      );
    },
  },
];
