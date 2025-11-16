// frontend/src/components/GraficoDenuncias.jsx
import { useMemo } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GraficoDenuncias({ denuncias }) {
  const dados = useMemo(() => {
    // Garante que é um array e não está vazio
    if (!Array.isArray(denuncias) || denuncias.length === 0) return null;

    const contagem = {};

    denuncias.forEach((d) => {
      if (!d) return;
      const tipo = d.tipo || "Não informado";
      contagem[tipo] = (contagem[tipo] || 0) + 1;
    });

    const labels = Object.keys(contagem);
    const valores = Object.values(contagem);

    if (labels.length === 0) return null;

    return {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data: valores,
          backgroundColor: "rgba(255, 140, 0, 0.6)",
          borderColor: "rgba(255, 140, 0, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [denuncias]);

  if (!dados) {
    return <p style={{ color: "#ccc" }}>Nenhuma denúncia para exibir.</p>;
  }

  return <Bar data={dados} />;
}
