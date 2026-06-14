import { useState, useEffect, useCallback } from "react";
import { roleService } from "@/services/roleService";
import { RoleData } from "@/components/pageContents/pageContents.type.ts";
import { createListCollection } from "@chakra-ui/react";

// Structure des données du formulaire capturées par l'interface utilisateur
export interface NewRoleFormData {
  libelle: string;
  description: string;
  permissions: string[]; // Reçu sous forme de tableau (string[]) pour la multi-sélection
}

// SIMULATION : Liste des permissions disponibles normalement fournies par le backend
const MOCK_PERMISSIONS = [
  { id: "1", code: "PERM_AGENTS_LIST", libelle: "Consulter la liste des agents" },
  { id: "2", code: "PERM_AGENTS_CREATE", libelle: "Créer un agent" },
  { id: "3", code: "PERM_AGENTS_EDIT", libelle: "Modifier un agent" },
  { id: "4", code: "PERM_ROLES_MANAGEMENT", libelle: "Gérer les rôles et permissions" },
];

export const useRoles = () => {
  const [roles, setRoles] = useState<RoleData[]>([]);
  
  // Étape 3 : Création de la collection pour le DropDownList de Chakra UI
  const [permissionsCollection, setPermissionsCollection] = useState(
    createListCollection({ items: [] as { label: string; value: string }[] }),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // READ ALL : Charger les rôles et initialiser la liste des permissions simulées
  const fetchRoles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await roleService.getAll();
      setRoles(data);

      // Simulation du mapping des données reçues du "backend" des permissions
      const rawPermissions = MOCK_PERMISSIONS.map((perm) => ({
        value: perm.code, // La valeur technique qui sera stockée
        label: perm.libelle, // Le texte lisible affiché à l'écran
      }));

      setPermissionsCollection(createListCollection({ items: rawPermissions }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue lors du chargement des données.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // CREATE : Enregistrer un nouveau rôle avec ses permissions formatées
  const createRole = async (
    formData: NewRoleFormData,
    onSuccess?: () => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Étape 4 : Formatage et construction du payload conforme à l'interface RoleData
      const payload: Omit<RoleData, "id"> = {
        libelle: formData.libelle,
        description: formData.description,
        statut: "Activé",
        // Transformation du tableau sélectionné dans l'UI en chaîne de caractères
        permissions: formData.permissions.join(", "),
      };

      await roleService.create(payload);

      // Réactualisation automatique de la liste locale
      await fetchRoles();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Impossible de créer le rôle. Veuillez réessayer ultérieurement.");
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    roles,
    permissionsCollection, // Donnée prête à être consommée par le composant DropDownList
    isLoading,
    isSubmitting,
    error,
    refreshRoles: fetchRoles,
    createRole,
  };
};