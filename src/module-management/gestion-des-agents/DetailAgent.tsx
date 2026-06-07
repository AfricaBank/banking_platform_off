"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Center, Text, VStack, Spinner } from "@chakra-ui/react";
import { CategorizedAccordion, AccordionCategory } from "@/components/moduleComponents/CategorizedAccordion.tsx";

// Typage calqué sur la structure réelle de ton json-server (image_67afe4.png)
interface AgentData {
  id: string;
  matricule: string;
  nomComplet: string;
  email: string;
  agence: string;
  statut: string;
  // Propriétés optionnelles si absentes du serveur
  roles?: string;
  groupes?: string;
  derniereConnexion?: string;
}

export const DetailAgent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // États pour la gestion des données de l'API
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:3001/agents/${id}`);
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : Impossible de récupérer les détails de l'agent.`);
        }
        
        const data: AgentData = await response.json();
        setAgent(data);
      } catch (err: unknown) {
        console.error("Erreur lors du fetch de l'agent :", err);
        setError(err instanceof Error ? err.message : "Une erreur réseau est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); 
  };

  // 1. Gestion de l'état de chargement
  if (isLoading) {
    return (
      <Center p={10} width="100%">
        <VStack gap={3}>
          <Spinner size="xl" color="dogerBlue.500" borderWidth="4px" />
          <Text fontSize="sm" color="gray.500">
            Récupération des informations de l'agent depuis le serveur...
          </Text>
        </VStack>
      </Center>
    );
  }

  // 2. Gestion de l'état d'erreur
  if (error || !agent) {
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
            {error || "Aucun agent ne correspond à cet identifiant."}
          </Text>
          <Button size="sm" mt={4} colorScheme="red" onClick={handleBack}>
            Retour à la liste
          </Button>
        </Box>
      </Center>
    );
  }

  // Seul le nom complet est fourni par l'API ; on extrait le prénom par sécurité si besoin
  const [nom, ...prenomParts] = agent.nomComplet.split(" ");
  const prenom = prenomParts.join(" ") || "—";

  // 3. Transformation des données de l'API pour alimenter l'accordéon
  const agentCategories: AccordionCategory[] = [
    {
      value: "statut",
      title: "Statut",
      items: [
        { label: "Statut", value: agent.statut }
      ],
    },
    {
      value: "information-agent",
      title: "Information de l'agent",
      items: [
        { label: "Nom", value: nom },
        { label: "Prénom", value: prenom },
        { label: "Email", value: agent.email },
        { label: "Matricule", value: agent.matricule },
      ],
    },
    {
      value: "habilitations",
      title: "Habilitations",
      items: [
        { label: "Rôles", value: agent.roles || "Commercial - DSI - Attaché" }, // Valeur de repli (fallback)
        { label: "Agences", value: agent.agence },
        { label: "Groupes", value: agent.groupes || "Commercial - DSI" }, // Valeur de repli
        { label: "Date de dernière connexion", value: agent.derniereConnexion || "20/01/2026" }, // Valeur de repli
      ],
    },
  ];

  return (
    <Box p={4} width="100%">
      <VStack align="stretch" gap={2} width="100%">
        
        {/* Fil d'ariane indicatif */}
        <Box mb={2} px={1}>
          <Text fontSize="xs" color="gray.500" fontWeight="medium">
            Gestion des agents &gt; Détails
          </Text>
          <Box width="30px" height="2px" bg="gray.800" mt={1} />
        </Box>

        {/* Accordéon dynamique consommant les données vivantes de json-server */}
        <CategorizedAccordion
          categories={agentCategories}
          defaultValue={["statut", "information-agent", "habilitations"]}
        />

        {/* Bouton Retour conforme au design */}
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

export default DetailAgent;