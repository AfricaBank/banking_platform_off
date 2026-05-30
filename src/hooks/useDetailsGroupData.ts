import { useEffect, useMemo } from "react";
import { useGroupes } from "@/hooks/useGroupes";
import { useAgents } from "@/hooks/useAgents";

export const useDetailsGroupData = (id: string | undefined) => {
  const {
    groupeSelectionne,
    fetchGroupeById,
    isLoading: isGroupLoading,
    error: groupError,
  } = useGroupes();

  const {
    agents,
    isLoading: isAgentsLoading,
    error: agentsError,
  } = useAgents();

  useEffect(() => {
    if (id) {
      fetchGroupeById(id);
    }
  }, [id, fetchGroupeById]);

  const agentsDuGroupe = useMemo(() => {
    if (!groupeSelectionne || !agents) return [];
    return agents.filter((agent) => agent.agence === groupeSelectionne.agence);
  }, [agents, groupeSelectionne]);

  const isLoading = isGroupLoading || isAgentsLoading;
  const error = groupError || agentsError;

  return {
    groupeSelectionne,
    agentsDuGroupe,
    isLoading,
    error,
  };
};
