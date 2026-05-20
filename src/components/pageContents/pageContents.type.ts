import { IconType } from "react-icons";

//Données à afficher dans la table liste des dossiers
export interface DossierData {
  prenomNom: string;
  numeroDossier: string;
  typeProcessus: string;
  dernierStatut: string;
  typeModification: string;
  typeClient: string;
  categorieClientele: string;
  dateCreation: string;
  dateFin: string;
  initiateur: string;
  codeExploitant: string;
}
//Type pour les custom dashboard
export interface CustomCardDashboardStatProps {
  title?: string;
  value?: string | number;
  percentage?: string;
  total?: string | number;
  icon?: IconType; // Déclarée mais non exploitée auparavant
  iconBg?: string;
  progressColor?: string;
}
//Types des  de la table des taches actives du dashboard
export interface AgentDossier {
  reference: string;
  nomTitulaire: string;
  statut: "TERMINE" | "ENCOURS" | "SUSPENDUE";
  agence: string;
  codeExploitant: string;
}
// Types des données de la la table liste des groupe
export interface GroupData {
  id: string;
  identifiant: string;
  nomGroupe: string;
  description: string;
  agence: string;
  effectifs: number;
}
// Type des données de la liste Gestion des agents
export interface AgentData {
  id: string;
  matricule: string;
  nomComplet: string;
  email: string;
  agence: string;
  statut: "Actif" | "Inactif";
}
// Types des donnèes de la liste des roles
export interface RoleData {
  id: string;
  libelle: string;
  description: string;
  statut: "Activé" | "Désactivé";
}
// Type de donnèes de la liste des taches actives
export interface TaskData {
  id: string;
  idDossier: string;
  type: string;
  agentAssigne: string;
  nomClient: string;
  typeClient: "Personne physique" | "Personne morale";
  agence: string;
  statut: "En cours" | "Terminé" | "Annulé";
  dateCreation: string;
}
