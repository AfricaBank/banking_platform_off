import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { App } from "./App";
import Login from "./login/Login";
import { Dashboard } from "./pages/Dashboard";
import { Gestionsgroupes } from "./pages/Gestiongroupes";
import { Gestionroles } from "./pages/Gestionroles";
import { Tachesactives } from "./pages/Tachesactives";
import { Gestiondossiers } from "./pages/Gestiondossiers";
import { Gestionagents } from "./pages/Gestionagents.tsx";
import { system } from "./theme";
import InitiationDossier from "@/components/pageContents/InitiationDossier.tsx";
import RecherchePersonne from "@/components/pageContents/RecherchePersonne.tsx";
import { DossierProvider } from "@/context/DossierContext";
import { NouveauGroup } from "./module-management/gestion-des-group/NouveauGroup.tsx";
import { DetailsGroup } from "./module-management/gestion-des-group/DetailsGroup.tsx";
import { ModifierGroup } from "./module-management/gestion-des-group/ModifierGroup.tsx";
import { NouvelAgent } from "./module-management/gestion-des-agents/NouvelAgent.tsx";
import { DetailAgent } from "./module-management/gestion-des-agents/DetailAgent.tsx";
import { ModifierAgent } from "./module-management/gestion-des-agents/ModifierAgent.tsx";
import { NouveauRole } from "./module-management/gestion-des-roles/NouveauRole.tsx";
import { ModifierRole } from "./module-management/gestion-des-roles/ModifierRole.tsx";
import { DetailsRole } from "./module-management/gestion-des-roles/DetailsRole.tsx";
import DossierSynthese from "@/components/pageContents/DossierSynthese.tsx";

const router = createBrowserRouter([
  // 1. Route racine qui affiche l'écran de Login de manière indépendante (sans Sidebar)
  {
    path: "/",
    element: <Login />,
  },
  
  // 2. Espace connecté enveloppé par le layout principal de l'application (<App />)
  {
    path: "/",
    element: <App />,
    children: [
      // Si un utilisateur accède à un chemin vide dans l'application, on peut le rediriger par défaut
      { path: "", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "groupes",
        children: [
          { path: "", element: <Gestionsgroupes /> },
          { path: "nouveau", element: <NouveauGroup /> },
          { path: ":id", element: <DetailsGroup /> },
          { path: ":id/modifier", element: <ModifierGroup /> },
        ],
      },
      {
        path: "roles",
        children: [
          { path: "", element: <Gestionroles /> },
          { path: "nouveau", element: <NouveauRole /> },
          { path: ":id", element: <DetailsRole /> },
          { path: ":id/modifier", element: <ModifierRole /> },
        ],
      },
      {
        path: "agents",
        children: [
          { path: "", element: <Gestionagents /> },
          { path: "nouveau", element: <NouvelAgent /> },
          { path: ":id", element: <DetailAgent /> },
          { path: ":id/modifier", element: <ModifierAgent /> },
        ],
      },
      {
        path: "taches",
        children: [
          { path: "", element: <Tachesactives /> },
          { path: ":id", element: <DetailAgent /> },
        ],
      },
      { path: "dossiers", element: <Gestiondossiers /> },
      { path: "initiation", element: <InitiationDossier /> },
      { path: "recherchePersonne", element: <RecherchePersonne /> },
      { path: "dossier-synthese", element: <DossierSynthese /> },
    ],
  },
  
  // Route de secours (fallback) si l'utilisateur saisit une URL inexistante
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <DossierProvider>
        <RouterProvider router={router} />
      </DossierProvider>
    </ChakraProvider>
  </StrictMode>,
);