// frontend/src/App.jsx
import "./App.css";

import { useDenuncias } from "./hooks/useDenuncias";
import { useState, useEffect } from "react";

import FormularioDenuncia from "./components/FormularioDenuncia";
import FiltroDenuncias from "./components/FiltroDenuncias";
import MapaDenuncias from "./components/MapaDenuncias";
import EstatisticasPainel from "./components/EstatisticasPainel";
import GraficoDenuncias from "./components/GraficoDenuncias";
import GraficoTemporal from "./components/GraficoTemporal";

function App() {
  // Busca denúncias automaticamente do backend render
  const denuncias = useDenuncias();

  // Estado para filtros
  const [denunciasFiltradas, setDenunciasFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({ tipos: [], bairros: [] });
  const [carregandoFiltro, setCarregandoFiltro] = useState(false);

  // Sempre que denuncias mudar → atualiza filtradas
  useEffect(() => {
    if (denuncias.length > 0) {
      setDenunciasFiltradas(denuncias);
    }
  }, [denuncias]);

  // Aplicar filtros locais
  const aplicarFiltros = ({ tipos, bairros }) => {
    setCarregandoFiltro(true);
    setFiltros({ tipos, bairros });

    let filtradas = [...denuncias];

    if (tipos && tipos.length > 0) {
      filtradas = filtradas.filter((d) => tipos.includes(d.tipo));
    }

    if (bairros && bairros.length > 0) {
      filtradas = filtradas.filter((d) => bairros.includes(d.localizacao));
    }

    setDenunciasFiltradas(filtradas);

    // Delay visual
    setTimeout(() => {
      setCarregandoFiltro(false);
    }, 300);
  };

  // Quando uma denúncia é criada
  const handleDenunciaCriada = (nova) => {
    // força recarregar tudo chamando a API novamente
    window.location.reload();
  };

  const exibindoOverlay =
    denuncias.length === 0 && !carregandoFiltro ? true : carregandoFiltro;

  return (
    <div className="app-root">
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">🔥</div>
          <div className="sidebar-titles">
            <h1>Foco no Fogo</h1>
            <span className="sidebar-subtitle">
              Monitoramento de queimadas em Americana-SP
            </span>
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Visão geral</h2>
          <p>
            Acompanhe denúncias de focos de incêndio por bairro, tipo e período,
            auxiliando a tomada de decisão de órgãos públicos e defesa civil.
          </p>
        </div>

        <div className="sidebar-section">
          <FiltroDenuncias
            selecionados={filtros}
            onAplicarFiltros={aplicarFiltros}
          />
        </div>

        <div className="sidebar-footer">
          <small>Projeto Integrador 2 • ADS • FATEC</small>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div>
            <h2>Painel de Monitoramento</h2>
            <p>
              Denúncias georreferenciadas, estatísticas e visualização temporal
              em um único painel.
            </p>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            <span>API online</span>
          </div>
        </header>

        <main className="app-content">
          <section className="content-row content-row-top">
            <div className="card card-mapa">
              <h3>Mapa de denúncias</h3>
              <div className="card-mapa-wrapper">
                <MapaDenuncias denuncias={denunciasFiltradas} />
              </div>
            </div>
          </section>

          <section className="content-row">
            <div className="card card-form">
              <FormularioDenuncia onCriada={handleDenunciaCriada} />
            </div>
            <div className="card card-estat">
              <EstatisticasPainel denuncias={denunciasFiltradas} />
            </div>
          </section>

          <section className="content-row content-row-graficos">
            <div className="card card-grafico">
              <div className="card-header-inline">
                <h3>Distribuição por tipo</h3>
              </div>
              <GraficoDenuncias denuncias={denunciasFiltradas} />
            </div>
            <div className="card card-grafico">
              <div className="card-header-inline">
                <h3>Ocorrências ao longo do tempo</h3>
              </div>
              <GraficoTemporal denuncias={denunciasFiltradas} />
            </div>
          </section>
        </main>
      </div>

      {exibindoOverlay && (
        <div className="app-overlay">
          <div className="overlay-box">
            <div className="spinner" />
            <p>
              {denuncias.length === 0
                ? "Carregando denúncias..."
                : "Aplicando filtros..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
