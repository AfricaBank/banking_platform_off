import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";

const DossierInfo = () => {
  return (
    <Flex
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="sm"
      align="center"
      gap={4}
    >
      {/* Section gauche */}
      <Box
        bg="blue.100"
        p={4}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minW="200px"
      >
        <FiFileText size={40} />
        <Text fontWeight="bold" mt={2} textAlign="center">
          Information Générales du dossier
        </Text>
      </Box>
      
      {/* Section droite */}
      <Box
        border="1px solid"
        borderColor="blue.300"
        borderRadius="md"
        p={4}
        flex="1"
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem><Text fontWeight="bold">Référence du dossier :</Text> AB-EER-2024</GridItem>
          <GridItem><Text fontWeight="bold">Type de personne :</Text> Personne Physique</GridItem>
          <GridItem><Text fontWeight="bold">Code exploitant :</Text> CC10</GridItem>
          
          <GridItem><Text fontWeight="bold">Type de dossier :</Text> EER</GridItem>
          <GridItem><Text fontWeight="bold">Responsable du dossier :</Text> Commercial 10</GridItem>
          <GridItem><Text fontWeight="bold">Statut :</Text> Instruire</GridItem>
          
          <GridItem><Text fontWeight="bold">Initiateur :</Text> Commercial 10</GridItem>
          <GridItem><Text fontWeight="bold">Date de création :</Text> 10/01/2024</GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export default DossierInfo;
