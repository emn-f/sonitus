import React from 'react'
import type { NavigationTab, Period } from '../types'
import { Activity, Ear, Menu, Moon, MoreHorizontal, Sun, Wind } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  reducedMotion: boolean
  onToggleReducedMotion: () => void
  currentPeriod: Period
  onChangePeriod: (period: Period) => void
  activeTab: NavigationTab
  onNavigate: (tab: NavigationTab) => void
  isNavigationOpen: boolean
  onToggleNavigation: () => void
  navigationTriggerRef: React.RefObject<HTMLButtonElement | null>
}

const periods: Period[] = ['Manhã', 'Tarde', 'Noite']
const primaryNavigation: Array<{ id: NavigationTab; label: string }> = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'mapa', label: 'Mapa acústico' },
  { id: 'zonas-sensiveis', label: 'Zonas de refúgio' },
  { id: 'tecnologia', label: 'Privacidade e sensores' },
]

export const Header: React.FC<HeaderProps> = ({
  theme, onToggleTheme, reducedMotion, onToggleReducedMotion, currentPeriod,
  onChangePeriod, activeTab, onNavigate, isNavigationOpen, onToggleNavigation,
  navigationTriggerRef,
}) => (
  <header className="app-header sanctuary-header" role="banner">
    <div className="sanctuary-statusbar">
      <div className="sanctuary-status-inner">
        <span><Ear size={14} aria-hidden="true" /> Previsibilidade sonora para seus trajetos urbanos sem ruído excessivo.</span>
        <span className="sanctuary-status-online"><i aria-hidden="true" /> Zona confortável · monitoramento ativo</span>
      </div>
    </div>
    <div className="header-inner sanctuary-header-inner">
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
        <div className="sanctuary-city-status" role="status"><Activity size={13} aria-hidden="true" /><span>Cidade agora:</span><strong>Moderado suave</strong></div>
        <div className="period-buttons sanctuary-periods" aria-label="Período do monitoramento">
          {periods.map((item) => <button key={item} type="button" className={currentPeriod === item ? 'active' : ''} onClick={() => onChangePeriod(item)} aria-pressed={currentPeriod === item}>{item}</button>)}
        </div>
        <button type="button" className={`header-tool-btn sanctuary-tool sanctuary-motion-toggle ${reducedMotion ? 'active' : ''}`} onClick={onToggleReducedMotion} aria-pressed={reducedMotion} aria-label={reducedMotion ? 'Movimento reduzido ativo. Clique para desativar.' : 'Movimento reduzido inativo. Clique para ativar.'} title={reducedMotion ? 'Movimento reduzido ativo' : 'Ativar movimento reduzido'}><Wind size={17} aria-hidden="true" /><span>{reducedMotion ? 'Movimento reduzido' : 'Reduzir movimento'}</span><i aria-hidden="true" /></button>
        <button type="button" className="header-tool-btn sanctuary-tool" onClick={onToggleTheme} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}>{theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}</button>
        <button type="button" className="nav-menu-toggle sanctuary-menu-toggle" ref={navigationTriggerRef} aria-label={isNavigationOpen ? 'Fechar mais opções' : 'Abrir mais opções'} aria-expanded={isNavigationOpen} aria-controls="app-sidebar" onClick={onToggleNavigation}><MoreHorizontal className="more-options-icon" size={19} aria-hidden="true" /><Menu className="mobile-menu-icon" size={19} aria-hidden="true" /><span>Mais opções</span></button>
      </div>
    </div>
  </header>
)
