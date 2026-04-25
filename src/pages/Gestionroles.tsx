import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { FilterContainer } from "@/components/moduleComponents/FilterContainer.tsx";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { codeSiege } from "@/dataObject/ListCollection.ts";

export const Gestionroles = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filterValues, setFilterValues] = useState({
    libelle: "",
    statut: "",
  });

  const handleCreateRole = () => {
    console.log("Ouverture du formulaire de création de rôle");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearch = () => {
    console.log("Recherche de rôles avec :", filterValues);
  };

  const handleReset = () => {
    setFilterValues({ libelle: "", statut: "" });
  };

  return (
    <Box p={2}>
      <ModuleActionHeader
        addLabel="Définir un rôle"
        onAddClick={handleCreateRole}
        onFilterToggle={toggleFilters}
        isFilterActive={isFilterVisible}
      />

      {isFilterVisible && (
        <FilterContainer onSearch={handleSearch} onReset={handleReset}>
          <InputTextField
            label="Libellé"
            placeholder="Libellé"
            value={filterValues.libelle}
            onChange={(e) =>
              setFilterValues({ ...filterValues, libelle: e.target.value })
            }
          />

          <DropDownList
            label="Statut"
            placeholder="Statut"
            collection={codeSiege}
            value={filterValues.statut}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, statut: val })
            }
          />
        </FilterContainer>
      )}

      <Box mt={6}>{/* Votre composant de tableau ici */}</Box>
    </Box>
  );
};
