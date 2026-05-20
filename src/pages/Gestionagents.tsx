import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { FilterContainer } from "@/components/moduleComponents/FilterContainer.tsx";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { useNavigate } from "react-router-dom";
import { codeSiege } from "@/dataObject/ListCollection.ts";
import AgentManagement from "@/module-management/gestion-des-agents/AgentManagement.tsx";

export const Gestionagents = () => {
  const navigate = useNavigate();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // État local pour gérer les valeurs des filtres
  const [filterValues, setFilterValues] = useState({
    email: "",
    agence: "",
    statut: "",
    role: "",
  });

  const handleCreateAgent = () => {
    navigate("/agents/nouveau");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearch = () => {
    console.log("Recherche des agents avec :", filterValues);
  };

  const handleReset = () => {
    setFilterValues({
      email: "",
      agence: "",
      statut: "",
      role: "",
    });
  };

  return (
    <Box p={2}>
      <ModuleActionHeader
        addLabel="Ajouter un agent"
        onAddClick={handleCreateAgent}
        onFilterToggle={toggleFilters}
        isFilterActive={isFilterVisible}
      />

      {isFilterVisible && (
        <FilterContainer onSearch={handleSearch} onReset={handleReset}>
          <InputTextField
            label="Email"
            placeholder="Email"
            value={filterValues.email}
            onChange={(e) =>
              setFilterValues({ ...filterValues, email: e.target.value })
            }
          />

          <DropDownList
            label="Agence"
            placeholder="Agence"
            collection={codeSiege}
            value={filterValues.agence}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, agence: val })
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

          <DropDownList
            label="Rôle"
            placeholder="Rôle"
            collection={codeSiege}
            value={filterValues.role}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, role: val })
            }
          />
        </FilterContainer>
      )}

      <Box mt={6}>
        <AgentManagement />
      </Box>
    </Box>
  );
};
