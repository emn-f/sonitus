import React, { useMemo, useState } from 'react'
import type { NavigationTab, Period } from '../types'
import { computeCityMetrics, hourlyTrendHistory } from '../data/noiseData'
import { ArrowRight, Coffee, Heart, Map, Search, SlidersHorizontal, Sparkles, Trees, Volume2 } from 'lucide-react'

interface OverviewSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

const quickFilters = [
  { label: 'Agora', icon: Sparkles },
  { label: 'Próximas 2h' },
  { label: 'Parques e jardins', icon: Trees },
  { label: 'Cafés silenciosos', icon: Coffee },
]

export const OverviewSection: React.FC<OverviewSectionProps> = ({ period, onNavigate, onSelectPlace }) => {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Agora')
  const metrics = computeCityMetrics(period)
  const calmestHour = hourlyTrendHistory.reduce((calmest, item) => item.avgCity < calmest.avgCity ? item : calmest)
  const chartPoints = useMemo(() => hourlyTrendHistory.map((item, index) => {
    const x = (index / (hourlyTrendHistory.length - 1)) * 100
    const y = 86 - ((item.avgCity - 35) / 42) * 70
    return `${x},${y}`
  }).join(' '), [])
  const goToQuietPlace = () => { onSelectPlace(metrics.quietestPlace.name); onNavigate('mapa') }

  return (
    <div className="section-overview sanctuary-overview">
      <section className="sanctuary-hero" aria-labelledby="overview-heading">
        <p className="sanctuary-eyebrow"><Sparkles size={15} aria-hidden="true" /> Planejamento calmo · previsibilidade sensorial urbana</p>
        <h1 id="overview-heading">Como está o ambiente sonoro<br />ao seu redor hoje?</h1>
        <p>Informações acústicas humanizadas para planejar saídas confortáveis, com previsibilidade sensorial para você e sua família.</p>
        <form className="sanctuary-search" onSubmit={(event) => { event.preventDefault(); onNavigate('mapa') }}>
          <div className="sanctuary-search-row"><Search size={20} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar endereço, bairro ou local tranquilo..." aria-label="Buscar um local tranquilo" /><button type="submit">Verificar <ArrowRight size={16} aria-hidden="true" /></button></div>
          <div className="sanctuary-filter-row" aria-label="Filtros rápidos"><span><SlidersHorizontal size={13} aria-hidden="true" /> Filtros:</span>{quickFilters.map(({ label, icon: Icon }) => <button key={label} type="button" className={activeFilter === label ? 'active' : ''} onClick={() => setActiveFilter(label)}>{Icon && <Icon size={13} aria-hidden="true" />}{label}</button>)}</div>
        </form>
      </section>

      <section className="sanctuary-dashboard" aria-labelledby="panorama-heading">
        <header className="sanctuary-dashboard-heading"><div><p><Volume2 size={15} aria-hidden="true" /> Diagnóstico acústico no período</p><h2 id="panorama-heading">Panorama sonoro da cidade</h2></div><span className="sanctuary-now"><i aria-hidden="true" /> Agora: {metrics.avgDb} dB <small>· moderado acolhedor</small></span></header>
        <div className="sanctuary-dashboard-grid">
          <article className="sanctuary-recommendation"><p className="sanctuary-card-label">Melhor horário para sair</p><h3>{calmestHour.hour}</h3><p>Menor fluxo urbano estimado, em torno de <strong>{calmestHour.avgCity} dB</strong>. Um intervalo mais gentil para caminhar, resolver o essencial ou fazer uma pausa.</p><button type="button" onClick={goToQuietPlace}><Trees size={19} aria-hidden="true" /><span>Refúgio mais tranquilo<br /><strong>{metrics.quietestPlace.name} · {metrics.quietestPlace.decibels} dB</strong></span></button></article>
          <article className="sanctuary-chart-card"><div className="sanctuary-chart-title"><div><h3>Curva estimada de ruído</h3><p>Variação suavizada para leitura confortável</p></div><span>Ideal &lt; 50 dB</span></div><div className="sanctuary-chart" aria-label="Curva de ruído ao longo do dia"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img"><defs><linearGradient id="noiseFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="currentColor" stopOpacity=".22" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><path d={`M 0,100 L ${chartPoints} L 100,100 Z`} fill="url(#noiseFill)" /><polyline points={chartPoints} fill="none" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" /></svg><span className="sanctuary-chart-mark">Janela ideal<br /><strong>{calmestHour.hour}</strong></span></div><div className="sanctuary-chart-times"><span>06h</span><span>10h</span><strong>14h–17h</strong><span>18h</span><span>22h</span></div></article>
        </div>
        <footer className="sanctuary-dashboard-footer"><span>Monitore rotas seguras e filtre por sensibilidade auditiva na sua vizinhança.</span><button type="button" onClick={() => onNavigate('mapa')}><Map size={18} aria-hidden="true" /> Explorar mapa acústico <ArrowRight size={17} aria-hidden="true" /></button></footer>
      </section>

      <section className="sanctuary-guidance" aria-labelledby="guidance-heading"><div><p className="sanctuary-card-label">Orientações do especialista</p><h2 id="guidance-heading">Recomendações sensoriais para hoje</h2></div><div className="sanctuary-guidance-grid"><article><span className="sanctuary-guidance-icon"><Volume2 size={22} /></span><p className="sanctuary-card-label">Preparação</p><h3>Leve seu kit de conforto</h3><p>Fones ou abafadores podem tornar travessias urbanas mais previsíveis.</p></article><article><span className="sanctuary-guidance-icon"><Trees size={22} /></span><p className="sanctuary-card-label">Pausa</p><h3>Priorize áreas verdes</h3><p>Parques e praças são pontos de recuperação entre deslocamentos.</p></article><article><span className="sanctuary-guidance-icon"><Heart size={22} /></span><p className="sanctuary-card-label">Autonomia</p><h3>Respeite seu ritmo</h3><p>O mapa é um apoio: a sua percepção continua sendo a melhor referência.</p></article></div></section>
    </div>
  )
}
