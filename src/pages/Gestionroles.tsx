import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";

export const Gestionroles = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCreateRole = () => {
    console.log("Ouverture du formulaire de création de rôle");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <Box p={2}>
      <ModuleActionHeader
        addLabel="Définir un rôle"
        onAddClick={handleCreateRole}
        onFilterToggle={toggleFilters}
        isFilterActive={isFilterVisible}
      />
    </Box>
  );
};
