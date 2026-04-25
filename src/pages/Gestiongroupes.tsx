import { ModuleActionHeader } from "@/components/moduleComponents/ModuleActionHeader.tsx";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
export const Gestionsgroupes = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCreateGroup = () => {
    console.log("Logique pour ouvrir le formulaire de création de groupe");
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <>
      <Box p={2}>
        <ModuleActionHeader
          addLabel="Créer un groupe"
          onAddClick={handleCreateGroup}
          onFilterToggle={() => setIsFilterVisible(!toggleFilters)}
          isFilterActive={isFilterVisible}
        />
      </Box>
    </>
  );
};
