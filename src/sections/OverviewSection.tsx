import React from 'react'
import type { NavigationTab, Period } from '../types'
import { computeCityMetrics, hourlyTrendHistory } from '../data/noiseData'
import { ArrowRight, Compass, Heart, Map, Moon, Volume2 } from 'lucide-react'

interface OverviewSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const metrics = computeCityMetrics(period)
  const calmestHour = hourlyTrendHistory.reduce((calmest, item) =>
    item.avgCity < calmest.avgCity ? item : calmest
  )

  return (
    <div className="section-overview comfort-overview">
      <section className="comfort-hero" aria-labelledby="overview-heading">
        <p className="comfort-eyebrow">Planeje com mais tranquilidade</p>
        <h1 id="overview-heading">Encontre um lugar mais confortável para estar agora.</h1>
        <p>
          O Sonitus reúne sinais acústicos simulados para ajudar você a escolher caminhos,
          pausas e horários com menos sobrecarga sonora.
        </p>
        <button type="button" className="comfort-primary-action" onClick={() => onNavigate('mapa')}>
          Explorar o mapa de conforto <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>

      <section className="comfort-summary-grid" aria-label="Resumo para planejar seu deslocamento">
        <article className="comfort-summary-card current">
          <Volume2 size={20} aria-hidden="true" />
          <p>Leitura neste período</p>
          <strong>{metrics.avgDb} <span>dB</span></strong>
          <small>{metrics.avgDb < 55 ? 'A cidade está mais calma agora.' : 'Prefira áreas verdes ou ruas menos movimentadas.'}</small>
        </article>
        <article className="comfort-summary-card calm">
          <Moon size={20} aria-hidden="true" />
          <p>Melhor horário do dia</p>
          <strong>{calmestHour.hour}</strong>
          <small>Média simulada de {calmestHour.avgCity} dB para organizar uma saída mais tranquila.</small>
        </article>
        <article className="comfort-summary-card place">
          <Heart size={20} aria-hidden="true" />
          <p>Área mais tranquila</p>
          <strong className="comfort-place-name">{metrics.quietestPlace.name}</strong>
          <small>{metrics.quietestPlace.decibels} dB neste período</small>
          <button
            type="button"
            onClick={() => {
              onSelectPlace(metrics.quietestPlace.name)
              onNavigate('mapa')
            }}
          >
            Ver no mapa
          </button>
        </article>
      </section>

      <section className="comfort-next-steps" aria-labelledby="next-steps-heading">
        <div>
          <p className="comfort-eyebrow">Escolha seu próximo passo</p>
          <h2 id="next-steps-heading">Planejamento simples, no seu ritmo</h2>
        </div>
        <div className="comfort-actions-grid">
          <button type="button" onClick={() => onNavigate('mapa')}>
            <Map size={20} aria-hidden="true" />
            <span><strong>Explorar por mapa</strong><small>Compare lugares e caminhos.</small></span>
          </button>
          <button type="button" onClick={() => onNavigate('zonas-sensiveis')}>
            <Compass size={20} aria-hidden="true" />
            <span><strong>Ver zonas tranquilas</strong><small>Encontre áreas de pausa e acolhimento.</small></span>
          </button>
        </div>
      </section>

      <p className="comfort-disclaimer">
        Dados demonstrativos: use o mapa como apoio ao planejamento e considere suas preferências sensoriais no momento.
      </p>
    </div>
  )
}
