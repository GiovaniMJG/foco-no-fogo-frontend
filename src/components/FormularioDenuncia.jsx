// frontend/src/components/FormularioDenuncia.jsx
import { useState } from "react";
import { useBairros } from "../hooks/useBairros";
import "./FormularioDenuncia.css";
export default function FormularioDenuncia({ onCriada }) {
 const bairros = useBairros();
 const [tipo, setTipo] = useState("");
 const [localizacao, setLocalizacao] = useState("");
 const [data, setData] = useState("");
 const [enviando, setEnviando] = useState(false);
 const [toast, setToast] = useState("");
 const mostrarToast = (msg) => {
 setToast(msg);
 setTimeout(() => setToast(""), 3000);
 };
 async function handleSubmit(e) {
 e.preventDefault();
 if (!tipo || !localizacao || !data) {
 mostrarToast("Preencha todos os campos.");
 return;
 }
 try {
 setEnviando(true);
 const body = { tipo, localizacao, data };
 const res = await fetch("https://foco-no-fogo-backend.onrender.com/api/denuncias", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(body),
 });
 const nova = await res.json();
 if (!res.ok) {
 mostrarToast("Erro ao registrar denúncia.");
 return;
 }
 onCriada(nova);
 mostrarToast("Denúncia registrada com sucesso!");
 setTipo("");
 setLocalizacao("");
 setData("");
 } catch (err) {
 console.error(err);
 mostrarToast("Erro ao conectar com o servidor.");
 } finally {
 setEnviando(false);
 }
 }
 return (
 <div className="form-wrapper">
 {toast && <div className="toast">{toast}</div>}
 <h2 className="form-titulo">■ Registrar Denúncia</h2>
 <form onSubmit={handleSubmit} className="formulario">
 <label className="campo">
 <span>Tipo de incêndio</span>
 <select
 value={tipo}
 onChange={(e) => setTipo(e.target.value)}
 required
 >
 <option value="">Selecione...</option>
 <option value="Fumaça suspeita">Fumaça suspeita</option>
 <option value="Queimada em terreno baldio">
 Queimada em terreno baldio
 </option>
 <option value="Queimada urbana">Queimada urbana</option>
 <option value="Outro">Outro</option>
 </select>
 </label>
 <label className="campo">
 <span>Bairro</span>
 <select
 value={localizacao}
 onChange={(e) => setLocalizacao(e.target.value)}
 required
 >
 <option value="">Selecione...</option>
 {bairros.map((b) => (
 <option key={b.nome} value={b.nome}>
 {b.nome}
 </option>
 ))}
 </select>
 </label>
 <label className="campo">
 <span>Data</span>
 <input
 type="date"
 value={data}
 onChange={(e) => setData(e.target.value)}
 required
 />
 </label>
 <button type="submit" className="btn" disabled={enviando}>
 {enviando ? "Enviando..." : "Registrar"}
 </button>
 </form>
 </div>
 );
}
