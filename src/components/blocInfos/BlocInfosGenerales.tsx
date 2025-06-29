import { Box, Flex, Icon, Text, Grid, GridItem } from "@chakra-ui/react";
import { FaRegClipboard } from "react-icons/fa";

const GeneralInfoBlock = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={6}
      p={6}
      bg="#F4F6FA"
      borderRadius="xl"
    >
      <Flex
        direction="column"
        w={{ base: "100%", md: "280px" }}
        minW="280px"
        bg="white"
        borderRadius="xl"
        p={6}
        boxShadow="lg"
      >
        <Text fontWeight="semibold" mb={4} whiteSpace="nowrap">
          Informations général du dossier
        </Text>

        <Box
          bg="#FCFCFF"
          flex="1"
          p={4}
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaRegClipboard} boxSize={150} color="gray.600" />
        </Box>
      </Flex>

      <Flex
        direction="column"
        flex="1"
        bg="white"
        borderRadius="xl"
        p={6}
        boxShadow="lg"
      >
        <Text fontWeight="semibold" mb={4}>
          Infos
        </Text>

        <Box>
          <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
            <GridItem>
              <Text fontWeight="semibold">Référence du dossier</Text>
              <Text color="gray.500">AB-EER-2023</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Type de dossier</Text>
              <Text color="gray.500">EER</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Type de personne</Text>
              <Text color="gray.500">PERSONNE PHYSIQUE</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Responsable du dossier</Text>
              <Text color="gray.500">Nom du commercial</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Date d’expiration</Text>
              <Text color="gray.500">01/01/2023</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Initiateur</Text>
              <Text color="gray.500">Nom de l’agent</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Statut</Text>
              <Text color="gray.500">Validé</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Code exploitant</Text>
              <Text color="gray.500">00251452</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold">Autre info</Text>
              <Text color="gray.500">Valeur</Text>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GeneralInfoBlock;
