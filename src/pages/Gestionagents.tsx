import { useState } from "react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { Box } from "@chakra-ui/react";

export const Gestionagents = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCreateAgent = () => {
    console.log("Ouverture du formulaire de création d'agent");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <Box>
        <ModuleActionHeader
          addLabel="Ajouter un agent"
          onAddClick={handleCreateAgent}
          onFilterToggle={toggleFilters}
          isFilterActive={isFilterVisible}
        />
      </Box>
    </>
  );
};
