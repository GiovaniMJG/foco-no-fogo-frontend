// frontend/src/components/FiltroDenuncias.jsx
import { useState, useEffect } from "react";
import { useBairros } from "../hooks/useBairros";
import "./FiltroDenuncias.css";
const TIPOS_PADRAO = [
 "Fumaça suspeita",
 "Queimada em terreno baldio",
 "Queimada urbana",
 "Outro",
];
export default function FiltroDenuncias({ selecionados, onAplicarFiltros }) {
 const bairros = useBairros();
 const [tiposSel, setTiposSel] = useState(selecionados.tipos);
 const [bairrosSel, setBairrosSel] = useState(selecionados.bairros);
 useEffect(() => {
 setTiposSel(selecionados.tipos || []);
 setBairrosSel(selecionados.bairros || []);
 }, [selecionados]);
 const toggle = (lista, setLista, valor) => {
 setLista((prev) =>
 prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
 );
 };
 const aplicar = () => {
 onAplicarFiltros({ tipos: tiposSel, bairros: bairrosSel });
 };
 return (
 <div className="filtro-wrapper">
 <h2 className="filtro-titulo">Filtros ■</h2>
 <div className="filtro-bloco">
 <div className="filtro-bloco-topo">
 <h3>Tipos de denúncia</h3>
 </div>
 <div className="filtro-lista">
 {TIPOS_PADRAO.map((tipo) => (
 <label key={tipo} className="filtro-item">
 <input
 type="checkbox"
 checked={tiposSel.includes(tipo)}
 onChange={() => toggle(tiposSel, setTiposSel, tipo)}
 />
 <span>{tipo}</span>
 </label>
 ))}
 </div>
 </div>
 <div className="filtro-bloco">
 <div className="filtro-bloco-topo">
 <h3>Bairros</h3>
 </div>
 <div className="filtro-lista">
 {bairros.length === 0 && (
 <p className="filtro-vazio">Carregando bairros...</p>
 )}
 {bairros.map((b) => (
 <label key={b.nome} className="filtro-item">
 <input
 type="checkbox"
 checked={bairrosSel.includes(b.nome)}
 onChange={() => toggle(bairrosSel, setBairrosSel, b.nome)}
 />
 <span>{b.nome}</span>
 </label>
 ))}
 </div>
 </div>
 <button type="button" className="filtro-botao-aplicar" onClick={aplicar}>
 Aplicar filtros
 </button>
 </div>
 );
}
