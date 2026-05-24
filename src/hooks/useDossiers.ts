import { useState, useEffect, useCallback } from "react";
import { dossierService } from "@/services/dossierService";
import { DossierData } from "@/components/pageContents/pageContents.type.ts";

export const useDossiers = () => {
  const [dossiers, setDossiers] = useState<DossierData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDossiers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dossierService.getAll();
      setDossiers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Une erreur inattendue est survenue lors du chargement des dossiers.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDossiers();
  }, [fetchDossiers]);

  return { dossiers, isLoading, error, refreshDossiers: fetchDossiers };
};
