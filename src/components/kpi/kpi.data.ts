// Génère les données pour les petits donuts individuels à 2 segments réels
export const buildDonut = (
  segment1: number,
  segment2: number,
  color1: string,
  color2: string,
) => {
  const total = segment1 + segment2;
  return {
    labels: ["S1", "S2"],
    datasets: [
      {
        // Si les deux valeurs sont à 0, on met une valeur par défaut pour afficher l'anneau vide
        data: total === 0 ? [0, 100] : [segment1, segment2],
        backgroundColor:
          total === 0 ? ["#F3F4F4", "#F3F4F4"] : [color1, color2],
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };
};

// Génère les données du grand graphique global à 3 segments
export const buildGlobalDonut = () => ({
  labels: ["Dossiers", "Tâches", "Nouveau dossier"],
  datasets: [
    {
      data: [60, 25, 15], // Proportions de ton design cible
      backgroundColor: ["#1E90FF", "#FF8C00", "#66CBB7"], // dogerBlue.400, warnOrange.400, brandGreen.200
      borderWidth: 0,
    },
  ],
});
