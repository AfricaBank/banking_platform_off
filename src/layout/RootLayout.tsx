import { useState } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar";

export const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    // On s'assure que le conteneur prend tout l'écran sans causer de barres de défilement externes
    <Box width="100vw" height="100vh" overflow="hidden" bg="gray.50">
      <Grid
        templateAreas={`
          "nav header"
          "nav main"
          "nav footer"
        `}
        gridTemplateRows={"70px 1fr auto"} // auto pour le footer s'adapte s'il est vide
        gridTemplateColumns={isSidebarCollapsed ? "80px 1fr" : "299px 1fr"}
        height="100%"
        width="100%"
        transition="grid-template-columns 0.2s ease-in-out" // Transition douce lors du repli
      >
        {/* 1. HEADER (Fixé en haut) */}
        <GridItem
          area={"header"}
          background="white"
          boxShadow="0 1px 2px rgba(0,0,0,0.05)"
          zIndex="10"
          display="flex"
          alignItems="center"
          px={4}
        >
          <Header
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </GridItem>

        {/* 2. SIDEBAR (Fixée à gauche, s'étire sur toute la hauteur) */}
        <GridItem area={"nav"} background="primary.dogerBlue.101" zIndex="20">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </GridItem>

        {/* 3. ZONE PRINCIPALE (La seule zone qui défile) */}
        <GridItem
          area={"main"}
          overflowY="auto" // Rend le défilement indépendant
          p={2} // Augmentation du padding pour respirer (conforme à vos maquettes)
          display="flex"
          flexDirection="column"
        >
          <Box flex="1">
            <Outlet />
          </Box>
        </GridItem>

        {/* 4. FOOTER (Optionnel ou discret tout en bas) */}
        <GridItem
          area={"footer"}
          background="white"
          borderTop="1px solid"
          borderColor="gray.100"
          py={2}
          px={6}
        >
          <Footer />
        </GridItem>
      </Grid>
    </Box>
  );
};
