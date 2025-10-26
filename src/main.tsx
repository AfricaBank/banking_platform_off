import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Dashboard } from "./pages/Dashboard";
import { Gestionsgroupes } from "./pages/Gestiongroupes";
import { Gestionroles } from "./pages/Gestionroles";
import { Tachesactives } from "./pages/Tachesactives";
import { Gestiondossiers } from "./pages/Gestiondossiers";
import { Gestionagents } from "./pages/Gestionagents.tsx";
import { system } from "./theme";
import InitiationDossier from "@/components/pageContents/InitiationDossier.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "groupes",
        element: <Gestionsgroupes />,
      },
      {
        path: "roles",
        element: <Gestionroles />,
      },
      {
        path: "agents",
        element: <Gestionagents />,
      },
      {
        path: "taches",
        element: <Tachesactives />,
      },
      {
        path: "dossiers",
        element: <Gestiondossiers />,
      },
      {
        path: "initiation",
        element: <InitiationDossier />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
