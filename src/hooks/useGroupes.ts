import { useState, useEffect, useCallback } from "react";
import { groupService } from "@/services/groupService";
import { GroupData } from "@/components/pageContents/pageContents.type.ts";

export const useGroupes = () => {
  const [groupes, setGroupes] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Lecture de tous les groupes
  const fetchGroupes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await groupService.getAll();
      setGroupes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Une erreur inattendue est survenue lors du chargement des groupes.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroupes();
  }, [fetchGroupes]);

  // Opération d'ajout d'un nouveau groupe
  const createGroupe = async (
    formData: { agence: string; nomGroupe: string; description: string },
    onSuccess?: () => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Préparation de l'objet complet conforme aux attentes de la base
      // On génère un identifiant textuel unique basé sur le timestamp pour le mock
      const payload: Omit<GroupData, "id"> = {
        identifiant: `GRP-${Date.now().toString().slice(-4)}`,
        nomGroupe: formData.nomGroupe,
        description: formData.description,
        agence: formData.agence,
        effectifs: 0, // Un nouveau groupe commence sans agents assignés
      };

      await groupService.create(payload);

      // Si un callback de succès est fourni (ex: redirection), on l'exécute
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Impossible de créer le groupe. Veuillez réessayer.");
      }
      // On lève à nouveau l'erreur pour que le composant puisse la gérer si besoin
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    groupes,
    isLoading,
    isSubmitting,
    error,
    refreshGroupes: fetchGroupes,
    createGroupe,
  };
};
