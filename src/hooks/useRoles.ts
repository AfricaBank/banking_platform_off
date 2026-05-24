import { useState, useEffect, useCallback } from "react";
import { roleService } from "@/services/roleService";
import { RoleData } from "@/components/pageContents/pageContents.type.ts";

export const useRoles = () => {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // READ ALL : Charger les rôles existants
  const fetchRoles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await roleService.getAll();
      setRoles(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Une erreur inattendue est survenue lors du chargement des rôles.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // CREATE : Ajouter un nouveau rôle sur le serveur JSON Server
  const createRole = async (
    formData: { libelle: string; description: string; permissions: string },
    onSuccess?: () => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Préparation de l'objet conforme au modèle attendu par db.json
      // JSON Server génère l'identifiant "id" automatiquement s'il est omis
      const payload: Omit<RoleData, "id"> = {
        libelle: formData.libelle,
        description: formData.description,
        statut: "Activé", // Initialisation automatique à l'état actif
      };

      // Si le service accepte l'extension des permissions, on peut passer l'objet complet
      await roleService.create(payload);

      // Exécution du callback de succès (redirection ou notification)
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Impossible de créer le rôle. Veuillez réessayer ultérieurement.",
        );
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    roles,
    isLoading,
    isSubmitting,
    error,
    refreshRoles: fetchRoles,
    createRole,
  };
};
