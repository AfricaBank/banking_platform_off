import { RoleData } from "@/components/pageContents/pageContents.type.ts";
import { apiClient } from "./apiClient.ts";

export const roleService = {
  // READ ALL : Récupérer tous les rôles
  getAll: async (): Promise<RoleData[]> => {
    return apiClient("/roles");
  },

  // CREATE : Ajouter un nouveau rôle
  create: async (role: Omit<RoleData, "id">): Promise<RoleData> => {
    return apiClient("/roles", {
      method: "POST",
      body: JSON.stringify(role),
    });
  },

  // READ ONE : Récupérer les détails d'un rôle spécifique
  getById: async (id: string): Promise<RoleData> => {
    return apiClient(`/roles/${id}`);
  },

  // UPDATE : Modifier un rôle (Pratique pour basculer le statut Activé/Désactivé)
  update: async (id: string, role: Partial<RoleData>): Promise<RoleData> => {
    return apiClient(`/roles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(role),
    });
  },

  // DELETE : Supprimer un rôle par son identifiant
  delete: async (id: string): Promise<null> => {
    return apiClient(`/roles/${id}`, {
      method: "DELETE",
    });
  },
};
