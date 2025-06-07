import { Grid, GridItem } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/logo/logo1.png";
import icondashboard from "../assets/icons/vector1.png";
import tachesactives from "../assets/icons/vector5.png";
import agent from "../assets/icons/vector4.png";
import role from "../assets/icons/vector3.png";
import groupe from "../assets/icons/vector2.png";
import dossier from "../assets/icons/vector6.png";
import "../styles/sidebar.css";

const Sidebar = ({ isCollapsed }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Grid
            templateAreas={`"logo"
                      "dashboard"
                      "groupes"
                      "roles"
                      "agents"
                      "taches"
                      "dossiers"`}
            gridTemplateRows="auto repeat(6, 30px)"
            gap={6}
            color="black"
            alignItems="center"
            fontWeight="bold"
            padding={isCollapsed ? 2 : 10}
            width={isCollapsed ? "80px" : "299px"}
            transition="width 0.3s ease-in-out"
            position="fixed"
        >
            <GridItem>
                <Link to="/dashboard">
                    <img src={logo1} alt="Logo" width={isCollapsed ? 40 : 170} height={40} />
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/dashboard"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/dashboard") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={icondashboard} alt="Dashboard" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Dashboard"}
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/groupes"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/groupes") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={groupe} alt="Gestion des groupes" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Gestion des groupes"}
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/roles"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/roles") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={role} alt="Gestion des rôles" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Gestion des rôles"}
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/agents"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/agents") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={agent} alt="Gestion des agents" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Gestion des agents"}
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/taches"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/taches") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={tachesactives} alt="Taches actives" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Taches actives"}
                </Link>
            </GridItem>

            <GridItem>
                <Link
                    to="/dossiers"
                    className="navLinkHover"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/dossiers") ? "dodgerblue" : "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        height: 40
                    }}
                >
                    <img src={dossier} alt="Gestion des dossiers" style={{ marginRight: isCollapsed ? "0" : "10px" }} />
                    {!isCollapsed && "Gestion des dossiers"}
                </Link>
            </GridItem>
        </Grid>
    );
};

export default Sidebar;
