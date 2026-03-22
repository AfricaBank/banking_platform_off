"use client";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import FilterForm from "@/components/pageContents/FilterForm";
import { HiPlus } from "react-icons/hi";
import { HiPencil } from "react-icons/hi2";
import { FaShareFromSquare } from "react-icons/fa6";
import { TableActionsBar } from "./TableActionsBar.tsx";
import { GenericTable, ColumnConfig } from "./GenericTable.tsx";

// 1. Définition de l'interface pour les données du tableau
interface DossierData {
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

const data: DossierData[] = [
  {
    prenomNom: "Issaga Gaye",
    numeroDossier: "123456",
    typeProcessus: "EER",
    dernierStatut: "Términer",
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

// 2. Typage strict des colonnes en utilisant l'interface DossierData
const columns: ColumnConfig<DossierData>[] = [
  { header: "Prenom Nom / Raison sociale", key: "prenomNom" },
  { header: "Numéro dossier", key: "numeroDossier" },
  { header: "Processus", key: "typeProcessus" },
  {
    header: "Statut",
    key: "dernierStatut",
    render: (item) => (
      <Text
        fontWeight="bold"
        color={
          item.dernierStatut === "En cours"
            ? "warnOrange.400"
            : "successGreen.400"
        }
      >
        {item.dernierStatut}
      </Text>
    ),
  },
  { header: "Modification", key: "typeModification" },
  { header: "Client", key: "typeClient" },
  { header: "Catégorie", key: "categorieClientele" },
  { header: "Création", key: "dateCreation" },
  { header: "Fin", key: "dateFin" },
  { header: "Initiateur", key: "initiateur" },
  { header: "Exploitant", key: "codeExploitant" },
  { header: "Actions", key: "actions" },
];


    const handleInitiateDossier = () => {
        navigate('/recherche');
      };
const actions = [
  {
    label: "Démarrer EER",
    icon: HiPlus,
    to: "/initiation",
    bg: "dogerBlue.500",
    width: "180px",
  },
  {
    label: "Réviser un compte",
    icon: HiPencil,
    to: "/revision",
    bg: "sidebar.itemActive",
    width: "200px",
  },
  {
    label: "Exporter des comptes",
    icon: FaShareFromSquare,
    onClick: () => console.log("Export en cours..."),
    bg: "brandGreen.400",
    width: "220px",
  },
];

const Tableau = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterValue] = useState("");

  const handleToggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const filteredData = data.filter((item) =>
    item.prenomNom.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <Box>
      <Box mb={6} paddingTop={2}>
        <TableActionsBar buttons={actions} onFilterClick={handleToggleFilter} />
      </Box>

      {isFilterVisible && (
        <Box animation="fade-in 0.3s ease-in-out" mb={6}>
          <FilterForm />
        </Box>
      )}

      {/* 3. Utilisation unique du composant générique (le code du tableau brut a été supprimé) */}
      <GenericTable
        data={filteredData}
        columns={columns}
        onView={(item) =>
          console.log("Affichage du dossier:", item.numeroDossier)
        }
        onEdit={(item) =>
          console.log("Edition du dossier:", item.numeroDossier)
        }
        onDelete={(item) => {
          if (confirm("Voulez-vous supprimer ce dossier ?")) {
            console.log("Supprimé:", item.numeroDossier);
          }
        }}
      />
    </Box>
  );
};

export default Tableau;
