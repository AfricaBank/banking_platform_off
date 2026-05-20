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
