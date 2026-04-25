import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";

export const Tachesactives = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCreateTask = () => {
    console.log("Ouverture du formulaire de création de tâche");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
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
    </Box>
  );
};
