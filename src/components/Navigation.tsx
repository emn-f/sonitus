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
  X,
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
  group: 'Planejar' | 'Área técnica'
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
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return

    activeItemRef.current?.focus()
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const focusable = sidebarRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [isOpen])
  const tabs: TabItem[] = [
    {
      id: 'visao-geral',
      label: 'Planejar meu conforto',
      icon: <LayoutDashboard size={17} aria-hidden="true" />,
      group: 'Planejar',
    },
    {
      id: 'mapa',
      label: 'Mapa Acústico',
      icon: <Map size={17} aria-hidden="true" />,
      group: 'Planejar',
    },
    {
      id: 'zonas-sensiveis',
      label: 'Zonas tranquilas',
      icon: <HeartPulse size={17} aria-hidden="true" />,
      group: 'Planejar',
    },
    {
      id: 'alertas',
      label: 'Alertas',
      icon: <Bell size={17} aria-hidden="true" />,
      group: 'Área técnica',
      badge: alertsCount > 0 ? alertsCount : undefined,
      badgeVariant: 'critical',
    },
    {
      id: 'sensores',
      label: 'Rede de Sensores',
      icon: <Radio size={17} aria-hidden="true" />,
      group: 'Área técnica',
      badge: `${sensorsCount}`,
      badgeVariant: 'neutral',
    },
    {
      id: 'tecnologia',
      label: 'Como funciona',
      icon: <Cpu size={17} aria-hidden="true" />,
      group: 'Área técnica',
    },
    {
      id: 'sobre',
      label: 'Sobre o Sonitus',
      icon: <Info size={17} aria-hidden="true" />,
      group: 'Área técnica',
    },
  ]

  return (
    <>
      <button className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} type="button" aria-label="Fechar menu de navegação" tabIndex={isOpen ? 0 : -1} onClick={onClose} />
      <aside ref={sidebarRef} id="app-sidebar" className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Navegação da plataforma" aria-modal={isOpen} role="dialog">
        <header className="nav-drawer-header">
          <div>
            <span className="nav-drawer-eyebrow">Sonitus</span>
            <strong>Encontre seu caminho</strong>
          </div>
          <button type="button" className="nav-drawer-close" onClick={onClose} aria-label="Fechar navegação">
            <X size={19} aria-hidden="true" />
          </button>
        </header>
        <nav className="sidebar-navigation" aria-label="Navegação da plataforma">
          {(['Planejar', 'Área técnica'] as const).map((group) => (
            <section className="nav-group" key={group} aria-label={group}>
              <p className="sidebar-title">{group}</p>
              <ul className="nav-list">
            {tabs.filter((tab) => tab.group === group).map((tab) => {
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
            </section>
          ))}
        </nav>
      </aside>
    </>
  )
}
