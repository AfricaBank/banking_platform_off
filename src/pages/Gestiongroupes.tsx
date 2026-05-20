import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { FilterContainer } from "@/components/moduleComponents/FilterContainer.tsx";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { codeSiege } from "@/dataObject/ListCollection.ts";
import { useNavigate } from "react-router-dom";
import GroupManagement from "@/module-management/gestion-des-group/GroupManagement.tsx";

export const Gestionsgroupes = () => {
  const navigate = useNavigate();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filterValues, setFilterValues] = useState({
    nomGroupe: "",
    agence: "",
  });

  const handleCreateGroup = () => {
    navigate("/groupes/nouveau");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearch = () => {
    console.log("Recherche lancée avec :", filterValues);
  };

  const handleReset = () => {
    setFilterValues({ nomGroupe: "", agence: "" });
  };
  return (
    <>
      <Box p={2}>
        <ModuleActionHeader
          addLabel="Créer un groupe"
          onAddClick={handleCreateGroup}
          onFilterToggle={toggleFilters}
          isFilterActive={isFilterVisible}
        />

        {/* 2. Bloc de Filtres (Affichage conditionnel) */}
        {isFilterVisible && (
          <FilterContainer onSearch={handleSearch} onReset={handleReset}>
            <InputTextField
              label="Nom du groupe"
              placeholder="Ex: Administration, Commercial..."
              value={filterValues.nomGroupe}
              onChange={(e) =>
                setFilterValues({ ...filterValues, nomGroupe: e.target.value })
              }
            />

            <DropDownList
              label="Agence"
              placeholder="Choisir une agence"
              collection={codeSiege}
              value={filterValues.agence}
              onValueChange={(val) =>
                setFilterValues({ ...filterValues, agence: val })
              }
            />
          </FilterContainer>
        )}

        <Box mt={6}>
          <GroupManagement />
        </Box>
      </Box>
    </>
  );
};
