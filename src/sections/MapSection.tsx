import React, { useState, useMemo } from 'react'
import type {
  DistrictId,
  NoiseLevel,
  Period,
  PlaceReading,
  SensorCategory,
} from '../types'
import {
  districtsList,
  levelLabels,
  levelDescriptions,
  sensorsList,
  sensitiveZonesList,
} from '../data/noiseData'
import { SoundBadge } from '../components/SoundBadge'
import {
  Eye,
  Filter,
  Flame,
  HeartHandshake,
  Hospital,
  Info,
  Layers,
  MapPin,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  ShieldCheck,
  Trees,
  Volume1,
  Volume2,
  X,
  Zap,
} from 'lucide-react'

interface MapSectionProps {
  period: Period
  selectedPlaceName: string | null
  onSelectPlace: (name: string | null) => void
}

export const MapSection: React.FC<MapSectionProps> = ({
  period,
  selectedPlaceName,
  onSelectPlace,
}) => {
  // Filtros
  const [districtFilter, setDistrictFilter] = useState<string>('todos')
  const [levelFilter, setLevelFilter] = useState<string>('todos')
  const [categoryFilter, setCategoryFilter] = useState<string>('todas')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Camadas visuais
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [showSensitiveZones, setShowSensitiveZones] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mapeamento de leituras no período atual
  const allReadings: PlaceReading[] = useMemo(() => {
    return sensorsList.map((sensor) => {
      const r = sensor.readings[period]
      return {
        name: sensor.name.replace('Sensor ', ''),
        district: sensor.districtName,
        districtId: sensor.districtId,
        level: r.level,
        decibels: r.decibels,
        peakDb: r.peakDb,
        note: r.note,
        category: sensor.category,
        sensorId: sensor.id,
      }
    })
  }, [period])

  // Filtragem
  const filteredReadings = useMemo(() => {
    return allReadings.filter((reading) => {
      if (districtFilter !== 'todos' && reading.districtId !== districtFilter) return false
      if (levelFilter !== 'todos' && reading.level !== levelFilter) return false
      if (categoryFilter !== 'todas') {
        if (categoryFilter === 'sensivel') {
          if (!['hospitalar', 'escolar', 'abrigo'].includes(reading.category)) return false
        } else if (reading.category !== categoryFilter) {
          return false
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = reading.name.toLowerCase().includes(q)
        const matchesDistrict = reading.district.toLowerCase().includes(q)
        const matchesSensorId = reading.sensorId.toLowerCase().includes(q)
        if (!matchesName && !matchesDistrict && !matchesSensorId) return false
      }
      return true
    })
  }, [allReadings, districtFilter, levelFilter, categoryFilter, searchQuery])

  // Leitura selecionada atualmente
  const activeReading = useMemo(() => {
    if (selectedPlaceName) {
      const found = allReadings.find((r) => r.name === selectedPlaceName)
      if (found) return found
    }
    return filteredReadings[0] || allReadings[0]
  }, [selectedPlaceName, allReadings, filteredReadings])

  // Sensor correspondente
  const activeSensor = useMemo(() => {
    return sensorsList.find((s) => s.id === activeReading?.sensorId)
  }, [activeReading])

  // Zonas sensíveis próximas ou correlatas
  const relatedSensitiveZone = useMemo(() => {
    if (!activeReading) return null
    return sensitiveZonesList.find((sz) => sz.districtId === activeReading.districtId)
  }, [activeReading])

  const hasActiveFilters =
    districtFilter !== 'todos' ||
    levelFilter !== 'todos' ||
    categoryFilter !== 'todas' ||
    searchQuery.trim() !== ''

  const clearFilters = () => {
    setDistrictFilter('todos')
    setLevelFilter('todos')
    setCategoryFilter('todas')
    setSearchQuery('')
  }

  return (
    <div className={`section-map ${isFullscreen ? 'fullscreen-map-mode' : ''}`}>
      {/* Top Filter Bar */}
      <header className="map-toolbar-card" aria-label="Filtros do mapa acústico">
        <div className="toolbar-row-primary">
          <div className="search-box">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar rua, hospital, praça ou sensor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Buscar local no mapa acústico"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar termo de busca"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Distrito */}
          <div className="filter-select-wrapper">
            <label htmlFor="select-district" className="filter-label">Bairro/Distrito:</label>
            <select
              id="select-district"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Toda a Cidade</option>
              {districtsList.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Classificação Sonora */}
          <div className="filter-select-wrapper">
            <label htmlFor="select-level" className="filter-label">Intensidade:</label>
            <select
              id="select-level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos os Níveis</option>
              <option value="tranquilo">Tranquilo (&lt; 55 dB)</option>
              <option value="moderado">Moderado (55 - 70 dB)</option>
              <option value="intenso">Intenso (&gt; 70 dB)</option>
            </select>
          </div>

          {/* Categoria do Local */}
          <div className="filter-select-wrapper">
            <label htmlFor="select-category" className="filter-label">Categoria:</label>
            <select
              id="select-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="todas">Todas as Categorias</option>
              <option value="sensivel">Zonas Sensíveis (Saúde/Escola/Abrigo)</option>
              <option value="parque">Áreas Verdes & Parques</option>
              <option value="comercial">Comércio & Serviços</option>
              <option value="arterial">Vias Arteriais / Trânsito</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={clearFilters}
              title="Limpar todos os filtros"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>

        {/* Camadas Visuais e Legenda */}
        <div className="toolbar-row-secondary">
          <div className="layers-toggle-group" role="group" aria-label="Controle de camadas visuais do mapa">
            <span className="layers-label">Camadas:</span>
            <button
              type="button"
              className={`layer-chip ${showHeatmap ? 'active' : ''}`}
              onClick={() => setShowHeatmap((v) => !v)}
              aria-pressed={showHeatmap}
            >
              <Flame size={14} aria-hidden="true" />
              <span>Heatmap de Ruído</span>
            </button>

            <button
              type="button"
              className={`layer-chip ${showSensitiveZones ? 'active' : ''}`}
              onClick={() => setShowSensitiveZones((v) => !v)}
              aria-pressed={showSensitiveZones}
            >
              <Hospital size={14} aria-hidden="true" />
              <span>Zonas Sensíveis</span>
            </button>

            <button
              type="button"
              className={`layer-chip ${showLabels ? 'active' : ''}`}
              onClick={() => setShowLabels((v) => !v)}
              aria-pressed={showLabels}
            >
              <Eye size={14} aria-hidden="true" />
              <span>Rótulos e Nomes</span>
            </button>

            <button
              type="button"
              className={`layer-chip ${isFullscreen ? 'active' : ''}`}
              onClick={() => setIsFullscreen((v) => !v)}
              title={isFullscreen ? 'Sair do modo tela cheia' : 'Expandir mapa'}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
              <span>{isFullscreen ? 'Recolher' : 'Expandir'}</span>
            </button>
          </div>

          <div className="map-legend-pills" aria-label="Legenda dos níveis de decibéis">
            <span className="legend-item"><span className="status-dot tranquilo" /> Tranquilo (&lt; 55 dB)</span>
            <span className="legend-item"><span className="status-dot moderado" /> Moderado (55-70 dB)</span>
            <span className="legend-item"><span className="status-dot intenso" /> Intenso (&gt; 70 dB)</span>
            <span className="legend-item"><span className="legend-icon-badge hospital" /> Instalação Sensível</span>
          </div>
        </div>
      </header>

      {/* Main Map Canvas and Detail Drawer */}
      <div className="map-display-layout">
        {/* SVG Urban Schematic Map */}
        <div className="map-viewport-container" role="region" aria-label="Área do mapa acústico ilustrativo">
          <svg
            className="city-vector-canvas"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Planta urbana esquemática da cidade monitorada"
          >
            <defs>
              {/* Gradientes do Heatmap Acústico */}
              <radialGradient id="heat-intense" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b83e3b" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#b83e3b" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#b83e3b" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="heat-moderate" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b06a14" stopOpacity="0.38" />
                <stop offset="50%" stopColor="#b06a14" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#b06a14" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="heat-calm" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1c7d62" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#1c7d62" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1c7d62" stopOpacity="0" />
              </radialGradient>

              {/* Padrão sutil de quadras */}
              <pattern id="urban-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
              </pattern>
            </defs>

            {/* Fundo Urbano com malha */}
            <rect width="1000" height="700" fill="var(--color-surface-secondary)" />
            <rect width="1000" height="700" fill="url(#urban-grid)" />

            {/* ÁREA VERDE / PARQUE DAS ÁGUAS */}
            <g className="map-district-zone park-zone">
              <path
                d="M 160 80 Q 280 60 360 120 Q 380 220 300 260 Q 180 270 140 180 Z"
                fill="var(--color-calm-soft)"
                stroke="var(--color-calm)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.75"
              />
              {/* Lago do Parque */}
              <path
                d="M 220 130 Q 280 110 310 150 Q 300 200 250 210 Q 200 190 220 130 Z"
                fill="color-mix(in srgb, var(--color-primary), transparent 70%)"
                stroke="var(--color-primary)"
                strokeWidth="1"
              />
              <text x="255" y="165" textAnchor="middle" fill="var(--color-primary)" fontSize="11" fontWeight="700" letterSpacing="0.5">
                LAGO DO PARQUE
              </text>
              <text x="260" y="245" textAnchor="middle" fill="var(--color-calm)" fontSize="12" fontWeight="800" letterSpacing="1">
                PARQUE DAS ÁGUAS (ÁREA DE REFÚGIO)
              </text>
            </g>

            {/* DISTRITO SAÚDE & BEM-ESTAR */}
            <g className="map-district-zone health-zone">
              <rect
                x="320"
                y="140"
                width="220"
                height="220"
                rx="16"
                fill="color-mix(in srgb, var(--color-primary-soft), transparent 40%)"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <text x="430" y="170" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="800" letterSpacing="1">
                DISTRITO SAÚDE & HOSPITALAR
              </text>
              <rect x="410" y="180" width="40" height="40" rx="8" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2" />
              <path d="M 430 190 v 20 M 420 200 h 20" stroke="#b83e3b" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* CENTRO HISTÓRICO & COMERCIAL */}
            <g className="map-district-zone center-zone">
              <polygon
                points="520,180 820,190 850,460 540,480"
                fill="color-mix(in srgb, var(--color-surface), transparent 30%)"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              />
              <text x="680" y="220" textAnchor="middle" fill="var(--color-text-muted)" fontSize="13" fontWeight="800" letterSpacing="1.2">
                CENTRO HISTÓRICO & COMERCIAL
              </text>
            </g>

            {/* JARDIM AURORA */}
            <g className="map-district-zone aurora-zone">
              <rect
                x="70"
                y="290"
                width="220"
                height="240"
                rx="18"
                fill="color-mix(in srgb, var(--color-calm-soft), transparent 50%)"
                stroke="var(--color-calm)"
                strokeWidth="1"
              />
              <text x="180" y="320" textAnchor="middle" fill="var(--color-calm)" fontSize="12" fontWeight="800" letterSpacing="1">
                JARDIM AURORA (ÁREA ARBORIZADA)
              </text>
            </g>

            {/* VILA SERENA */}
            <g className="map-district-zone serena-zone">
              <polygon
                points="160,540 480,520 450,670 140,670"
                fill="color-mix(in srgb, var(--color-calm-soft), transparent 40%)"
                stroke="var(--color-calm)"
                strokeWidth="1.5"
              />
              <text x="310" y="580" textAnchor="middle" fill="var(--color-calm)" fontSize="13" fontWeight="800" letterSpacing="1">
                VILA SERENA (ZONA TRANQUILA)
              </text>
            </g>

            {/* EIXO LESTE */}
            <g className="map-district-zone east-zone">
              <polygon
                points="680,500 960,480 940,680 660,670"
                fill="color-mix(in srgb, var(--color-moderate-soft), transparent 45%)"
                stroke="var(--color-moderate)"
                strokeWidth="1.5"
              />
              <text x="810" y="530" textAnchor="middle" fill="var(--color-moderate)" fontSize="12" fontWeight="800" letterSpacing="1">
                EIXO LESTE (CORREDOR VIÁRIO)
              </text>
            </g>

            {/* MALHA VIÁRIA PRINCIPAL (Ruas, Avenidas, Cruzamentos) */}
            <g className="map-roads-layer">
              {/* Avenida Central (Dupla) */}
              <path d="M 50 480 Q 450 490 950 450" stroke="var(--color-surface)" strokeWidth="32" fill="none" strokeLinecap="round" />
              <path d="M 50 480 Q 450 490 950 450" stroke="var(--color-border)" strokeWidth="32" fill="none" strokeLinecap="round" strokeOpacity="0.4" />
              <path d="M 50 480 Q 450 490 950 450" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="14 12" fill="none" opacity="0.4" />
              <text x="750" y="465" fill="var(--color-text)" fontSize="11" fontWeight="700" letterSpacing="0.8">
                AVENIDA CENTRAL (TRÁFEGO ELEVADO)
              </text>

              {/* Via Diagonal Norte-Sul */}
              <path d="M 720 80 L 380 670" stroke="var(--color-surface)" strokeWidth="26" fill="none" strokeLinecap="round" />
              <path d="M 720 80 L 380 670" stroke="var(--color-border)" strokeWidth="26" fill="none" strokeLinecap="round" strokeOpacity="0.35" />
              <path d="M 720 80 L 380 670" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="10 10" fill="none" opacity="0.3" />

              {/* Anel das Águas (Transversal) */}
              <path d="M 280 80 Q 320 280 180 480" stroke="var(--color-surface)" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 280 80 Q 320 280 180 480" stroke="var(--color-border)" strokeWidth="18" fill="none" strokeLinecap="round" strokeOpacity="0.3" />

              {/* Rua do Mercado & Calçadão */}
              <path d="M 540 280 L 860 290" stroke="var(--color-surface)" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 540 280 L 860 290" stroke="var(--color-border)" strokeWidth="18" fill="none" strokeLinecap="round" strokeOpacity="0.3" />
              <text x="680" y="272" fill="var(--color-text-muted)" fontSize="10" fontWeight="600">
                Rua do Mercado
              </text>

              {/* Acesso Hospitalar */}
              <path d="M 320 280 L 540 280" stroke="var(--color-surface)" strokeWidth="20" fill="none" strokeLinecap="round" />
              <path d="M 320 280 L 540 280" stroke="var(--color-border)" strokeWidth="20" fill="none" strokeLinecap="round" strokeOpacity="0.3" />
              <text x="390" y="268" fill="var(--color-primary)" fontSize="10" fontWeight="700">
                Acesso Hospital Dr. Arnaldo
              </text>

              {/* Alameda das Hortênsias */}
              <path d="M 120 380 L 260 380" stroke="var(--color-surface)" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 120 380 L 260 380" stroke="var(--color-border)" strokeWidth="14" fill="none" strokeLinecap="round" strokeOpacity="0.3" />
              <text x="140" y="372" fill="var(--color-text-muted)" fontSize="9" fontWeight="600">
                Al. das Hortênsias
              </text>

              {/* Vias da Vila Serena */}
              <path d="M 240 600 L 440 600" stroke="var(--color-surface)" strokeWidth="16" fill="none" strokeLinecap="round" />
              <path d="M 240 600 L 440 600" stroke="var(--color-border)" strokeWidth="16" fill="none" strokeLinecap="round" strokeOpacity="0.3" />
              <text x="290" y="594" fill="var(--color-calm)" fontSize="10" fontWeight="700">
                Praça dos Ipês / Caminho Verde
              </text>
            </g>

            {/* CAMADA DE CALOR ACÚSTICO (HEATMAP HALOS) */}
            {showHeatmap && (
              <g className="map-heatmap-layer" aria-hidden="true">
                {filteredReadings.map((reading) => {
                  const r = reading.decibels > 75 ? 120 : reading.decibels > 60 ? 95 : 75
                  const gradId =
                    reading.level === 'intenso'
                      ? 'url(#heat-intense)'
                      : reading.level === 'moderado'
                      ? 'url(#heat-moderate)'
                      : 'url(#heat-calm)'
                  return (
                    <circle
                      key={`heat-${reading.name}`}
                      r={r}
                      fill={gradId}
                      className={`heat-spot sensor-heat-${reading.sensorId.replace('SNS-', '')}`}
                    />
                  )
                })}
              </g>
            )}

            {/* ZONAS SENSÍVEIS HIGHLIGHT ICONS */}
            {showSensitiveZones && (
              <g className="map-sensitive-badges" aria-hidden="true">
                {/* Hospital Municipal */}
                <g transform="translate(400, 215)">
                  <circle cx="0" cy="0" r="16" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2" />
                  <path d="M 0 -8 v 16 M -8 0 h 16" stroke="#b83e3b" strokeWidth="3" strokeLinecap="round" />
                  <text x="0" y="28" textAnchor="middle" fill="var(--color-primary)" fontSize="10" fontWeight="700">
                    Hospital Mun.
                  </text>
                </g>

                {/* Clínica Pediátrica */}
                <g transform="translate(345, 290)">
                  <circle cx="0" cy="0" r="14" fill="var(--color-surface)" stroke="var(--color-calm)" strokeWidth="2" />
                  <path d="M 0 -6 v 12 M -6 0 h 12" stroke="var(--color-calm)" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="0" y="24" textAnchor="middle" fill="var(--color-calm)" fontSize="9" fontWeight="700">
                    Clínica TEA
                  </text>
                </g>

                {/* Escola Darcy Ribeiro */}
                <g transform="translate(470, 120)">
                  <circle cx="0" cy="0" r="14" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2" />
                  <polygon points="-6,-4 0,-9 6,-4 6,4 0,7 -6,4" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                  <text x="0" y="24" textAnchor="middle" fill="var(--color-primary)" fontSize="9" fontWeight="700">
                    Escola
                  </text>
                </g>

                {/* Abrigo Animal */}
                <g transform="translate(130, 395)">
                  <circle cx="0" cy="0" r="14" fill="var(--color-surface)" stroke="var(--color-calm)" strokeWidth="2" />
                  <circle cx="-3" cy="-4" r="1.5" fill="var(--color-calm)" />
                  <circle cx="3" cy="-4" r="1.5" fill="var(--color-calm)" />
                  <circle cx="0" cy="1" r="2.5" fill="var(--color-calm)" />
                  <text x="0" y="24" textAnchor="middle" fill="var(--color-calm)" fontSize="9" fontWeight="700">
                    Abrigo Animal
                  </text>
                </g>
              </g>
            )}

            {/* PONTOS DOS SENSORES (Interativos via HTML sobrepostos para acessibilidade e teclado) */}
          </svg>

          {/* SENSOR PIN BUTTONS (HTML Overlay com foco via teclado e eventos ARIA) */}
          <div className="sensors-interactive-overlay" role="group" aria-label="Pontos de monitoramento sonoro interativos">
            {filteredReadings.map((reading) => {
              const isSelected = activeReading?.name === reading.name
              return (
                <button
                  key={reading.sensorId}
                  type="button"
                  className={`map-interactive-pin sensor-pin-${reading.sensorId.replace('SNS-', '')} ${reading.level} ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectPlace(reading.name)}
                  aria-pressed={isSelected}
                  aria-label={`${reading.sensorId} - ${reading.name}: ${reading.decibels} decibéis, ${levelLabels[reading.level]}. ${reading.note}`}
                >
                  <span className="pin-pulse-ring" aria-hidden="true" />
                  <span className="pin-core-circle">
                    <span className="pin-sensor-code">{reading.sensorId.replace('SNS-', '')}</span>
                  </span>

                  {showLabels && (
                    <span className="pin-floating-tag">
                      <span className="tag-name">{reading.name}</span>
                      <strong className="tag-db">{reading.decibels} dB</strong>
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="map-corner-badge">
            <Info size={13} aria-hidden="true" />
            <span>Malha urbana esquemática ilustrativa · Dados 100% simulados</span>
          </div>
        </div>

        {/* Selected Sensor Detail Drawer / Inspector */}
        <aside className="sensor-detail-drawer" aria-label="Detalhes do sensor ou região selecionada">
          {activeReading ? (
            <div className="drawer-inner">
              <header className="drawer-header">
                <div className="drawer-pretitle">
                  <span className="sensor-id-pill">{activeReading.sensorId}</span>
                  <span className="district-tag">{activeReading.district}</span>
                </div>
                <h3 className="drawer-title">{activeReading.name}</h3>
                <p className="drawer-location-desc">
                  {activeSensor?.locationDesc || 'Ponto de monitoramento urbano calibrado'}
                </p>
              </header>

              <div className="drawer-decibel-display">
                <div className="db-hero">
                  <strong className="db-number">{activeReading.decibels}</strong>
                  <span className="db-unit">dB(A)</span>
                </div>
                <div className="db-meta">
                  <SoundBadge level={activeReading.level} decibels={activeReading.decibels} size="lg" />
                  <span className="peak-info">
                    Pico no período: <strong>{activeReading.peakDb} dB</strong>
                  </span>
                </div>
              </div>

              {/* Status e Contexto */}
              <div className="drawer-card context-note-card">
                <h4 className="card-mini-title">Observação do Entorno ({period}):</h4>
                <p className="context-copy">{activeReading.note}</p>
              </div>

              {/* Recomendações de Acessibilidade Sensorial */}
              <div className="drawer-card sensory-recommendation-card">
                <h4 className="card-mini-title">
                  <HeartHandshake size={15} aria-hidden="true" />
                  Recomendação Sensorial & Neurodivergência:
                </h4>
                {activeReading.level === 'tranquilo' ? (
                  <p className="recommendation-copy calm-recom">
                    Ambiente altamente favorável para pessoas autistas com hipersensibilidade e idosos. Pressão sonora bem abaixo do limiar de sobrecarga. Rota recomendada para deslocamento calmo.
                  </p>
                ) : activeReading.level === 'moderado' ? (
                  <p className="recommendation-copy moderate-recom">
                    Ruído urbano padrão. Pessoas com hipersensibilidade auditiva moderada podem circular com atenção leve. Para pausas prolongadas, prefira o Parque das Águas ou Vila Serena.
                  </p>
                ) : (
                  <p className="recommendation-copy intense-recom">
                    Atenção à sobrecarga sensorial! Recomenda-se uso de abafadores de ruído ou fones com cancelamento ativo para pessoas autistas ou sensíveis. Considere trajeto alternativo.
                  </p>
                )}
              </div>

              {/* Apoio à Gestão Pública */}
              <div className="drawer-card governance-card">
                <h4 className="card-mini-title">
                  <ShieldCheck size={15} aria-hidden="true" />
                  Diretriz para Gestão Pública Urbana:
                </h4>
                <p className="governance-copy">
                  {activeReading.category === 'hospitalar'
                    ? 'Zona de silêncio prioritária. Sugerido monitoramento de tráfego de ambulâncias e fiscalização de buzinas.'
                    : activeReading.category === 'comercial'
                    ? 'Regulamentar horários de carga/descarga e incentivar áreas com calçadões de pedestres arborizados.'
                    : activeReading.category === 'arterial'
                    ? 'Avaliar sincronização de semáforos para reduzir acelerações bruscas e implementar asfalto com absorção acústica.'
                    : 'Manter preservação da cobertura vegetal e proteção contra abertura de tráfego de passagem.'}
                </p>
              </div>

              {/* Telemetria do Hardware Simulado */}
              {activeSensor && (
                <div className="drawer-telemetry-grid">
                  <div className="telem-item">
                    <span className="telem-label">Hardware</span>
                    <strong className="telem-val">{activeSensor.firmware}</strong>
                  </div>
                  <div className="telem-item">
                    <span className="telem-label">Conexão</span>
                    <strong className="telem-val">{activeSensor.connectivity}</strong>
                  </div>
                  <div className="telem-item">
                    <span className="telem-label">Bateria</span>
                    <strong className="telem-val">{activeSensor.batteryPercent}% ({activeSensor.powerSource})</strong>
                  </div>
                  <div className="telem-item">
                    <span className="telem-label">Último envio</span>
                    <strong className="telem-val">{activeSensor.lastTransmission}</strong>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="drawer-empty-state">
              <MapPin size={32} className="empty-icon" aria-hidden="true" />
              <p>Selecione um ponto no mapa para inspecionar os detalhes acústicos, recomendações e telemetria.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
