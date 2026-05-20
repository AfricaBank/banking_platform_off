//Données mock de la liste des dossier
import { DossierData } from "./pageContents.type.ts";
import { AgentDossier } from "./pageContents.type.ts";
import { GroupData } from "./pageContents.type.ts";
import { AgentData } from "./pageContents.type.ts";
import { RoleData } from "./pageContents.type.ts";
import { TaskData } from "./pageContents.type.ts";

//Donnèes mock de la liste des dossiers dans le module de gestion de dossiers
export const data: DossierData[] = [
  {
    prenomNom: "Issaga Gaye",
    numeroDossier: "123456",
    typeProcessus: "EER",
    dernierStatut: "Terminé",
    typeModification: "Modification 1",
    typeClient: "Client A",
    categorieClientele: "Catégorie 1",
    dateCreation: "2024-03-21",
    dateFin: "2024-04-21",
    initiateur: "Alice",
    codeExploitant: "ABC123",
  },
  {
    prenomNom: "Mor Mbathie",
    numeroDossier: "20000",
    typeProcessus: "EER",
    dernierStatut: "À valider DG",
    typeModification: "Modification 1",
    typeClient: "Client A",
    categorieClientele: "Catégorie 1",
    dateCreation: "2024-03-21",
    dateFin: "2024-04-21",
    initiateur: "Alice",
    codeExploitant: "ABC123",
  },
];
// Données mock de la table du dashboard des taches actives
export const agentData: AgentDossier[] = [
  {
    reference: "REF-2026-001",
    nomTitulaire: "Jean Dupont",
    statut: "TERMINE",
    agence: "Agence Dakar Plateau",
    codeExploitant: "EXP-778",
  },
  {
    reference: "REF-2026-002",
    nomTitulaire: "Marie Fall",
    statut: "ENCOURS",
    agence: "Agence Saint-Louis",
    codeExploitant: "EXP-421",
  },
  {
    reference: "REF-2026-002",
    nomTitulaire: "Marie Fall",
    statut: "SUSPENDUE",
    agence: "Agence Saint-Louis",
    codeExploitant: "EXP-421",
  },
];
//Donnèes mock de la liste des Groupe
export const groupMockData: GroupData[] = [
  {
    id: "1",
    identifiant: "Groupe-001",
    nomGroupe: "Commerciale",
    description: "Description",
    agence: "AB - Plateau",
    effectifs: 10,
  },
  {
    id: "2",
    identifiant: "Groupe-001",
    nomGroupe: "DSI",
    description: "Description",
    agence: "AB - Plateau",
    effectifs: 20,
  },
  {
    id: "3",
    identifiant: "Groupe-001",
    nomGroupe: "Conformité",
    description: "Description",
    agence: "AB - Plateau",
    effectifs: 10,
  },
  {
    id: "4",
    identifiant: "Groupe-001",
    nomGroupe: "Service Audit",
    description: "Description",
    agence: "AB - Plateau",
    effectifs: 0,
  },
  {
    id: "5",
    identifiant: "Groupe-001",
    nomGroupe: "Marketing",
    description: "Description",
    agence: "AB - Plateau",
    effectifs: 12,
  },
];
// Donnèes mocks de la liste des agents
export const agentMockData: AgentData[] = [
  {
    id: "1",
    matricule: "AG-PL-001",
    nomComplet: "Abdou DIALLO",
    email: "abdou.diallo@yopmail.com",
    agence: "AB - Plateau",
    statut: "Actif",
  },
  {
    id: "2",
    matricule: "AG-PL-001",
    nomComplet: "Abdou DIALLO",
    email: "abdou.diallo@yopmail.com",
    agence: "AB - Plateau",
    statut: "Actif",
  },
  {
    id: "3",
    matricule: "AG-PL-001",
    nomComplet: "Abdou DIALLO",
    email: "abdou.diallo@yopmail.com",
    agence: "AB - Plateau",
    statut: "Actif",
  },
  {
    id: "4",
    matricule: "AG-PL-001",
    nomComplet: "Abdou DIALLO",
    email: "abdou.diallo@yopmail.com",
    agence: "AB - Plateau",
    statut: "Actif",
  },
  {
    id: "5",
    matricule: "AG-PL-001",
    nomComplet: "Abdou DIALLO",
    email: "abdou.diallo@yopmail.com",
    agence: "AB - Plateau",
    statut: "Inactif",
  },
];
//Donnèes mocks de la liste des roles
export const roleMockData: RoleData[] = [
  {
    id: "1",
    libelle: "Création de compte",
    description: "Description du role de création de compte",
    statut: "Activé",
  },
  {
    id: "2",
    libelle: "Création de compte",
    description: "Description du role de création de compte",
    statut: "Activé",
  },
  {
    id: "3",
    libelle: "Création de compte",
    description: "Description du role de création de compte",
    statut: "Activé",
  },
  {
    id: "4",
    libelle: "Création de compte",
    description: "Description du role de création de compte",
    statut: "Activé",
  },
  {
    id: "5",
    libelle: "Création de compte",
    description: "Description du role de création de compte",
    statut: "Désactivé",
  },
];
//Donnèes mock de la liste des taches actives
export const taskMockData: TaskData[] = [
  {
    id: "1",
    idDossier: "EER-2026-001",
    type: "EER",
    agentAssigne: "Said Hachim",
    nomClient: "Abdou KAMAL",
    typeClient: "Personne physique",
    agence: "BF-Plateau",
    statut: "En cours",
    dateCreation: "BF-Plateau", // Valeur textuelle brute observée sur la capture d'écran
  },
  {
    id: "2",
    idDossier: "EER-2026-001",
    type: "Révision",
    agentAssigne: "Said Hachim",
    nomClient: "Abdou KAMAL",
    typeClient: "Personne morale",
    agence: "BF-Plateau",
    statut: "Terminé",
    dateCreation: "BF-Plateau",
  },
  {
    id: "3",
    idDossier: "EER-2026-001",
    type: "Révision",
    agentAssigne: "Said Hachim",
    nomClient: "Abdou KAMAL",
    typeClient: "Personne physique",
    agence: "BF-Plateau",
    statut: "Terminé",
    dateCreation: "BF-Plateau",
  },
  {
    id: "4",
    idDossier: "EER-2026-001",
    type: "EER",
    agentAssigne: "Said Hachim",
    nomClient: "Abdou KAMAL",
    typeClient: "Personne physique",
    agence: "BF-Plateau",
    statut: "En cours",
    dateCreation: "BF-Plateau",
  },
  {
    id: "5",
    idDossier: "EER-2026-001",
    type: "EER",
    agentAssigne: "Said Hachim",
    nomClient: "Abdou KAMAL",
    typeClient: "Personne physique",
    agence: "BF-Plateau",
    statut: "Annulé",
    dateCreation: "BF-Plateau",
  },
];
