import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ChartConfiguration,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Enregistrer les éléments nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
};

export default function SafeDoughnut({ data, options }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS<"doughnut"> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Détruire le chart existant avant de créer un nouveau
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.warn("Erreur destruction chart:", errorMessage);
      }
    }

    try {
      // Créer une nouvelle instance du chart
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const config: ChartConfiguration<"doughnut"> = {
        type: "doughnut",
        data: data,
        options: {
          ...options,
          responsive: true,
          maintainAspectRatio: true,
        },
      };

      chartInstanceRef.current = new ChartJS(ctx, config);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error("Erreur création chart:", errorMessage);
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        } catch (e) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          console.warn("Erreur cleanup chart:", errorMessage);
        }
      }
    };
  }, [data, options]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
