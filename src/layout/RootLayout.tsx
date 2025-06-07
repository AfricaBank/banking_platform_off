import { useState } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar";

export const RootLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <Box width="full" margin="0px" padding="0px">
            <Grid
                templateAreas={`"nav header"
                        "nav main"
                        "nav footer"`}
                gridTemplateRows={"70px 1fr 50px"}
                gridTemplateColumns={isSidebarCollapsed ? "80px 1fr" : "299px 1fr"}
                height="100vh"
                gap="0.5"
                color="blackAlpha.700"
                fontWeight="bold"
                width="100%"
            >
                <GridItem
                    area={"header"}
                    background="white"
                    position="relative"
                    top="0"
                    zIndex="1"
                    height="70px"
                    width="auto"
                    border="1px solid green"
                >
                    <Header toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
                </GridItem>
                <GridItem area={"nav"} background="primary.dogerBlue.101">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </GridItem>
                <GridItem area={"main"} paddingLeft="2" border="1px solid red" borderColor="gray.500">
                    <Outlet />
                </GridItem>
                <GridItem paddingLeft="2" area={"footer"} border="1px solid black">
                    <Footer />
                </GridItem>
            </Grid>
        </Box>
    );
};
