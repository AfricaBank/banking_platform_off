"use client";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import FilterForm from "@/components/pageContents/FilterForm";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu"; // Import des icônes d'action de ligne
import { TableActionsBar } from "./TableActionsBar.tsx";
import { GenericTable, ColumnConfig } from "./GenericTable.tsx";
import { DossierData } from "./pageContents.type.ts";
import { actions } from "./pageContents.constants.ts";
import { data } from "./pageContents.mock.ts";
// Configuration des colonnes
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
          item.dernierStatut === "À valider DG"
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

  // LA CORRECTION EST ICI : Injection directe des boutons d'actions spécifiques à ce module
  {
    header: "Actions",
    key: "actions",
    render: (item) => (
      <Flex gap={2} justify="center">
        <IconButton
          rounded="md"
          aria-label="Voir"
          size="xs"
          bg="dogerBlue.500"
          color="white"
          onClick={() => console.log("Voir dossier :", item.numeroDossier)}
        >
          <LuEye />
        </IconButton>

        <IconButton
          rounded="md"
          aria-label="Modifier"
          size="xs"
          bg="warnOrange.400"
          color="white"
          onClick={() => console.log("Modifier dossier :", item.numeroDossier)}
        >
          <LuPencil />
        </IconButton>

        <IconButton
          rounded="md"
          aria-label="Supprimer"
          size="xs"
          bg="errorRed.400"
          color="white"
          onClick={() => {
            if (confirm("Voulez-vous supprimer ce dossier ?")) {
              console.log("Supprimé :", item.numeroDossier);
            }
          }}
        >
          <LuTrash2 />
        </IconButton>
      </Flex>
    ),
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
      <GenericTable data={filteredData} columns={columns} />
    </Box>
  );
};

export default Tableau;
