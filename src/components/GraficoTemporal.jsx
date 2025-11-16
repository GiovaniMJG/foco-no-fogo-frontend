// frontend/src/components/GraficoTemporal.jsx
import {
 Chart as ChartJS,
 LineElement,
 CategoryScale,
 LinearScale,
 PointElement,
 Tooltip,
 Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
export default function GraficoTemporal({ denuncias }) {
 const dados = useMemo(() => {
 if (!denuncias || denuncias.length === 0) return null;
 const porData = {};
 denuncias.forEach((d) => {
 if (!d.data) return;
 const dia = d.data.substring(0, 10); // "YYYY-MM-DD"
 porData[dia] = (porData[dia] || 0) + 1;
 });
 const labels = Object.keys(porData).sort();
 const valores = labels.map((dia) => porData[dia]);
 return {
 labels,
 datasets: [
 {
 label: "Denúncias por dia",
 data: valores,
 borderColor: "rgba(255, 140, 0, 1)",
 backgroundColor: "rgba(255, 140, 0, 0.3)",
 tension: 0.3,
 },
 ],
 };
 }, [denuncias]);
 if (!dados) {
 return <p style={{ color: "#ccc" }}>Nenhuma denúncia para exibir.</p>;
 }
 return <Line data={dados} />;
}