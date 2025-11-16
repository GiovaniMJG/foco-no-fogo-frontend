// frontend/src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

import FormularioDenuncia from "./components/FormularioDenuncia";
import FiltroDenuncias from "./components/FiltroDenuncias";
import MapaDenuncias from "./components/MapaDenuncias";
import EstatisticasPainel from "./components/EstatisticasPainel";
import GraficoDenuncias from "./components/GraficoDenuncias";
import GraficoTemporal from "./components/GraficoTemporal";

function App() {
  const [denuncias, setDenuncias] = useState([]);
  const [denunciasFiltradas, setDenunciasFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({ tipos: [], bairros: [] });
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [carregandoFiltro, setCarregandoFiltro] = useState(false);

  // Carrega denúncias na primeira montagem
  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("http://localhost:5000/api/denuncias");
        const data = await res.json();
        setDenuncias(data);
        setDenunciasFiltradas(data);
      } catch (err) {
        console.error("Erro ao carregar denúncias:", err);
      } finally {
        setCarregandoInicial(false);
      }
    }

    carregar();
  }, []);

  // Aplicar filtros localmente
  const aplicarFiltros = ({ tipos, bairros }) => {
    setCarregandoFiltro(true);
    setFiltros({ tipos, bairros });

    // Simples filtro local – se quiser depois dá pra mover para o backend
    let filtradas = [...denuncias];

    if (tipos && tipos.length > 0) {
      filtradas = filtradas.filter((d) => tipos.includes(d.tipo));
    }

    if (bairros && bairros.length > 0) {
      filtradas = filtradas.filter((d) => bairros.includes(d.localizacao));
    }

    setDenunciasFiltradas(filtradas);

    // Pequeno delay só pra dar sensação de “aplicando filtro” no overlay
    setTimeout(() => {
      setCarregandoFiltro(false);
    }, 400);
  };

  // Quando criar nova denúncia pelo formulário
  const handleDenunciaCriada = (nova) => {
    // adiciona no início da lista
    const atualizadas = [nova, ...denuncias];
    setDenuncias(atualizadas);

    // re-aplica filtros atuais em cima da nova lista
    let filtradas = [...atualizadas];

    if (filtros.tipos && filtros.tipos.length > 0) {
      filtradas = filtradas.filter((d) => filtros.tipos.includes(d.tipo));
    }

    if (filtros.bairros && filtros.bairros.length > 0) {
      filtradas = filtradas.filter((d) =>
        filtros.bairros.includes(d.localizacao)
      );
    }

    setDenunciasFiltradas(filtradas);
  };

  const exibindoOverlay = carregandoInicial || carregandoFiltro;

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
              {carregandoInicial
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
