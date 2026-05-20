import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { FilterContainer } from "@/components/moduleComponents/FilterContainer.tsx";
import { InputTextField } from "@/components/customFormFields/InputTextField.tsx";
import { DropDownList } from "@/components/customFormFields/DropDownList.tsx";
import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker.tsx";
import { codeSiege } from "@/dataObject/ListCollection.ts";
import ActiveTaskManager from "@/module-management/taches-actives/ActiveTaskManager.tsx";

export const Tachesactives = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // État pour les 6 champs de filtrage
  const [filterValues, setFilterValues] = useState({
    type: "",
    statut: "",
    agence: "",
    agent: "",
    dateCreation: "",
    nomClient: "",
  });

  const handleCreateTask = () => {
    console.log("Ouverture du formulaire de création de tâche");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearch = () => {
    console.log("Recherche des tâches avec :", filterValues);
  };

  const handleReset = () => {
    setFilterValues({
      type: "",
      statut: "",
      agence: "",
      agent: "",
      dateCreation: "",
      nomClient: "",
    });
  };

  return (
    <Box p={2}>
      <ModuleActionHeader
        addLabel="Nouvelle tâche"
        onAddClick={handleCreateTask}
        onFilterToggle={toggleFilters}
        isFilterActive={isFilterVisible}
        showAddButton={false}
      />

      {isFilterVisible && (
        <FilterContainer onSearch={handleSearch} onReset={handleReset}>
          <DropDownList
            label="Type"
            placeholder="EER"
            collection={codeSiege}
            value={filterValues.type}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, type: val })
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
            label="Agence"
            placeholder="Agence"
            collection={codeSiege}
            value={filterValues.agence}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, agence: val })
            }
          />
          <DropDownList
            label="Agent"
            placeholder="Agent"
            collection={codeSiege}
            value={filterValues.agent}
            onValueChange={(val) =>
              setFilterValues({ ...filterValues, agent: val })
            }
          />

          <CustomDatePicker
            nomDuChamp="Date de création"
            value={filterValues.dateCreation}
            onChange={(date) =>
              setFilterValues({ ...filterValues, dateCreation: date })
            }
          />
          <InputTextField
            label="Nom du client / raison sociale"
            placeholder="Nom du client / Raison sociale"
            value={filterValues.nomClient}
            onChange={(e) =>
              setFilterValues({ ...filterValues, nomClient: e.target.value })
            }
          />
        </FilterContainer>
      )}

      <Box mt={6}>
        <ActiveTaskManager />
      </Box>
    </Box>
  );
};
