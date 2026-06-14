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
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { DropDownListMulti } from "@/components/customFormFields/DropDownListMulti";
import { codeSiege } from "@/dataObject/ListCollection";
import { useAgents } from "@/hooks/useAgents";

export const ModifierAgent = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  // Consommation du hook des agents
  const {
    rolesCollection,
    groupesCollection,
    isLoading: isHookLoading,
    isSubmitting,
    error: hookError,
  } = useAgents();

  // États locaux du composant
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({
    matricule: "", 
    prenom: "",
    nom: "",
    email: "",
    agence: "",
    role: [] as string[], // Étape 1 : Mutation du type initial string vers string[]
    groupe: "",
    statut: "Actif", 
  });

  // Étape 2 : Chargement et normalisation des données de l'agent
  useEffect(() => {
    const fetchAgentData = async () => {
      if (!id) return;
      try {
        setIsLocalLoading(true);
        const response = await fetch(`http://localhost:3001/agents/${id}`);
        
        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations de l'agent.");
        }
        
        const data = await response.json();
        
        // Étape 3 : Normalisation sécurisée du champ rôle pour DropDownListMulti
        let parsedRoles: string[] = [];
        if (Array.isArray(data.role)) {
          parsedRoles = data.role;
        } else if (typeof data.role === "string" && data.role.trim() !== "") {
          parsedRoles = data.role.split(",").map((r: string) => r.trim());
        }

        // Injection des valeurs récupérées du serveur dans le formulaire
        setFormValues({
          matricule: data.matricule || "", 
          prenom: data.prenom || data.nomComplet?.split(" ")[0] || "",
          nom: data.nom || data.nomComplet?.split(" ")[1] || "",
          email: data.email || "",
          agence: data.agence || "",
          role: parsedRoles, // Attribution du tableau de rôles nettoyé
          groupe: data.groupe || "",
          statut: data.statut || "Actif",
        });
      } catch (err: unknown) {
        console.error("Erreur lors du chargement de l'agent :", err);
        if (err instanceof Error) {
          setLocalError(err.message);
        } else {
          setLocalError("Une erreur est survenue.");
        }
      } finally {
        setIsLocalLoading(false);
      }
    };

    fetchAgentData();
  }, [id]);

  // Étape 4 : Envoi des données modifiées (Requête HTTP PUT)
  const handleSave = async () => {
    if (!id) return;
    
    // Validation minimale incluant la présence d'au moins un rôle sélectionné dans les tags
    if (!formValues.email || !formValues.agence || formValues.role.length === 0) {
      alert("Veuillez renseigner l'adresse email, l'agence de rattachement et au moins un rôle.");
      return;
    }

    try {
      const updatedAgent = {
        ...formValues,
        nomComplet: `${formValues.prenom} ${formValues.nom}`.trim()
      };

      const response = await fetch(`http://localhost:3001/agents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAgent),
      });

      if (!response.ok) {
        throw new Error("Échec de la sauvegarde des modifications sur le serveur.");
      }

      navigate("/agents");
    } catch (err) {
      console.error("Erreur détectée lors de la mise à jour :", err);
      alert("Erreur lors de la mise à jour de l'agent.");
    }
  };

  const handleCancel = () => {
    navigate("/agents");
  };

  // Gestion de l'affichage de chargement initial
  const isLoadingGlobal = isHookLoading || isLocalLoading;
  if (isLoadingGlobal) {
    return (
      <Center p={10}>
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Récupération du profil de l'agent et des configurations...
          </Text>
        </VStack>
      </Center>
    );
  }

  const activeError = hookError || localError;

  return (
    <Box p={2}>
      <VStack align="stretch" gap={4}>
        <ModuleFormHeader title="Modification d'un agent" />

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
          {/* Sous-bloc 1 : Identité */}
          <FormSection title="Identité" columns={3}>
            <InputTextField
              label="Matricule"
              placeholder="Ex: AG-001"
              value={formValues.matricule}
              disabled={true} 
            />
            <InputTextField
              label="Prénom"
              placeholder="Prénom"
              value={formValues.prenom}
              disabled={true} 
            />
            <InputTextField
              label="Nom"
              placeholder="Nom"
              value={formValues.nom}
              disabled={true} 
            />
            <InputTextField
              label="Email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
          </FormSection>

          {/* Sous-bloc 2 : Habilitations */}
          <FormSection title="Habilitations" columns={3}>
            <DropDownList
              label="Agence"
              placeholder="Agence"
              collection={codeSiege}
              value={formValues.agence}
              onValueChange={(val) =>
                setFormValues({ ...formValues, agence: val })
              }
            />

            {/* Raccordement au nouveau DropDownListMulti mis à jour graphiquement */}
            <DropDownListMulti
              label="Rôle"
              placeholder="Sélectionner un ou plusieurs rôles"
              collection={rolesCollection}
              value={formValues.role}
              onValueChange={(vals) =>
                setFormValues({ ...formValues, role: vals })
              }
            />

            <DropDownList
              label="Groupe"
              placeholder="Sélectionner un groupe"
              collection={groupesCollection}
              value={formValues.groupe}
              onValueChange={(val) =>
                setFormValues({ ...formValues, groupe: val })
              }
            />
          </FormSection>

          {/* Sous-bloc 3 : Statut de l'agent */}
          <FormSection title="Activation / Désactivation" columns={1}>
            <Flex align="center" gap={4} py={2}>
              <Switch.Root
                id="agent-status-switch"
                colorScheme="teal"
                size="lg"
                checked={formValues.statut === "Actif"}
                onCheckedChange={(details) =>
                  setFormValues({
                    ...formValues,
                    statut: details.checked ? "Actif" : "Inactif",
                  })
                }
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
              <Badge
                variant="outline"
                colorScheme={formValues.statut === "Actif" ? "teal" : "red"}
                borderRadius="full"
                px={4}
                py={1}
                fontSize="xs"
                fontWeight="bold"
              >
                {formValues.statut}
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