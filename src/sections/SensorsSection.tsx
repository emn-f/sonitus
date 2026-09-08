import React, { useState } from 'react'
import type { NavigationTab, Period, Sensor } from '../types'
import { sensorsList } from '../data/noiseData'
import { SoundBadge } from '../components/SoundBadge'
import {
  Battery,
  BatteryCharging,
  Cpu,
  Eye,
  Filter,
  Layers,
  MapPin,
  Radio,
  RefreshCw,
  Search,
  Signal,
  Sun,
  Wifi,
  Zap,
} from 'lucide-react'

interface SensorsSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const SensorsSection: React.FC<SensorsSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const [statusFilter, setStatusFilter] = useState<'todos' | 'online' | 'atencao' | 'offline'>('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSensors = sensorsList.filter((s) => {
    if (statusFilter !== 'todos' && s.status !== statusFilter) return false
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      const matchId = s.id.toLowerCase().includes(q)
      const matchName = s.name.toLowerCase().includes(q)
      const matchDist = s.districtName.toLowerCase().includes(q)
      if (!matchId && !matchName && !matchDist) return false
    }
    return true
  })

  const onlineCount = sensorsList.filter((s) => s.status === 'online').length
  const loraCount = sensorsList.filter((s) => s.connectivity === 'LoRaWAN').length
  const nbiotCount = sensorsList.filter((s) => s.connectivity === 'NB-IoT').length
  const meshCount = sensorsList.filter((s) => s.connectivity === 'Wi-Fi Mesh').length

  return (
    <div className="section-sensors">
      {/* Top Banner */}
      <section className="sensors-hero-banner" aria-labelledby="sensors-title">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="iot-tag">
              <Radio size={14} aria-hidden="true" />
              Topologia IoT Simulada
            </span>
            <span className="mesh-tag">12 Pontos Georreferenciados</span>
          </div>
          <h1 id="sensors-title" className="hero-heading">
            Rede de Sensores Urbanos Sonitus
          </h1>
          <p className="hero-description">
            Visão técnica da malha de telemetria que alimentaria a plataforma Sonitus em uma implantação real. Cada dispositivo (Sonitus Node v1.2) opera com processamento de borda em ESP32-S3, calculando métricas de pressão sonora localmente e transmitindo pacotes agregados de baixo consumo.
          </p>
        </div>

        <div className="telemetry-stat-pills">
          <div className="telem-stat-pill">
            <span className="pill-metric-label">Nós Conectados</span>
            <strong className="pill-metric-val">{onlineCount}/{sensorsList.length}</strong>
            <span className="pill-metric-sub">100% ativos na simulação</span>
          </div>

          <div className="telem-stat-pill">
            <span className="pill-metric-label">Protocolos Ativos</span>
            <strong className="pill-metric-val">LoRa / NB-IoT</strong>
            <span className="pill-metric-sub">{loraCount} LoRa · {nbiotCount} NB-IoT · {meshCount} Mesh</span>
          </div>
        </div>
      </section>

      {/* Control / Search Toolbar */}
      <div className="sensors-toolbar" role="group" aria-label="Controles da lista de sensores">
        <div className="search-box">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar por código (SNS-001), rua ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Buscar sensor"
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Estado do nó:</span>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setStatusFilter('todos')}
            aria-pressed={statusFilter === 'todos'}
          >
            Todos ({sensorsList.length})
          </button>
          <button
            type="button"
            className={`filter-btn online ${statusFilter === 'online' ? 'active' : ''}`}
            onClick={() => setStatusFilter('online')}
            aria-pressed={statusFilter === 'online'}
          >
            Online ({onlineCount})
          </button>
          <button
            type="button"
            className={`filter-btn warning ${statusFilter === 'atencao' ? 'active' : ''}`}
            onClick={() => setStatusFilter('atencao')}
            aria-pressed={statusFilter === 'atencao'}
          >
            Atenção (0)
          </button>
        </div>

        <button
          type="button"
          className="tech-link-shortcut-btn"
          onClick={() => onNavigate('tecnologia')}
        >
          <Cpu size={15} aria-hidden="true" />
          <span>Ver Protótipo 3D do Hardware</span>
        </button>
      </div>

      {/* Grid de Sensores */}
      <section className="sensors-cards-grid" aria-label="Catálogo de sensores da rede">
        {filteredSensors.map((sensor) => {
          const currentReading = sensor.readings[period]

          return (
            <article key={sensor.id} className="sensor-card">
              <header className="sensor-card-header">
                <div className="sensor-code-badge">
                  <Radio size={14} aria-hidden="true" />
                  <strong>{sensor.id}</strong>
                </div>

                <span className={`sensor-status-dot-badge ${sensor.status}`}>
                  <span className="status-ping" aria-hidden="true" />
                  {sensor.status === 'online' ? 'Operacional' : sensor.status === 'atencao' ? 'Atenção' : 'Offline'}
                </span>
              </header>

              <h3 className="sensor-title">{sensor.name}</h3>
              <p className="sensor-district-line">
                <MapPin size={13} aria-hidden="true" />
                {sensor.districtName}
              </p>

              <p className="sensor-location-detail">{sensor.locationDesc}</p>

              {/* Leitura Instantânea */}
              <div className="sensor-reading-summary-box">
                <div className="db-block">
                  <span className="db-tag">Leitura ({period}):</span>
                  <div className="db-value-row">
                    <strong className="db-big">{currentReading.decibels}</strong>
                    <span className="db-suffix">dB(A)</span>
                  </div>
                </div>

                <div className="badge-block">
                  <SoundBadge level={currentReading.level} size="sm" />
                  <span className="peak-sub">Pico: {currentReading.peakDb} dB</span>
                </div>
              </div>

              {/* Hardware Specs Pills */}
              <div className="sensor-meta-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Conexão:</span>
                  <div className="spec-val">
                    <Wifi size={13} aria-hidden="true" />
                    <span>{sensor.connectivity}</span>
                  </div>
                </div>

                <div className="spec-item">
                  <span className="spec-label">Bateria / Fonte:</span>
                  <div className="spec-val">
                    {sensor.powerSource.includes('Solar') ? (
                      <Sun size={13} aria-hidden="true" />
                    ) : (
                      <Zap size={13} aria-hidden="true" />
                    )}
                    <span>{sensor.batteryPercent}% ({sensor.powerSource})</span>
                  </div>
                </div>

                <div className="spec-item">
                  <span className="spec-label">Firmware:</span>
                  <div className="spec-val">
                    <Cpu size={13} aria-hidden="true" />
                    <span>{sensor.firmware}</span>
                  </div>
                </div>

                <div className="spec-item">
                  <span className="spec-label">Último pacote:</span>
                  <div className="spec-val">
                    <Signal size={13} aria-hidden="true" />
                    <span>{sensor.lastTransmission}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <footer className="sensor-card-actions">
                <button
                  type="button"
                  className="sensor-action-btn locate"
                  onClick={() => {
                    onSelectPlace(sensor.name.replace('Sensor ', ''))
                    onNavigate('mapa')
                  }}
                  aria-label={`Ver ${sensor.id} no mapa acústico`}
                >
                  <MapPin size={14} aria-hidden="true" />
                  <span>Localizar no Mapa</span>
                </button>

                <button
                  type="button"
                  className="sensor-action-btn inspect"
                  onClick={() => onNavigate('tecnologia')}
                  aria-label="Ver arquitetura do hardware 3D"
                >
                  <Cpu size={14} aria-hidden="true" />
                  <span>Hardware 3D</span>
                </button>
              </footer>
            </article>
          )
        })}
      </section>
    </div>
  )
}
