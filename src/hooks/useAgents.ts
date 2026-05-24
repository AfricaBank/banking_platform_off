import { useState, useEffect, useCallback } from "react";
import { agentService } from "@/services/agentService";
import { groupService } from "@/services/groupService";
import { roleService } from "@/services/roleService";
import { AgentData } from "@/components/pageContents/pageContents.type.ts";
import { createListCollection } from "@chakra-ui/react";

export const useAgents = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);

  const [rolesCollection, setRolesCollection] = useState(
    createListCollection({ items: [] as { label: string; value: string }[] }),
  );
  const [groupesCollection, setGroupesCollection] = useState(
    createListCollection({ items: [] as { label: string; value: string }[] }),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [allAgents, allRoles, allGroupes] = await Promise.all([
        agentService.getAll(),
        roleService.getAll(),
        groupService.getAll(),
      ]);

      setAgents(allAgents);

      const rawRoles = allRoles.map((role) => ({
        value: role.libelle,
        label: role.libelle,
      }));

      const rawGroupes = allGroupes.map((groupe) => ({
        value: groupe.nomGroupe,
        label: groupe.nomGroupe,
      }));

      setRolesCollection(createListCollection({ items: rawRoles }));
      setGroupesCollection(createListCollection({ items: rawGroupes }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Une erreur est survenue lors de la récupération des données.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // CORRECTION ICI : Remplacement de group par groupe dans le typage de formData
  const createAgent = async (
    formData: {
      prenom: string;
      nom: string;
      email: string;
      agence: string;
      role: string;
      groupe: string;
    },
    onSuccess?: () => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const payload: Omit<AgentData, "id"> = {
        matricule: `AG-${formData.agence.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        nomComplet: `${formData.prenom} ${formData.nom}`.trim(),
        email: formData.email,
        agence: formData.agence,
        statut: "Actif",
      };

      await agentService.create(payload);

      await fetchAllData();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Impossible de finaliser l'enregistrement de l'agent.");
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    agents,
    rolesCollection,
    groupesCollection,
    isLoading,
    isSubmitting,
    error,
    createAgent,
    refreshAgents: fetchAllData,
  };
};
