import React, { useEffect, useRef } from 'react'
import type { NavigationTab } from '../types'
import {
  LayoutDashboard,
  Map,
  HeartPulse,
  Bell,
  Radio,
  Cpu,
  Info,
} from 'lucide-react'

interface NavigationProps {
  activeTab: NavigationTab
  onSelectTab: (tab: NavigationTab) => void
  alertsCount?: number
  sensorsCount?: number
  isOpen: boolean
  onClose: () => void
}

interface TabItem {
  id: NavigationTab
  label: string
  icon: React.ReactNode
  badge?: number | string
  badgeVariant?: 'critical' | 'neutral'
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  alertsCount = 0,
  sensorsCount = 12,
  isOpen,
  onClose,
}) => {
  const activeItemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) activeItemRef.current?.focus()
  }, [isOpen])
  const tabs: TabItem[] = [
    {
      id: 'visao-geral',
      label: 'Visão Geral',
      icon: <LayoutDashboard size={17} aria-hidden="true" />,
    },
    {
      id: 'mapa',
      label: 'Mapa Acústico',
      icon: <Map size={17} aria-hidden="true" />,
    },
    {
      id: 'zonas-sensiveis',
      label: 'Zonas Sensíveis & Conforto',
      icon: <HeartPulse size={17} aria-hidden="true" />,
    },
    {
      id: 'alertas',
      label: 'Alertas',
      icon: <Bell size={17} aria-hidden="true" />,
      badge: alertsCount > 0 ? alertsCount : undefined,
      badgeVariant: 'critical',
    },
    {
      id: 'sensores',
      label: 'Rede de Sensores',
      icon: <Radio size={17} aria-hidden="true" />,
      badge: `${sensorsCount}`,
      badgeVariant: 'neutral',
    },
    {
      id: 'tecnologia',
      label: 'Tecnologia & Hardware 3D',
      icon: <Cpu size={17} aria-hidden="true" />,
    },
    {
      id: 'sobre',
      label: 'Sobre o Sonitus',
      icon: <Info size={17} aria-hidden="true" />,
    },
  ]

  return (
    <>
      <button className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} type="button" aria-label="Fechar menu de navegação" tabIndex={isOpen ? 0 : -1} onClick={onClose} />
      <aside id="app-sidebar" className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Menu lateral">
        <nav className="sidebar-navigation" aria-label="Navegação da plataforma">
          <p className="sidebar-title">Navegação</p>
          <ul className="nav-list">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <li key={tab.id}>
              <button
                ref={isActive ? activeItemRef : undefined}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={`nav-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`tab-badge badge-${tab.badgeVariant || 'neutral'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            </li>
          )
        })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
