// frontend/src/components/EstatisticasPainel.jsx
import "./EstatisticasPainel.css";
export default function EstatisticasPainel({ denuncias }) {
 if (!denuncias || denuncias.length === 0) {
 return (
 <div className="estat-card">
 <h3>■ Estatísticas</h3>
 <p className="estat-vazio">
 Nenhuma denúncia encontrada com os filtros atuais.
 </p>
 </div>
 );
 }
 const total = denuncias.length;
 const datasValidas = denuncias
 .map((d) => (d.data ? new Date(d.data) : null))
 .filter(Boolean)
 .sort((a, b) => b - a);
 const maisRecente = datasValidas[0]
 ? datasValidas[0].toLocaleDateString("pt-BR")
 : "-";
 const porTipo = {};
 denuncias.forEach((d) => {
 const tipo = d.tipo || "Não informado";
 porTipo[tipo] = (porTipo[tipo] || 0) + 1;
 });
 const tipoMaisComum = Object.entries(porTipo).sort((a, b) => b[1] - a[1])[0][0];
 return (
 <div className="estat-card">
 <h3>■ Estatísticas</h3>
 <div className="estat-grid">
 <div className="estat-item">
 <span className="estat-label">Total no mapa</span>
 <span className="estat-valor">{total}</span>
 </div>
 <div className="estat-item">
 <span className="estat-label">Tipo mais comum</span>
 <span className="estat-valor">{tipoMaisComum}</span>
 </div>
 <div className="estat-item">
 <span className="estat-label">Mais recente</span>
 <span className="estat-valor">{maisRecente}</span>
 </div>
 </div>
 </div>
 );
}
