import React, { useState } from 'react'
import type { NavigationTab, Period, SensitiveZoneType } from '../types'
import { sensitiveZonesList } from '../data/noiseData'
import { SoundBadge } from '../components/SoundBadge'
import {
  Heart,
  Hospital,
  School,
  PawPrint,
  Trees,
  ShieldCheck,
  Compass,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

interface SensitiveZonesSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const SensitiveZonesSection: React.FC<SensitiveZonesSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'oasis' | 'hospitalar' | 'educacional' | 'abrigo'>('todos')

  const filteredZones = sensitiveZonesList.filter((zone) => {
    if (activeFilter === 'oasis') return zone.isQuietOasis
    if (activeFilter === 'hospitalar') return zone.type === 'hospital' || zone.type === 'clinica'
    if (activeFilter === 'educacional') return zone.type === 'escola'
    if (activeFilter === 'abrigo') return zone.type === 'abrigo'
    return true
  })

  const getZoneIcon = (type: SensitiveZoneType) => {
    switch (type) {
      case 'hospital':
      case 'clinica':
        return <Hospital size={18} aria-hidden="true" />
      case 'escola':
        return <School size={18} aria-hidden="true" />
      case 'abrigo':
        return <PawPrint size={18} aria-hidden="true" />
      case 'parque':
        return <Trees size={18} aria-hidden="true" />
    }
  }

  return (
    <div className="section-sensitive-zones">
      {/* Top Banner */}
      <section className="sensitive-hero-banner" aria-labelledby="sensitive-title">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="social-tag">
              <Heart size={14} aria-hidden="true" />
              Impacto Social & Saúde
            </span>
            <span className="period-tag">Turno atual: {period}</span>
          </div>
          <h1 id="sensitive-title" className="hero-heading">
            Zonas Sensíveis & Refúgios de Conforto Acústico
          </h1>
          <p className="hero-description">
            A poluição sonora urbana atinge desproporcionalmente pessoas autistas com hipersensibilidade auditiva, pacientes em recuperação médica, idosos e animais urbanos. Esta seção identifica instalações públicas que requerem proteção de silêncio e oásis urbanos recomendados para descompressão sensorial.
          </p>
        </div>

        <div className="ethics-guarantee-card" role="note">
          <div className="ethics-header">
            <ShieldCheck size={20} className="ethics-icon" aria-hidden="true" />
            <strong>Princípio Ético Fundamental</strong>
          </div>
          <p className="ethics-copy">
            O Sonitus monitora <strong>exclusivamente categorias urbanas e instalações de uso público</strong> (como hospitais, escolas e parques). A plataforma <strong>jamais mapeia residências particulares, endereços residenciais ou indivíduos neurodivergentes</strong>.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="zone-filter-bar" role="group" aria-label="Filtrar tipo de zona de proteção">
        <button
          type="button"
          className={`zone-filter-chip ${activeFilter === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveFilter('todos')}
          aria-pressed={activeFilter === 'todos'}
        >
          Todas as Zonas ({sensitiveZonesList.length})
        </button>
        <button
          type="button"
          className={`zone-filter-chip ${activeFilter === 'oasis' ? 'active' : ''}`}
          onClick={() => setActiveFilter('oasis')}
          aria-pressed={activeFilter === 'oasis'}
        >
          <Sparkles size={14} aria-hidden="true" />
          Oásis de Conforto Acústico (Zonas Tranquilas)
        </button>
        <button
          type="button"
          className={`zone-filter-chip ${activeFilter === 'hospitalar' ? 'active' : ''}`}
          onClick={() => setActiveFilter('hospitalar')}
          aria-pressed={activeFilter === 'hospitalar'}
        >
          <Hospital size={14} aria-hidden="true" />
          Hospitais & Clínicas
        </button>
        <button
          type="button"
          className={`zone-filter-chip ${activeFilter === 'educacional' ? 'active' : ''}`}
          onClick={() => setActiveFilter('educacional')}
          aria-pressed={activeFilter === 'educacional'}
        >
          <School size={14} aria-hidden="true" />
          Escolas & Educação
        </button>
        <button
          type="button"
          className={`zone-filter-chip ${activeFilter === 'abrigo' ? 'active' : ''}`}
          onClick={() => setActiveFilter('abrigo')}
          aria-pressed={activeFilter === 'abrigo'}
        >
          <PawPrint size={14} aria-hidden="true" />
          Abrigos de Animais
        </button>
      </div>

      {/* Cards Grid */}
      <section className="sensitive-zones-grid" aria-label="Lista de zonas sensíveis e de conforto acústico">
        {filteredZones.map((zone) => {
          const currentDb = zone.currentPeriodDb[period]
          const isAboveLimit = currentDb > zone.targetLimitDb
          const diff = currentDb - zone.targetLimitDb

          return (
            <article key={zone.id} className={`sensitive-card ${zone.isQuietOasis ? 'oasis-style' : ''}`}>
              <header className="card-top-row">
                <div className="zone-type-badge">
                  {getZoneIcon(zone.type)}
                  <span>
                    {zone.type === 'hospital'
                      ? 'Hospital Geral'
                      : zone.type === 'clinica'
                      ? 'Clínica Especializada'
                      : zone.type === 'escola'
                      ? 'Escola Municipal'
                      : zone.type === 'abrigo'
                      ? 'Abrigo Animal'
                      : 'Parque / Oásis Natural'}
                  </span>
                </div>

                {zone.isQuietOasis ? (
                  <span className="oasis-pill">
                    <Sparkles size={13} aria-hidden="true" />
                    Oásis Recomendado
                  </span>
                ) : isAboveLimit ? (
                  <span className="exceed-pill alert">
                    +{diff} dB acima do alvo
                  </span>
                ) : (
                  <span className="exceed-pill calm">
                    Dentro do limite
                  </span>
                )}
              </header>

              <h3 className="zone-name">{zone.name}</h3>
              <p className="zone-district">{zone.districtName}</p>

              {/* Decibel Comparison Bar */}
              <div className="zone-db-status-block">
                <div className="db-readout">
                  <span className="readout-label">Nível no período ({period}):</span>
                  <div className="readout-val-row">
                    <strong className="db-huge">{currentDb} dB</strong>
                    <SoundBadge
                      level={currentDb < 55 ? 'tranquilo' : currentDb < 70 ? 'moderado' : 'intenso'}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="target-limit-box">
                  <span className="target-label">Meta Recomendada:</span>
                  <strong className="target-val">{zone.targetLimitDb} dB(A)</strong>
                </div>
              </div>

              {/* Informações de apoio sensorial */}
              <div className="zone-specs-box">
                <div className="spec-line">
                  <Clock size={14} className="spec-icon" aria-hidden="true" />
                  <span><strong>Melhor janela de silêncio:</strong> {zone.quietestWindow}</span>
                </div>
                <div className="spec-line">
                  <Compass size={14} className="spec-icon" aria-hidden="true" />
                  <span><strong>Proximidade de tráfego:</strong> {zone.proximityToHeavyTraffic}</span>
                </div>
              </div>

              {/* Público Beneficiado */}
              <div className="target-audience-block">
                <span className="aud-label">População mais impactada:</span>
                <div className="aud-pills">
                  {zone.targetAudience.map((aud, i) => (
                    <span key={i} className="aud-pill">{aud}</span>
                  ))}
                </div>
              </div>

              {/* Recomendações práticas */}
              <div className="zone-recom-box">
                <strong>Recomendação de Conforto:</strong>
                <p>{zone.recommendation}</p>
              </div>

              {/* CTA para o Mapa */}
              <div className="card-footer-cta">
                <button
                  type="button"
                  className="locate-on-map-btn"
                  onClick={() => {
                    onSelectPlace(zone.name)
                    onNavigate('mapa')
                  }}
                  aria-label={`Localizar ${zone.name} no mapa acústico`}
                >
                  <span>Ver no Mapa Acústico</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
