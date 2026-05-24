import { TaskData } from "@/components/pageContents/pageContents.type.ts";
import { apiClient } from "./apiClient.ts";

export const tacheActiveService = {
  // READ ALL : Récupérer la liste de toutes les tâches actives pour le tableau de bord
  getAll: async (): Promise<TaskData[]> => {
    return apiClient("/taches");
  },

  // READ ONE : Récupérer une tâche active spécifique si besoin de l'analyser isolément
  getById: async (id: string): Promise<TaskData> => {
    return apiClient(`/taches/${id}`);
  },
};
