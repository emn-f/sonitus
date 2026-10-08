import React from 'react'
import type { NavigationTab, Period } from '../types'
import { Activity, Ear, Menu, Moon, MoreHorizontal, Sun, Wind } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  reducedMotion: boolean
  onToggleReducedMotion: () => void
  activeTab: NavigationTab
  onNavigate: (tab: NavigationTab) => void
  isNavigationOpen: boolean
  onToggleNavigation: () => void
  navigationTriggerRef: React.RefObject<HTMLButtonElement | null>
  period: Period
  onSelectPeriod: (period: Period) => void
}

const primaryNavigation: Array<{ id: NavigationTab; label: string }> = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'mapa', label: 'Mapa acústico' },
  { id: 'zonas-sensiveis', label: 'Zonas de refúgio' },
  { id: 'comunidade', label: 'Comunidade & Educação' },
  { id: 'alertas', label: 'Alertas & Triagem' },
  { id: 'sensores', label: 'Rede de Sensores' },
  { id: 'tecnologia', label: 'Privacidade & Sensores' },
  { id: 'sobre', label: 'Sobre o Projeto' },
]

export const Header: React.FC<HeaderProps> = ({
  theme, onToggleTheme, reducedMotion, onToggleReducedMotion, activeTab,
  onNavigate, isNavigationOpen, onToggleNavigation,
  navigationTriggerRef, period, onSelectPeriod,
}) => (
  <header className="app-header sanctuary-header" role="banner">
    <div className="sanctuary-statusbar">
      <div className="sanctuary-status-inner">
        <span><Ear size={14} aria-hidden="true" /> Previsibilidade sonora para seus trajetos urbanos sem ruído excessivo.</span>
        <span className="sanctuary-status-online"><i aria-hidden="true" /> Zona confortável · monitoramento ativo</span>
      </div>
    </div>
    <div className="header-inner sanctuary-header-inner">
      <div className="sanctuary-header-main-row">
        <a className="brand sanctuary-brand" href="#conteudo" aria-label="Sonitus — ir para o conteúdo principal">
          <div className="brand-mark" aria-hidden="true"><img src="/sonitus-logo.svg" alt="" /></div>
          <div className="brand-text"><span className="brand-name">Sonitus</span></div>
        </a>
        <nav className="sanctuary-primary-nav" aria-label="Navegação principal">
          {primaryNavigation.map((item) => (
            <button type="button" key={item.id} className={activeTab === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)} aria-current={activeTab === item.id ? 'page' : undefined}>{item.label}</button>
          ))}
        </nav>
        <div className="header-controls sanctuary-controls">
          <div className="period-toggle-group desktop-period-toggle" role="group" aria-label="Turno da simulação acústica">
            {(['Manhã', 'Tarde', 'Noite'] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`period-toggle-btn ${period === p ? 'active' : ''}`}
                onClick={() => onSelectPeriod(p)}
                aria-pressed={period === p}
                title={`Simulação de dados acústicos: turno ${p} (NBR 10151)`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="sanctuary-city-status" role="status"><Activity size={13} aria-hidden="true" /><span>Status:</span><strong>{period === 'Noite' ? 'Noturno NBR 10151' : 'Diurno Ativo'}</strong></div>
          <button type="button" className={`header-tool-btn sanctuary-tool sanctuary-motion-toggle ${reducedMotion ? 'active' : ''}`} onClick={onToggleReducedMotion} aria-pressed={reducedMotion} aria-label={reducedMotion ? 'Movimento reduzido ativo. Clique para desativar.' : 'Movimento reduzido inativo. Clique para ativar.'} title={reducedMotion ? 'Movimento reduzido ativo' : 'Ativar movimento reduzido'}><Wind size={17} aria-hidden="true" /><span>{reducedMotion ? 'Movimento reduzido' : 'Reduzir movimento'}</span><i aria-hidden="true" /></button>
          <button type="button" className="header-tool-btn sanctuary-tool" onClick={onToggleTheme} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}>{theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}</button>
          <button type="button" className="nav-menu-toggle sanctuary-menu-toggle" ref={navigationTriggerRef} aria-label={isNavigationOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={isNavigationOpen} aria-controls="app-sidebar" onClick={onToggleNavigation}><MoreHorizontal className="more-options-icon" size={19} aria-hidden="true" /><Menu className="mobile-menu-icon" size={19} aria-hidden="true" /><span>Navegar</span></button>
        </div>
      </div>
      <div className="mobile-period-subbar" role="group" aria-label="Turno da simulação acústica">
        {(['Manhã', 'Tarde', 'Noite'] as Period[]).map((p) => (
          <button
            key={p}
            type="button"
            className={`mobile-period-btn ${period === p ? 'active' : ''}`}
            onClick={() => onSelectPeriod(p)}
            aria-pressed={period === p}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  </header>
)
