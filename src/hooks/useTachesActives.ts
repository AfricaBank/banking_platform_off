import { useState, useEffect, useCallback } from "react";
// Importation du service mis à jour
import { tacheActiveService } from "@/services/activeTaskService.ts";
// Importation du bon type cible centralisé
import { TaskData } from "@/components/pageContents/pageContents.type.ts";

export const useTachesActives = () => {
  // Déclaration de l'état basée sur la structure stricte de TaskData
  const [tachesActives, setTachesActives] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTachesActives = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Récupération des données typées TaskData[] depuis l'API Client
      const data = await tacheActiveService.getAll();
      setTachesActives(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Une erreur inattendue est survenue lors du chargement du tableau de bord.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTachesActives();
  }, [fetchTachesActives]);

  return {
    tachesActives,
    isLoading,
    error,
    refreshTachesActives: fetchTachesActives,
  };
};
