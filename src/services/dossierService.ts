import { DossierData } from "@/components/pageContents/pageContents.type.ts";
import { apiClient } from "./apiClient.ts";

export const dossierService = {
  // READ ALL : Récupérer tous les dossiers
  getAll: async (): Promise<DossierData[]> => {
    return apiClient("/dossiers");
  },

  // CREATE : Créer un nouveau dossier d'entrée en relation ou de modification
  create: async (dossier: Omit<DossierData, "id">): Promise<DossierData> => {
    return apiClient("/dossiers", {
      method: "POST",
      body: JSON.stringify(dossier),
    });
  },

  // READ ONE : Consulter un dossier spécifique par son ID technique
  getById: async (id: string): Promise<DossierData> => {
    return apiClient(`/dossiers/${id}`);
  },

  // UPDATE : Mettre à jour les informations ou le statut d'un dossier
  update: async (
    id: string,
    dossier: Partial<DossierData>,
  ): Promise<DossierData> => {
    return apiClient(`/dossiers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dossier),
    });
  },

  // DELETE : Supprimer un dossier de la base
  delete: async (id: string): Promise<null> => {
    return apiClient(`/dossiers/${id}`, {
      method: "DELETE",
    });
  },
};
