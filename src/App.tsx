import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import type { NavigationTab, Period } from './types'
import { alertsList, sensorsList } from './data/noiseData'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { OverviewSection } from './sections/OverviewSection'
import { MapSection } from './sections/MapSection'
import { SensitiveZonesSection } from './sections/SensitiveZonesSection'
import { AlertsSection } from './sections/AlertsSection'
import { SensorsSection } from './sections/SensorsSection'
import { AboutSection } from './sections/AboutSection'

const TechnologySection = lazy(() =>
  import('./sections/TechnologySection').then((m) => ({ default: m.TechnologySection }))
)

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('sonitus-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [period, setPeriod] = useState<Period>('Manhã')
  const [activeTab, setActiveTab] = useState<NavigationTab>('visao-geral')
  const [selectedPlaceName, setSelectedPlaceName] = useState<string | null>(null)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const navigationTriggerRef = useRef<HTMLButtonElement>(null)
  const mainContentRef = useRef<HTMLElement>(null)
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem('sonitus-reduce-motion')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Sincroniza tema com documento HTML
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sonitus-theme', theme)
  }, [theme])

  // Sincroniza preferência de movimento
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reducedMotion)
    localStorage.setItem('sonitus-reduce-motion', String(reducedMotion))
  }, [reducedMotion])

  useEffect(() => {
    if (!isNavigationOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNavigationOpen(false)
        queueMicrotask(() => navigationTriggerRef.current?.focus())
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isNavigationOpen])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev)
  }

  // Permite selecionar um local e navegar diretamente até o mapa
  const handleSelectPlaceAndNavigate = (placeName: string) => {
    setSelectedPlaceName(placeName)
    setActiveTab('mapa')
    // Leve scroll para o mapa
    const mapElement = document.getElementById('conteudo')
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab)
    setIsNavigationOpen(false)
    queueMicrotask(() => mainContentRef.current?.focus())
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const closeNavigation = () => {
    setIsNavigationOpen(false)
    queueMicrotask(() => navigationTriggerRef.current?.focus())
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo principal
      </a>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        currentPeriod={period}
        onChangePeriod={setPeriod}
        isNavigationOpen={isNavigationOpen}
        onToggleNavigation={() => setIsNavigationOpen((value) => !value)}
        navigationTriggerRef={navigationTriggerRef}
      />

      <div className="workspace-layout">
        <Navigation
          activeTab={activeTab}
          onSelectTab={handleNavigate}
          alertsCount={alertsList.filter((a) => a.status === 'novo').length}
          sensorsCount={sensorsList.length}
          isOpen={isNavigationOpen}
          onClose={closeNavigation}
        />

        <main ref={mainContentRef} id="conteudo" className="main-content-area" role="region" aria-label="Conteúdo da seção selecionada" tabIndex={-1}>
        {activeTab === 'visao-geral' && (
          <OverviewSection
            period={period}
            onNavigate={handleNavigate}
            onSelectPlace={handleSelectPlaceAndNavigate}
          />
        )}

        {activeTab === 'mapa' && (
          <MapSection
            period={period}
            selectedPlaceName={selectedPlaceName}
            onSelectPlace={setSelectedPlaceName}
          />
        )}

        {activeTab === 'zonas-sensiveis' && (
          <SensitiveZonesSection
            period={period}
            onNavigate={handleNavigate}
            onSelectPlace={handleSelectPlaceAndNavigate}
          />
        )}

        {activeTab === 'alertas' && (
          <AlertsSection
            onNavigate={handleNavigate}
            onSelectPlace={handleSelectPlaceAndNavigate}
          />
        )}

        {activeTab === 'sensores' && (
          <SensorsSection
            period={period}
            onNavigate={handleNavigate}
            onSelectPlace={handleSelectPlaceAndNavigate}
          />
        )}

        {activeTab === 'tecnologia' && (
          <Suspense
            fallback={
              <div className="section-technology technology-loading-state">
                <p className="technology-loading-copy">
                  Carregando ambiente tridimensional do hardware Sonitus...
                </p>
              </div>
            }
          >
            <TechnologySection reducedMotion={reducedMotion} theme={theme} />
          </Suspense>
        )}

        {activeTab === 'sobre' && (
          <AboutSection />
        )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
