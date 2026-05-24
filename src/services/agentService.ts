import { AgentData } from "@/components/pageContents/pageContents.type.ts";
import { apiClient } from "./apiClient.ts";

export const agentService = {
  // READ ALL : Récupérer tous les agents
  getAll: async (): Promise<AgentData[]> => {
    return apiClient("/agents");
  },

  // CREATE : Ajouter un nouvel agent
  create: async (agent: Omit<AgentData, "id">): Promise<AgentData> => {
    return apiClient("/agents", {
      method: "POST",
      body: JSON.stringify(agent),
    });
  },

  // READ ONE : Récupérer les détails d'un agent spécifique
  getById: async (id: string): Promise<AgentData> => {
    return apiClient(`/agents/${id}`);
  },

  // DELETE : Supprimer un agent par son identifiant
  delete: async (id: string): Promise<null> => {
    return apiClient(`/agents/${id}`, {
      method: "DELETE",
    });
  },
};
