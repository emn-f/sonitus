import React, { useState } from 'react'
import type { NavigationTab, Period } from '../types'
import { alertsList } from '../data/noiseData'
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter,
  Info,
  Layers,
  MapPin,
  Radio,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react'

interface AlertsSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const [severityFilter, setSeverityFilter] = useState<'todas' | 'critica' | 'atencao' | 'informativa'>('todas')
  const [statusFilter, setStatusFilter] = useState<'todos' | 'novo' | 'analise' | 'normalizado'>('todos')

  const filteredAlerts = alertsList.filter((item) => {
    if (severityFilter !== 'todas' && item.severity !== severityFilter) return false
    if (statusFilter !== 'todos' && item.status !== statusFilter) return false
    return true
  })

  const newAlertsCount = alertsList.filter((a) => a.status === 'novo').length
  const criticalCount = alertsList.filter((a) => a.severity === 'critica').length

  return (
    <div className="section-alerts">
      {/* Top Banner */}
      <section className="alerts-hero-banner" aria-labelledby="alerts-title">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="alert-tag">
              <Bell size={14} aria-hidden="true" />
              Detecção de Anomalias Simulada
            </span>
            <span className="status-badge-count">{newAlertsCount} novos alertas</span>
          </div>
          <h1 id="alerts-title" className="hero-heading">
            Sistema de Alertas e Recorrência Acústica
          </h1>
          <p className="hero-description">
            Demonstração conceitual de algoritmos de detecção de eventos críticos. O Sonitus simula a identificação de picos repetitivos de decibéis em corredores de tráfego e violações de zonas de silêncio para apoiar decisões preventivas do poder público e orientar cidadãos.
          </p>
        </div>

        <div className="simulated-warning-callout" role="note">
          <Info size={20} className="callout-icon" aria-hidden="true" />
          <div>
            <strong>Caráter Exclusivamente Demonstrativo</strong>
            <p>
              Os alertas abaixo são gerados a partir da base de dados simulada. A plataforma acadêmica <strong>não possui conexão com centrais de fiscalização policial, CET ou órgãos sancionatórios reais</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Metrics Row */}
      <div className="alerts-control-bar" role="group" aria-label="Filtros de severidade e status de alertas">
        <div className="filter-group">
          <span className="filter-group-label">Severidade:</span>
          <button
            type="button"
            className={`filter-btn ${severityFilter === 'todas' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('todas')}
            aria-pressed={severityFilter === 'todas'}
          >
            Todas ({alertsList.length})
          </button>
          <button
            type="button"
            className={`filter-btn critical ${severityFilter === 'critica' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('critica')}
            aria-pressed={severityFilter === 'critica'}
          >
            Crítica ({alertsList.filter((a) => a.severity === 'critica').length})
          </button>
          <button
            type="button"
            className={`filter-btn warning ${severityFilter === 'atencao' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('atencao')}
            aria-pressed={severityFilter === 'atencao'}
          >
            Atenção ({alertsList.filter((a) => a.severity === 'atencao').length})
          </button>
          <button
            type="button"
            className={`filter-btn info ${severityFilter === 'informativa' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('informativa')}
            aria-pressed={severityFilter === 'informativa'}
          >
            Informativa ({alertsList.filter((a) => a.severity === 'informativa').length})
          </button>
        </div>

        <div className="filter-group">
          <span className="filter-group-label">Status:</span>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setStatusFilter('todos')}
            aria-pressed={statusFilter === 'todos'}
          >
            Todos
          </button>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'novo' ? 'active' : ''}`}
            onClick={() => setStatusFilter('novo')}
            aria-pressed={statusFilter === 'novo'}
          >
            Novo
          </button>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'analise' ? 'active' : ''}`}
            onClick={() => setStatusFilter('analise')}
            aria-pressed={statusFilter === 'analise'}
          >
            Em análise
          </button>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'normalizado' ? 'active' : ''}`}
            onClick={() => setStatusFilter('normalizado')}
            aria-pressed={statusFilter === 'normalizado'}
          >
            Normalizado
          </button>
        </div>
      </div>

      {/* Alerts Feed */}
      <section className="alerts-feed" aria-label="Lista de alertas gerados">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts-card">
            <CheckCircle size={36} className="no-alerts-icon" aria-hidden="true" />
            <h3>Nenhum alerta registrado com os filtros selecionados</h3>
            <p>Selecione outras categorias ou limpe os filtros para visualizar os eventos simulados.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <article key={alert.id} className={`alert-card ${alert.severity}`}>
              <div className="alert-left-column">
                <div className={`alert-severity-icon-badge ${alert.severity}`}>
                  {alert.severity === 'critica' ? (
                    <AlertTriangle size={22} aria-hidden="true" />
                  ) : alert.severity === 'atencao' ? (
                    <ShieldAlert size={22} aria-hidden="true" />
                  ) : (
                    <Info size={22} aria-hidden="true" />
                  )}
                </div>

                <div className="alert-decibel-gauge">
                  <span className="gauge-val">{alert.decibels} dB</span>
                  <span className="gauge-limit">Limite: {alert.threshold} dB</span>
                </div>
              </div>

              <div className="alert-body">
                <header className="alert-header">
                  <div className="alert-meta-top">
                    <span className="alert-id-code">{alert.id}</span>
                    <span className="alert-time">
                      <Clock size={13} aria-hidden="true" />
                      {alert.timestamp}
                    </span>
                    <span className="alert-sensor-ref">
                      <Radio size={13} aria-hidden="true" />
                      Sensor {alert.sensorId}
                    </span>
                  </div>

                  <div className="alert-title-row">
                    <h3 className="alert-title">{alert.title}</h3>
                    <span className={`alert-status-pill status-${alert.status}`}>
                      {alert.status === 'novo'
                        ? 'Novo Alerta'
                        : alert.status === 'analise'
                        ? 'Em Análise'
                        : 'Normalizado'}
                    </span>
                  </div>

                  <div className="alert-location-row">
                    <MapPin size={14} className="pin-icon" aria-hidden="true" />
                    <strong>{alert.location}</strong>
                  </div>
                </header>

                <p className="alert-reason-text">
                  <strong>Detecção de Padrão:</strong> {alert.reason}
                </p>

                <div className="alert-action-box">
                  <span className="action-tag">Ação Conceitual Sugerida:</span>
                  <p className="action-desc">{alert.recommendedAction}</p>
                </div>

                <footer className="alert-card-footer">
                  <span className="occurrences-badge">
                    {alert.occurrences} {alert.occurrences > 1 ? 'ocorrências registradas' : 'ocorrência isolada'}
                  </span>

                  <button
                    type="button"
                    className="view-in-map-btn"
                    onClick={() => {
                      onSelectPlace(alert.location.split(',')[0].replace(' (Centro)', ''))
                      onNavigate('mapa')
                    }}
                    aria-label={`Ver ${alert.location} no mapa acústico`}
                  >
                    <span>Ver no Mapa</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </button>
                </footer>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
