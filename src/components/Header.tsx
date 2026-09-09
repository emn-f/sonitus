import React from 'react'
import type { Period } from '../types'
import { Activity, Menu, Moon, Sun, Wind } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  reducedMotion: boolean
  onToggleReducedMotion: () => void
  currentPeriod: Period
  onChangePeriod: (period: Period) => void
  isNavigationOpen: boolean
  onToggleNavigation: () => void
  navigationTriggerRef: React.RefObject<HTMLButtonElement | null>
}

const periods: Period[] = ['Manhã', 'Tarde', 'Noite']

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  reducedMotion,
  onToggleReducedMotion,
  currentPeriod,
  onChangePeriod,
  isNavigationOpen,
  onToggleNavigation,
  navigationTriggerRef,
}) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <div className="header-brand-group">
          <button
            type="button"
            className="nav-menu-toggle"
            ref={navigationTriggerRef}
            aria-label={isNavigationOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isNavigationOpen}
            aria-controls="app-sidebar"
            onClick={onToggleNavigation}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <a className="brand" href="#conteudo" aria-label="Sonitus - Monitoramento Acústico Urbano, ir para conteúdo principal">
            <div className="brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 10v4" />
                <path d="M6 7v10" />
                <path d="M10 4v16" />
                <path d="M14 7v10" />
                <path d="M18 9v6" />
                <path d="M22 11v2" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">Sonitus</span>
              <span className="brand-tagline">Plataforma Acústica Urbana</span>
            </div>
          </a>

          <div className="system-status-pill" role="status" aria-label="Status do sistema: Rede simulada ativa e operacional">
            <span className="status-indicator-pulse" aria-hidden="true" />
            <Activity size={13} className="status-icon" aria-hidden="true" />
            <span className="status-text">Rede Simulada Ativa</span>
          </div>
        </div>

        <div className="header-controls">
          <div className="period-selector-group" role="group" aria-label="Período do monitoramento">
            <span className="period-selector-label" id="period-label">Turno:</span>
            <div className="period-buttons" aria-labelledby="period-label">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`period-btn ${currentPeriod === item ? 'active' : ''}`}
                  onClick={() => onChangePeriod(item)}
                  aria-pressed={currentPeriod === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className={`header-tool-btn ${reducedMotion ? 'active' : ''}`}
              onClick={onToggleReducedMotion}
              title={reducedMotion ? 'Desativar modo movimento reduzido' : 'Ativar modo movimento reduzido'}
              aria-pressed={reducedMotion}
              aria-label={reducedMotion ? 'Movimento reduzido ativo. Clique para desativar' : 'Reduzir animações e movimento'}
            >
              <Wind size={15} aria-hidden="true" />
              <span className="btn-label-desktop">
                {reducedMotion ? 'Movimento: reduzido' : 'Reduzir movimento'}
              </span>
            </button>

            <button
              type="button"
              className="header-tool-btn theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
              aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={15} aria-hidden="true" />
                  <span className="btn-label-desktop">Tema escuro</span>
                </>
              ) : (
                <>
                  <Sun size={15} aria-hidden="true" />
                  <span className="btn-label-desktop">Tema claro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
