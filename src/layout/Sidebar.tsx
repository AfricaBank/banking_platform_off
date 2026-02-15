import { Grid, GridItem, Box, Text, Image, chakra } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/logo/logo1.png";
import icondashboard from "../assets/icons/vector1.png";
import tachesactives from "../assets/icons/vector5.png";
import agent from "../assets/icons/vector4.png";
import role from "../assets/icons/vector3.png";
import groupe from "../assets/icons/vector2.png";
import dossier from "../assets/icons/vector6.png";

const ChakraLink = chakra(Link);

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: icondashboard },
    { path: "/groupes", label: "Gestion des groupes", icon: groupe },
    { path: "/roles", label: "Gestion des rôles", icon: role },
    { path: "/agents", label: "Gestion des agents", icon: agent },
    { path: "/taches", label: "Taches actives", icon: tachesactives },
    { path: "/dossiers", label: "Gestion des dossiers", icon: dossier },
  ];

  return (
    <Grid
      as="nav"
      bg="sidebar.bg"
      color="text.main"
      height="100vh"
      padding={isCollapsed ? 4 : 8}
      width={isCollapsed ? "80px" : "299px"}
      transition="all 0.3s ease"
      position="fixed"
      left={0}
      top={0}
      templateRows="auto 1fr"
      gap={10}
      boxShadow="sm"
    >
      <GridItem>
        <Link to="/dashboard">
          <Image
            src={logo1}
            alt="Logo"
            maxW={isCollapsed ? "40px" : "170px"}
            transition="max-width 0.3s"
          />
        </Link>
      </GridItem>

      <GridItem>
        <Box display="flex" flexDirection="column" gap={4}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ChakraLink
                key={item.path}
                to={item.path}
                display="flex"
                alignItems="center"
                padding="10px"
                borderRadius="md"
                height="45px"
                transition="all 0.2s"
                textDecoration="none"
                bg={active ? "sidebar.itemActive" : "transparent"}
                color={active ? "white" : "text.main"}
                _hover={{
                  bg: active ? "sidebar.itemActive" : "dogerBlue.50",
                  color: active ? "white" : "text.main",
                  textDecoration: "none",
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width="20px"
                  height="20px"
                  mr={isCollapsed ? 0 : 4}
                  filter={active ? "brightness(0) invert(1)" : "none"}
                />

                {!isCollapsed && (
                  <Text fontSize="md" fontWeight="bold" whiteSpace="nowrap">
                    {item.label}
                  </Text>
                )}
              </ChakraLink>
            );
          })}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
