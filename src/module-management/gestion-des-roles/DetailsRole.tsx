"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Center, Text, VStack, Spinner } from "@chakra-ui/react";
import { CategorizedAccordion, AccordionCategory } from "@/components/moduleComponents/CategorizedAccordion.tsx";

interface RoleData {
  id: string;
  libelle: string;
  description: string;
  statut: string;
  permissions?: string | string[]; // Accepte la chaîne de variables techniques de db.json
}

// 1. Dictionnaire de correspondance (Mapping technique -> Libellé utilisateur)
const PERMISSION_LABELS: Record<string, string> = {
  PERM_AGENTS_LIST: "Consulter la liste des agents",
  PERM_AGENTS_CREATE: "Créer un agent",
  PERM_AGENTS_EDIT: "Modifier un agent",
  PERM_ROLES_MANAGEMENT: "Gérer les rôles et permissions",
};

export const DetailsRole = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [role, setRole] = useState<RoleData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/roles/${id}`);

        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : Impossible de récupérer les détails du rôle.`);
        }

        const data: RoleData = await response.json();
        setRole(data);
      } catch (err: unknown) {
        console.error("Erreur lors de la récupération du rôle :", err);
        setError(err instanceof Error ? err.message : "Une erreur réseau est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Center p={10} width="100%">
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Récupération des informations du rôle depuis le serveur...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (error || !role) {
    return (
      <Center p={10} width="100%">
        <Box
          textAlign="center"
          p={5}
          borderWidth={1}
          borderColor="red.200"
          borderRadius="md"
          bg="red.50"
          maxWidth="400px"
        >
          <Text color="red.600" fontWeight="bold" mb={2}>
            Échec du chargement
          </Text>
          <Text color="red.500" fontSize="sm">
            {error || "Aucun rôle ne correspond à cet identifiant."}
          </Text>
          <Button size="sm" mt={4} colorScheme="red" onClick={handleBack}>
            Retour à la liste
          </Button>
        </Box>
      </Center>
    );
  }

  // 2. Traitement et traduction des clés de variables techniques en phrases lisibles
  const displayPermissions = (): string => {
    if (!role.permissions) {
      return "Aucune permission assignée";
    }

    let rawPermissionsArray: string[] = [];

    // Si c'est une chaîne de caractères (ex: "PERM_AGENTS_LIST, PERM_AGENTS_CREATE")
    if (typeof role.permissions === "string") {
      rawPermissionsArray = role.permissions
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    } 
    // Au cas où le comportement change et passe en tableau natif de clés
    else if (Array.isArray(role.permissions)) {
      rawPermissionsArray = role.permissions;
    }

    if (rawPermissionsArray.length === 0) {
      return "Aucune permission assignée";
    }

    // Transformation de chaque clé technique par sa correspondance humaine
    const translatedPermissions = rawPermissionsArray.map((key) => {
      return PERMISSION_LABELS[key] || key; // Retourne la clé brute si non référencée dans le dictionnaire
    });

    // Retourne les libellés séparés par des tirets
    return translatedPermissions.join(" - ");
  };

  const roleCategories: AccordionCategory[] = [
    {
      value: "statut",
      title: "Statut",
      items: [
        { label: "Statut", value: role.statut === "Activé" ? "Actif" : "Inactif" }
      ],
    },
    {
      value: "information-role",
      title: "Informations du rôle",
      items: [
        { label: "Libellé", value: role.libelle },
        { label: "Description", value: role.description },
        { label: "Permissions", value: displayPermissions() },
      ],
    },
  ];

  return (
    <Box p={4} width="100%">
      <VStack align="stretch" gap={2} width="100%">
        
        <Box mb={2} px={1}>
          <Text fontSize="xs" color="gray.500" fontWeight="medium">
            Gestion des rôles &gt; Détails
          </Text>
          <Box width="30px" height="2px" bg="gray.800" mt={1} />
        </Box>

        <CategorizedAccordion
          categories={roleCategories}
          defaultValue={["statut", "information-role"]}
        />

        <Center mt={4}>
          <Button
            variant="outline"
            borderColor="red.300"
            color="red.500"
            bg="white"
            fontSize="sm"
            fontWeight="medium"
            px={10}
            height="38px"
            rounded="6px"
            _hover={{ bg: "red.50", borderColor: "red.400" }}
            onClick={handleBack}
          >
            Retour
          </Button>
        </Center>

      </VStack>
    </Box>
  );
};

export default DetailsRole;