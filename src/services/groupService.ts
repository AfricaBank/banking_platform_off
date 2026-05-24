import { GroupData } from "@/components/pageContents/pageContents.type.ts";
import { apiClient } from "./apiClient.ts";

export const groupService = {
  // READ ALL : Récupérer tous les groupes
  getAll: async (): Promise<GroupData[]> => {
    return apiClient("/groupes");
  },

  // CREATE : Ajouter un nouveau groupe
  create: async (group: Omit<GroupData, "id">): Promise<GroupData> => {
    return apiClient("/groupes", {
      method: "POST",
      body: JSON.stringify(group),
    });
  },

  // READ ONE : Récupérer les détails d'un groupe spécifique
  getById: async (id: string): Promise<GroupData> => {
    return apiClient(`/groupes/${id}`);
  },

  // UPDATE : Mettre à jour un groupe (Optionnel pour tes futurs écrans de modification)
  update: async (id: string, group: Partial<GroupData>): Promise<GroupData> => {
    return apiClient(`/groupes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(group),
    });
  },

  // DELETE : Supprimer un groupe par son identifiant
  delete: async (id: string): Promise<null> => {
    return apiClient(`/groupes/${id}`, {
      method: "DELETE",
    });
  },
};
