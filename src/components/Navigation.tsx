import React from 'react'
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
}) => {
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
    <nav className="main-navigation" aria-label="Navegação da plataforma">
      <div className="nav-inner" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
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
          )
        })}
      </div>
    </nav>
  )
}
