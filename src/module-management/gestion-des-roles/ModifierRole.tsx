"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  VStack, 
  Text, 
  Center, 
  Spinner, 
  Switch, 
  Flex, 
  Badge 
} from "@chakra-ui/react";

import { ModuleFormHeader } from "@/components/moduleComponents/ModuleFormHeader";
import { FormContainer } from "@/components/moduleComponents/FormContainer";
import { FormSection } from "@/components/moduleComponents/FormSection";
import { InputTextField } from "@/components/customFormFields/InputTextField";
import { DropDownListMulti } from "@/components/customFormFields/DropDownListMulti";

// Utilisation de votre hook personnalisé dédié aux rôles
import { useRoles } from "@/hooks/useRoles";

export const ModifierRole = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  // Consommation du hook de gestion des rôles pour récupérer la collection de permissions disponibles
  const {
    permissionsCollection,
    isLoading: isHookLoading,
    isSubmitting,
    error: hookError,
  } = useRoles();

  // États de chargement et d'erreurs locaux au fetch
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  // État local du formulaire (les permissions sont gérées en tableau à l'intérieur du composant)
  const [formValues, setFormValues] = useState({
    libelle: "",
    description: "",
    permissions: [] as string[],
    statut: "Activé", 
  });

  // Chargement et normalisation des données du rôle depuis le serveur
  useEffect(() => {
    const fetchRoleData = async () => {
      if (!id) return;
      try {
        setIsLocalLoading(true);
        const response = await fetch(`http://localhost:3001/roles/${id}`);
        
        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations du rôle.");
        }
        
        const data = await response.json();
        
        // Normalisation de la chaîne technique "PERM_X, PERM_Y" vers un tableau de chaînes ['PERM_X', 'PERM_Y']
        let parsedPermissions: string[] = [];
        if (typeof data.permissions === "string" && data.permissions.trim() !== "") {
          parsedPermissions = data.permissions.split(",").map((p: string) => p.trim());
        } else if (Array.isArray(data.permissions)) {
          parsedPermissions = data.permissions;
        }

        setFormValues({
          libelle: data.libelle || "",
          description: data.description || "",
          permissions: parsedPermissions,
          statut: data.statut || "Activé",
        });
      } catch (err: unknown) {
        console.error("Erreur lors du chargement du rôle :", err);
        if (err instanceof Error) {
          setLocalError(err.message);
        } else {
          setLocalError("Une erreur est survenue lors de la récupération des données.");
        }
      } finally {
        setIsLocalLoading(false);
      }
    };

    fetchRoleData();
  }, [id]);

  // Traitement et expédition des données mises à jour
  const handleSave = async () => {
    if (!id) return;
    
    // Validation de surface
    if (!formValues.libelle || !formValues.description || formValues.permissions.length === 0) {
      alert("Veuillez renseigner le libellé, la description et sélectionner au moins une permission.");
      return;
    }

    try {
      // Re-transformation du tableau de permissions en chaîne brute textuelle pour correspondre à votre db.json
      const updatedRole = {
        ...formValues,
        permissions: formValues.permissions.join(", ")
      };

      const response = await fetch(`http://localhost:3001/roles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRole),
      });

      if (!response.ok) {
        throw new Error("Échec de la sauvegarde des modifications sur le serveur.");
      }

      navigate("/roles");
    } catch (err) {
      console.error("Erreur détectée lors de la mise à jour :", err);
      alert("Erreur lors de la mise à jour du rôle.");
    }
  };

  const handleCancel = () => {
    navigate("/roles");
  };

  // Consolidation des statuts de chargement
  const isLoadingGlobal = isHookLoading || isLocalLoading;
  if (isLoadingGlobal) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Récupération de la configuration du rôle et des permissions...
          </Text>
        </VStack>
      </Center>
    );
  }

  const activeError = hookError || localError;

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Modification d'un rôle" />

        {activeError && (
          <Box p={3} bg="red.50" borderWidth={1} borderColor="red.200" borderRadius="md">
            <Text color="red.600" fontSize="sm" fontWeight="bold">
              {activeError}
            </Text>
          </Box>
        )}

        <FormContainer
          submitLabel="Enregistrer les modifications"
          onSave={handleSave}
          onCancel={handleCancel}
        >
          {/* Section 1 : Configuration et informations obligatoires */}
          <FormSection title="Information du rôle" columns={3}>
            <InputTextField
              label="Libellé"
              placeholder="Libellé du rôle"
              value={formValues.libelle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, libelle: e.target.value })
              }
            />
            
            <InputTextField
              label="Description"
              placeholder="Description du rôle"
              value={formValues.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />

            {/* Sélecteur multiple raccordé à la collection de clés techniques provenant du hook */}
            <DropDownListMulti
              label="Permissions"
              placeholder="Sélectionner une ou plusieurs permissions"
              collection={permissionsCollection}
              value={formValues.permissions}
              onValueChange={(vals) =>
                setFormValues({ ...formValues, permissions: vals })
              }
            />
          </FormSection>

          {/* Section 2 : Statut du Rôle (Activé / Désactivé) */}
          <FormSection title="Activation / Désactivation" columns={1}>
            <Flex align="center" gap={4} py={2}>
              <Switch.Root
                id="role-status-switch"
                colorScheme="teal"
                size="lg"
                checked={formValues.statut === "Activé"}
                onCheckedChange={(details) =>
                  setFormValues({
                    ...formValues,
                    statut: details.checked ? "Activé" : "Désactivé",
                  })
                }
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
              <Badge
                variant="outline"
                colorScheme={formValues.statut === "Activé" ? "teal" : "red"}
                borderRadius="full"
                px={4}
                py={1}
                fontSize="xs"
                fontWeight="bold"
              >
                {formValues.statut === "Activé" ? "Actif" : "Inactif"}
              </Badge>
            </Flex>
          </FormSection>
        </FormContainer>

        {isSubmitting && (
          <Center>
            <Text fontSize="xs" color="gray.500">
              Synchronisation des modifications avec le serveur central...
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default ModifierRole;