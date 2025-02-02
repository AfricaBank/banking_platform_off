import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar";

export const RootLayout = () => {
  return (
    <Grid
      templateAreas={`"nav header"
                        "nav main"
                        "nav footer"`}
      gridTemplateRows={"70px 1fr 50px"}
      gridTemplateColumns={"299px 1fr"}
      height="100vh"
      gap="0.5"
      color="blackAlpha.700"
      fontWeight="bold"
      overflow="hidden"
      pr="5px"
    >
      <GridItem
        area={"header"}
        background="white"
        top="0"
        left="0"
        zIndex="1"
        height="70px"
        width="100%"
        maxWidth="1200px"
        border="1px solid green"
        position="sticky"
        margin="0 auto"
        overflow="hidden"
      >
        <Header />
      </GridItem>
      <GridItem
        area={"nav"}
        background="primary.dogerBlue.101"
        position="sticky"
        left="0"
      >
        <Sidebar />
      </GridItem>
      <GridItem
        area={"main"}
        paddingLeft="2"
        border="1px solid red"
        borderColor="gray.500"
        w="100%"
        maxWidth="1200px"
        margin="0 auto"
        padding="20px"
        overflowY="auto"
        scrollbarWidth="none"
      >
        <Outlet />
      </GridItem>
      <GridItem
        paddingLeft="2"
        area={"footer"}
        border="1px solid black"
        w="100%"
        maxWidth="1200px"
        margin="0 auto"
        scrollbarWidth="none"
      >
        <Footer />
      </GridItem>
    </Grid>
  );
};
