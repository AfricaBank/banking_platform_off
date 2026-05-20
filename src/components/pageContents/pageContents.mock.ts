//Données mock de la liste des dossier
import { DossierData } from "./pageContents.type.ts";
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
