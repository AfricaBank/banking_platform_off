// Configuration des bouton action de la liste des dossier
import { HiPlus, HiPencil } from "react-icons/hi";
import { FaShareFromSquare } from "react-icons/fa6";

export const actions = [
  {
    label: "Démarrer EER",
    icon: HiPlus,
    to: "/initiation",
    bg: "dogerBlue.500",
    width: "180px",
  },
  {
    label: "Réviser un compte",
    icon: HiPencil,
    onClick: () => console.log(" Revision ..."),
    bg: "sidebar.itemActive",
    width: "200px",
  },
  {
    label: "Exporter des comptes",
    icon: FaShareFromSquare,
    onClick: () => console.log("Export..."),
    bg: "brandGreen.400",
    width: "220px",
  },
];
