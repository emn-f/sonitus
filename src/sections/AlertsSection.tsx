import React, { useState } from 'react'
import type { NavigationTab } from '../types'
import { acousticEventsList, alertsList } from '../data/noiseData'
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  ExternalLink,
  Flame,
  HelpCircle,
  Info,
  Layers,
  MapPin,
  Radio,
  RotateCcw,
  Shield,
  ShieldAlert,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react'

interface AlertsSectionProps {
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({
  onNavigate,
  onSelectPlace,
}) => {
  const [viewMode, setViewMode] = useState<'alertas' | 'picos_isolados' | 'regras'>('alertas')
  const [severityFilter, setSeverityFilter] = useState<'todas' | 'critica' | 'atencao' | 'informativa'>('todas')
  const [statusFilter, setStatusFilter] = useState<'todos' | 'novo' | 'analise' | 'normalizado'>('todos')

  const filteredAlerts = alertsList.filter((item) => {
    if (severityFilter !== 'todas' && item.severity !== severityFilter) return false
    if (statusFilter !== 'todos' && item.status !== statusFilter) return false
    return true
  })

  const newAlertsCount = alertsList.filter((a) => a.status === 'novo').length
  const recurringAlertsCount = alertsList.filter((a) => a.isRecurring).length

  return (
    <div className="section-alerts">
      {/* Top Banner */}
      <section className="alerts-hero-banner" aria-labelledby="alerts-title">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="alert-tag">
              <Bell size={14} aria-hidden="true" />
              Monitoramento Contínuo
            </span>
            <span className="status-badge-count">{newAlertsCount} novos alertas</span>
            {recurringAlertsCount > 0 && (
              <span className="recurring-badge-count">{recurringAlertsCount} reincidente</span>
            )}
          </div>
          <h1 id="alerts-title" className="hero-heading">
            Sistema de Alertas & Apoio à Priorização da Fiscalização
          </h1>
          <p className="hero-description">
            O sistema analisa o histórico de decibéis para identificar onde o ruído ultrapassa a lei por muito tempo. Os dados orientam vistorias preventivas da prefeitura.
          </p>
        </div>

        <div className="simulated-warning-callout" role="note">
          <Info size={20} className="callout-icon" aria-hidden="true" />
          <div>
            <strong>Apoio à Fiscalização ≠ Sanção Automática</strong>
            <p>
              O Sonitus oferece inteligência para <strong>priorizar onde enviar equipes de fiscalização</strong>. O sistema não aplica multas automaticamente nem substitui o processo administrativo legal. Todos os dados são simulados.
            </p>
          </div>
        </div>
      </section>

      {/* Seletor de Modo: Alertas vs Picos Isolados vs Regras Metodológicas */}
      <div className="alerts-mode-bar" role="tablist" aria-label="Modo de visualização de alertas">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'alertas'}
          className={`mode-btn ${viewMode === 'alertas' ? 'active' : ''}`}
          onClick={() => setViewMode('alertas')}
        >
          <Bell size={16} aria-hidden="true" />
          <span>Alertas em Aberto ({alertsList.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'picos_isolados'}
          className={`mode-btn ${viewMode === 'picos_isolados' ? 'active' : ''}`}
          onClick={() => setViewMode('picos_isolados')}
        >
          <Zap size={16} aria-hidden="true" />
          <span>Picos Momentâneos ({acousticEventsList.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'regras'}
          className={`mode-btn ${viewMode === 'regras' ? 'active' : ''}`}
          onClick={() => setViewMode('regras')}
        >
          <Layers size={16} aria-hidden="true" />
          <span>Regras de Medição</span>
        </button>
      </div>

      {/* MODO 1: ALERTAS DE FISCALIZAÇÃO */}
      {viewMode === 'alertas' && (
        <>
          {/* Barra de Filtros */}
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

          {/* Feed de Alertas */}
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
                      <span className="gauge-limit">Norma: {alert.nbr10151LimitDb || alert.threshold} dB</span>
                    </div>

                    {alert.isRecurring && (
                      <span className="recurrent-tag" title="3 alertas no mesmo ponto dentro de 1 hora">
                        Reincidente
                      </span>
                    )}
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
                        <span className="alert-sim-tag">Dados Simulados</span>
                        <span className={`alert-status-pill status-${alert.status}`}>
                          {alert.status === 'novo'
                            ? 'Novo Alerta'
                            : alert.status === 'analise'
                            ? 'Em Análise'
                            : 'Normalizado'}
                        </span>
                      </div>

                      <div className="alert-title-row">
                        <h3 className="alert-title">{alert.title}</h3>
                      </div>

                      <div className="alert-location-row">
                        <MapPin size={14} className="pin-icon" aria-hidden="true" />
                        <strong>{alert.location}</strong>
                      </div>
                    </header>

                    <p className="alert-reason-text">
                      <strong>Critério Metodológico:</strong> {alert.reason}
                    </p>

                    <div className="alert-action-box">
                      <span className="action-tag">Ação Conceitual para Fiscalização (Sedur):</span>
                      <p className="action-desc">{alert.recommendedAction}</p>
                    </div>

                    <footer className="alert-card-footer">
                      <span className="occurrences-badge">
                        {alert.consecutiveWindowsExceeded ? `${alert.consecutiveWindowsExceeded} janelas de 10 min consecutivas` : `${alert.occurrences} ocorrências`}
                      </span>

                      <button
                        type="button"
                        className="view-in-map-btn"
                        onClick={() => {
                          onSelectPlace(alert.location.split(',')[0].replace(' (Centro Comercial)', '').replace(' (Distrito Saúde)', ''))
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
        </>
      )}

      {/* MODO 2: PICOS E EVENTOS ISOLADOS */}
      {viewMode === 'picos_isolados' && (
        <section className="isolated-peaks-section" aria-labelledby="peaks-title">
          <div className="peaks-explanation-box">
            <Zap size={22} className="peaks-icon" aria-hidden="true" />
            <div>
              <h2 id="peaks-title" className="peaks-title">
                Registro de Picos Isolados (Sem Disparo de Alerta Automático)
              </h2>
              <p>
                Conforme a <strong>Etapa 5 da metodologia do projeto Sonitus</strong>, ruídos transitórios de curta duração (como buzinas breves, sirenes em emergência e freadas) são registrados pelo sistema para fins de diagnóstico acústico, mas <strong>NÃO acionam alerta automático nem enviam equipes de fiscalização</strong>. Isso evita desperdício de recursos operacionais com ocorrências que já cessaram.
              </p>
            </div>
          </div>

          <div className="peaks-grid">
            {acousticEventsList.map((evt) => (
              <article key={evt.id} className="peak-card">
                <header className="peak-card-header">
                  <div className="peak-code-line">
                    <span className="peak-id">{evt.id}</span>
                    <span className="peak-time">{evt.timestamp}</span>
                    <span className="peak-sensor">Sensor {evt.sensorId}</span>
                  </div>
                  <span className="peak-source-badge">{evt.sourceType.toUpperCase()}</span>
                </header>

                <div className="peak-gauges-row">
                  <div className="peak-gauge-item">
                    <span className="gauge-label">Pico Instantâneo:</span>
                    <span className="gauge-val-high">{evt.peakDb} dB(A)</span>
                  </div>
                  <div className="peak-gauge-item">
                    <span className="gauge-label">LAeq Ambiente:</span>
                    <span className="gauge-val-normal">{evt.ambientLaeqDb} dB(A)</span>
                  </div>
                  <div className="peak-gauge-item">
                    <span className="gauge-label">Duração:</span>
                    <span className="gauge-val-duration">{evt.durationSeconds}s</span>
                  </div>
                </div>

                <div className="peak-body">
                  <div className="peak-loc">
                    <MapPin size={13} aria-hidden="true" />
                    <strong>{evt.location}</strong>
                  </div>
                  <p className="peak-reason"><strong>Causa detectada:</strong> {evt.reason}</p>
                  <div className="methodology-pill-note">
                    <CheckCircle size={13} aria-hidden="true" />
                    <span>{evt.methodologyNote}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* MODO 3: REGRAS METODOLÓGICAS DA ETAPA 5 */}
      {viewMode === 'regras' && (
        <section className="methodology-rules-section" aria-labelledby="rules-title">
          <div className="rules-header">
            <h2 id="rules-title" className="rules-heading">
              Critérios Metodológicos de Avaliação e Triagem (Etapa 5)
            </h2>
            <p className="rules-sub">
              Como o Sonitus distingue ruído transitório de poluição sonora persistente para orientar a fiscalização pública com base na ABNT NBR 10151 e CONAMA 1/1990.
            </p>
          </div>

          <div className="rules-grid-three">
            <article className="rule-card">
              <div className="rule-step-number">1</div>
              <h3>Janela de Avaliação de 10 Minutos</h3>
              <p>O nível sonoro contínuo equivalente (LAeq) é calculado e consolidado em blocos móveis de 10 minutos por cada sensor da malha urbana.</p>
              <div className="rule-card-footer">
                <span>Norma: ABNT NBR 10151</span>
              </div>
            </article>

            <article className="rule-card">
              <div className="rule-step-number">2</div>
              <h3>Persistência: 2 Janelas Consecutivas</h3>
              <p>Um <strong>alerta de fiscalização</strong> só é disparado quando o LAeq supera o limite normativo da área por duas janelas seguidas (mínimo de 20 minutos de excesso contínuo).</p>
              <div className="rule-card-footer">
                <span>Filtro de Ruído Contínuo</span>
              </div>
            </article>

            <article className="rule-card">
              <div className="rule-step-number">3</div>
              <h3>Reincidência Crítica: 3 Alertas em 1h</h3>
              <p>Ocorrências com 3 alertas gerados no mesmo ponto em 1 hora recebem prioridade máxima vermelha para despacho imediato da Sedur ou planejamento de blitz.</p>
              <div className="rule-card-footer">
                <span>Prioridade Operacional Máxima</span>
              </div>
            </article>
          </div>

          <div className="limits-table-card">
            <h3>Tabela de Limites de Referência Normativos Aplicados (ABNT NBR 10151 / CONAMA 01/90)</h3>
            <div className="limits-table-wrapper">
              <table className="limits-table">
                <thead>
                  <tr>
                    <th scope="col">Tipo de Área Urbana</th>
                    <th scope="col">Período Diurno (07h às 22h)</th>
                    <th scope="col">Período Noturno (22h às 07h)</th>
                    <th scope="col">Atenção Prioritária Sonitus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Área de Hospitais e Clínicas</strong></td>
                    <td>50 dB(A)</td>
                    <td>45 dB(A)</td>
                    <td>Repouso de pacientes e pessoas no espectro autista</td>
                  </tr>
                  <tr>
                    <td><strong>Área Estritamente Residencial</strong></td>
                    <td>55 dB(A)</td>
                    <td>50 dB(A)</td>
                    <td>Descanso noturno e convivência familiar</td>
                  </tr>
                  <tr>
                    <td><strong>Área Mista com Comércio e Lazer</strong></td>
                    <td>65 dB(A)</td>
                    <td>55 dB(A)</td>
                    <td>Bares, feiras e restaurantes (fiscalização noturna)</td>
                  </tr>
                  <tr>
                    <td><strong>Vias Arteriais de Grande Circulação</strong></td>
                    <td>70 dB(A)</td>
                    <td>60 dB(A)</td>
                    <td>Tráfego de ônibus e caminhões em corredores urbanos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
