import React from 'react'
import type { NavigationTab, Period, PlaceReading } from '../types'
import {
  computeCityMetrics,
  districtsList,
  levelLabels,
  hourlyTrendHistory,
} from '../data/noiseData'
import { MetricCard } from '../components/MetricCard'
import { SoundBadge } from '../components/SoundBadge'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Compass,
  Heart,
  Layers,
  MapPin,
  Radio,
  Sparkles,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react'

interface OverviewSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

const distributionPeriodClass: Record<Period, string> = {
  Manhã: 'morning',
  Tarde: 'afternoon',
  Noite: 'night',
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const metrics = computeCityMetrics(period)

  // Percentuais de distribuição sonora
  const totalReadings = metrics.quietZones + metrics.moderateZones + metrics.warningZones
  const quietPct = Math.round((metrics.quietZones / totalReadings) * 100)
  const moderatePct = Math.round((metrics.moderateZones / totalReadings) * 100)
  const warningPct = Math.round((metrics.warningZones / totalReadings) * 100)

  return (
    <div className="section-overview">
      {/* City Status Banner */}
      <section className="city-status-banner" aria-labelledby="overview-heading">
        <div className="banner-content">
          <div className="banner-badge-group">
            <span className="live-badge">
              <span className="live-dot" aria-hidden="true" />
              Monitoramento Simulado
            </span>
            <span className="period-indicator-tag">Período da {period}</span>
          </div>
          <h1 id="overview-heading" className="banner-title">
            Centro de Monitoramento Acústico Urbano
          </h1>
          <p className="banner-copy">
            Acompanhe a pulsação sonora da cidade em tempo real simulado. Mapeamento inteligente projetado para apoiar o bem-estar sensorial de pessoas neurodivergentes, proteger zonas hospitalares e orientar o planejamento urbano sustentável.
          </p>
        </div>

        <div className="banner-summary-pills">
          <div className="summary-pill">
            <span className="pill-title">Pressão Sonora Média</span>
            <div className="pill-value-row">
              <strong>{metrics.avgDb}</strong>
              <span>dB(A)</span>
            </div>
            <span className="pill-sub">
              {metrics.avgDb < 55 ? 'Nível Confortável' : metrics.avgDb < 70 ? 'Nível Moderado Urbano' : 'Nível Elevado'}
            </span>
          </div>

          <div className="summary-pill highlight">
            <span className="pill-title">Oásis de Silêncio Agora</span>
            <div className="pill-value-row">
              <strong className="oasis-name">{metrics.quietestPlace.name}</strong>
            </div>
            <span className="pill-sub">
              {metrics.quietestPlace.decibels} dB · Perfeito para descompressão
            </span>
          </div>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="kpi-grid" aria-label="Indicadores chave da cidade">
        <MetricCard
          label="Média Urbana"
          value={metrics.avgDb}
          unit="dB"
          description={`Calculada a partir de ${metrics.totalSensors} sensores simulados ativos`}
          badge={{
            text: metrics.avgDb < 60 ? 'Estável' : 'Atenção comercial',
            variant: metrics.avgDb < 60 ? 'calm' : 'moderate',
          }}
          icon={<Activity size={20} />}
        />

        <MetricCard
          label="Zonas Tranquilas"
          value={`${metrics.quietZones}`}
          unit={`locais (${quietPct}%)`}
          description="Ruído < 55 dB, adequadas para descanso e pessoas com TEA"
          badge={{ text: 'Conforto Sensorial', variant: 'calm' }}
          icon={<Volume1 size={20} />}
        />

        <MetricCard
          label="Zonas em Atenção"
          value={`${metrics.warningZones}`}
          unit={`locais (${warningPct}%)`}
          description="Ruído > 70 dB, vias de grande circulação ou comércio intenso"
          badge={{ text: metrics.warningZones > 0 ? 'Pico Ativo' : 'Calmo', variant: 'intense' }}
          icon={<Volume2 size={20} />}
        />

        <MetricCard
          label="Rede de Sensores IoT"
          value={`${metrics.activeSensors}/${metrics.totalSensors}`}
          unit="online"
          description="Sensores simulados transmitindo telemetria contínua via LoRaWAN"
          badge={{ text: '100% Operacional', variant: 'calm' }}
          icon={<Radio size={20} />}
        />

        <MetricCard
          label="Alertas (24h)"
          value={`${metrics.alertsLast24h}`}
          unit="ocorrências"
          description="Detecções de recorrência e desvios de limites de silêncio"
          badge={{ text: 'Simulado', variant: 'primary' }}
          icon={<AlertTriangle size={20} />}
        />
      </section>

      {/* Split Hero: Quick Map CTA & Sensory Compass */}
      <section className="overview-split-grid" aria-label="Destaques de navegação e conforto">
        {/* Left Column: Interactive Map Launcher Card */}
        <article className="feature-card map-feature-card">
          <div className="card-top">
            <div>
              <span className="card-category-label">Cartografia Sonora</span>
              <h2 className="card-heading">Mapa Acústico da Cidade</h2>
              <p className="card-text">
                Explore a malha viária com 12 sensores e camadas de calor acústico. Identifique ruas tranquilas, hospitais protegidos e avenidas em sobrecarga sonora.
              </p>
            </div>
            <button
              type="button"
              className="action-link-btn"
              onClick={() => onNavigate('mapa')}
              aria-label="Abrir mapa acústico completo"
            >
              <span>Abrir Mapa Completo</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="map-teaser-preview" onClick={() => onNavigate('mapa')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onNavigate('mapa')} aria-label="Visualização prévia do mapa. Clique para abrir">
            <div className="teaser-roads-preview" aria-hidden="true" />
            <div className="teaser-pin pin-quiet">
              <span className="pin-dot calm" />
              <span className="pin-label">Parque das Águas (44 dB)</span>
            </div>
            <div className="teaser-pin pin-hospital">
              <span className="pin-dot moderate" />
              <span className="pin-label">Hospital Dr. Arnaldo (63 dB)</span>
            </div>
            <div className="teaser-pin pin-loud">
              <span className="pin-dot intense" />
              <span className="pin-label">Av. Central (73 dB)</span>
            </div>
            <div className="teaser-overlay-text">
              <Compass size={18} aria-hidden="true" />
              <span>Clique para navegar no mapa interativo com heatmap</span>
            </div>
          </div>

          <div className="card-footer-metrics">
            <div className="quick-metric">
              <span className="qm-label">Local mais calmo:</span>
              <button
                type="button"
                className="quiet-link-btn"
                onClick={() => {
                  onSelectPlace(metrics.quietestPlace.name)
                  onNavigate('mapa')
                }}
              >
                {metrics.quietestPlace.name} ({metrics.quietestPlace.decibels} dB)
              </button>
            </div>
            <div className="quick-metric">
              <span className="qm-label">Local mais intenso:</span>
              <span className="intense-tag">
                {metrics.loudestPlace.name} ({metrics.loudestPlace.decibels} dB)
              </span>
            </div>
          </div>
        </article>

        {/* Right Column: Sensory Oasis & Social Mission Card */}
        <div className="overview-side-cards">
          <article className="feature-card social-oasis-card">
            <div className="oasis-card-header">
              <div className="oasis-icon-circle" aria-hidden="true">
                <Heart size={22} />
              </div>
              <div>
                <span className="card-category-label">Acessibilidade Sensorial</span>
                <h3 className="card-heading">Oásis de Conforto Acústico</h3>
              </div>
            </div>
            <p className="card-text">
              Para pessoas no espectro autista e hipersensíveis ao som, o excesso de decibéis causa exaustão física e mental. O Sonitus indica áreas de amortecimento sonoro natural:
            </p>

            <ul className="oasis-quick-list" aria-label="Recomendações sensoriais imediatas">
              <li className="oasis-item">
                <div className="oasis-item-info">
                  <strong>Parque das Águas</strong>
                  <span>Área verde preservada · 44 dB</span>
                </div>
                <SoundBadge level="tranquilo" decibels={44} size="sm" />
              </li>
              <li className="oasis-item">
                <div className="oasis-item-info">
                  <strong>Vila Serena / Praça dos Ipês</strong>
                  <span>Tráfego calmo e árvores densas · 50 dB</span>
                </div>
                <SoundBadge level="tranquilo" decibels={50} size="sm" />
              </li>
              <li className="oasis-item">
                <div className="oasis-item-info">
                  <strong>Jardim Aurora / Hortênsias</strong>
                  <span>Corredor arborizado público · 48 dB</span>
                </div>
                <SoundBadge level="tranquilo" decibels={48} size="sm" />
              </li>
            </ul>

            <button
              type="button"
              className="action-btn secondary-btn"
              onClick={() => onNavigate('zonas-sensiveis')}
            >
              <span>Ver Guia Completo de Conforto Sensorial</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </article>

          {/* Quick Hardware & Tech Link */}
          <article className="feature-card tech-teaser-card">
            <div className="tech-teaser-content">
              <div className="tech-icon-circle" aria-hidden="true">
                <Radio size={20} />
              </div>
              <div>
                <span className="card-category-label">Hardware & IoT</span>
                <h4 className="card-subheading">Como os dados chegariam à plataforma?</h4>
                <p className="tech-teaser-text">
                  Conheça o protótipo 3D do <strong>Sensor Sonitus Node v1.2</strong> e a arquitetura Edge Computing com ESP32 e LoRaWAN.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="action-btn outline-btn"
              onClick={() => onNavigate('tecnologia')}
            >
              <span>Inspecionar Sensor 3D</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </article>
        </div>
      </section>

      {/* Analytics & 24h Rhythm Section */}
      <section className="analytics-section" aria-labelledby="analytics-heading">
        <div className="analytics-header">
          <div>
            <span className="card-category-label">Análise Temporal</span>
            <h2 id="analytics-heading" className="card-heading">
              Ritmo da Cidade: Evolução do Ruído nas Últimas 24 Horas
            </h2>
            <p className="card-text">
              Comparativo da média urbana simulada contra referências recomendadas de silêncio para áreas sensíveis.
            </p>
          </div>
          <div className="analytics-legend" aria-label="Legenda do gráfico de ritmo diário">
            <span className="legend-entry">
              <span className="legend-color-box avg-city-box" aria-hidden="true" />
              Média da Cidade (dB)
            </span>
            <span className="legend-entry">
              <span className="legend-color-box threshold-who-box" aria-hidden="true" />
              Limite Recomendado OMS (55 dB)
            </span>
            <span className="legend-entry">
              <span className="legend-color-box alert-threshold-box" aria-hidden="true" />
              Faixa Crítica (&gt; 70 dB)
            </span>
          </div>
        </div>

        {/* 24h Hourly Curve Chart */}
        <div className="chart-scroll-area" tabIndex={0} role="region" aria-label="Gráfico de evolução sonora da cidade ao longo das 24 horas">
          <p className="chart-scroll-hint">Deslize horizontalmente para ver todos os horários.</p>
          <div className="chart-container-24h" role="img" aria-label="Gráfico de evolução sonora da cidade ao longo das 24 horas">
            <div className="chart-grid-lines" aria-hidden="true">
              <div className="grid-line line-75"><span className="grid-label">75 dB - Crítico</span></div>
              <div className="grid-line line-65"><span className="grid-label">65 dB - Comercial</span></div>
              <div className="grid-line line-55"><span className="grid-label">55 dB - Limite OMS</span></div>
              <div className="grid-line line-45"><span className="grid-label">45 dB - Conforto</span></div>
            </div>

            <div className="bars-track-24h">
              {hourlyTrendHistory.map((item) => {
                const levelClass =
                  item.avgCity < 55 ? 'tranquilo' : item.avgCity < 70 ? 'moderado' : 'intenso'
                return (
                  <div key={item.hour} className="hour-col">
                    <span className="hour-val">{item.avgCity} dB</span>
                    <div className="col-bar-track">
                      <div
                        className={`col-bar hour-${item.hour.slice(0, 2)} ${levelClass}`}
                      />
                    </div>
                    <span className="hour-time">{item.hour}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Distribution Bar */}
        <div className="distribution-card">
          <div className="distribution-header">
            <span className="dist-title">Distribuição Acústica da Cidade ({period})</span>
            <div className="dist-tags">
              <span className="dist-tag calm">Tranquilo: {quietPct}%</span>
              <span className="dist-tag moderate">Moderado: {moderatePct}%</span>
              <span className="dist-tag intense">Intenso: {warningPct}%</span>
            </div>
          </div>
          <div className={`distribution-bar distribution-${distributionPeriodClass[period]}`} role="progressbar" aria-valuenow={quietPct} aria-valuemin={0} aria-valuemax={100} aria-label="Distribuição percentual de níveis de ruído na cidade">
            <div className="dist-segment calm" title={`Tranquilo: ${quietPct}%`} />
            <div className="dist-segment moderate" title={`Moderado: ${moderatePct}%`} />
            <div className="dist-segment intense" title={`Intenso: ${warningPct}%`} />
          </div>
        </div>

        {/* Accessible Text Table Fallback */}
        <details className="chart-accessible-table">
          <summary>Ver dados detalhados da curva de 24 horas em tabela acessível</summary>
          <div className="table-wrapper">
            <table className="data-table-accessible">
              <caption>Leituras simuladas horárias por distrito urbano (dB LAeq)</caption>
              <thead>
                <tr>
                  <th scope="col">Horário</th>
                  <th scope="col">Média Cidade</th>
                  <th scope="col">Centro</th>
                  <th scope="col">Jardim Aurora</th>
                  <th scope="col">Distrito Saúde</th>
                  <th scope="col">Vila Serena</th>
                  <th scope="col">Eixo Leste</th>
                </tr>
              </thead>
              <tbody>
                {hourlyTrendHistory.map((row) => (
                  <tr key={row.hour}>
                    <th scope="row">{row.hour}</th>
                    <td><strong>{row.avgCity} dB</strong></td>
                    <td>{row.centro} dB</td>
                    <td>{row.jardimAurora} dB</td>
                    <td>{row.distritoSaude} dB</td>
                    <td>{row.vilaSerena} dB</td>
                    <td>{row.eixoLeste} dB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </div>
  )
}
