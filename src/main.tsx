import { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { levelLabels, periodData, type NoiseLevel, type Period } from './data/noiseData'
import './styles.css'

type Theme = 'light' | 'dark'

const periods: Period[] = ['Manhã', 'Tarde', 'Noite']

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('sonitus-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [period, setPeriod] = useState<Period>('Manhã')
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const data = periodData[period]
  const activePlace = useMemo(
    () => data.readings.find((place) => place.name === selectedPlace) ?? data.current,
    [data, selectedPlace],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sonitus-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reducedMotion)
  }, [reducedMotion])

  function changePeriod(nextPeriod: Period) {
    setPeriod(nextPeriod)
    setSelectedPlace(null)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="topbar">
        <a className="brand" href="#conteudo" aria-label="Sonitus, início">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Sonitus</span>
        </a>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setReducedMotion((value) => !value)} aria-pressed={reducedMotion}>
            {reducedMotion ? 'Movimento reduzido: ativo' : 'Reduzir movimento'}
          </button>
          <button className="theme-button" type="button" onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}>
            <span aria-hidden="true">{theme === 'light' ? '◐' : '☼'}</span>
            {theme === 'light' ? 'Tema escuro' : 'Tema claro'}
          </button>
        </div>
      </header>

      <main id="conteudo" className="dashboard">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">Seu entorno, no seu ritmo</p>
            <h1 id="page-title">Planeje caminhos com mais conforto sensorial.</h1>
            <p className="intro-copy">Leituras simuladas ajudam você a perceber como o som muda pela cidade. Use como apoio para escolher onde e quando ir.</p>
          </div>
          <div className="period-control" role="group" aria-label="Escolha o período da leitura">
            {periods.map((item) => <button key={item} className={period === item ? 'period active' : 'period'} type="button" onClick={() => changePeriod(item)} aria-pressed={period === item}>{item}</button>)}
          </div>
        </section>

        <section className="summary-grid" aria-label="Resumo do período selecionado">
          <article className="summary-card current-card">
            <p className="card-label">Leitura agora · {period}</p>
            <div className="level-line"><span className={`status-dot ${activePlace.level}`} aria-hidden="true" /><strong>{activePlace.decibels} dB</strong></div>
            <p className="level-name">{levelLabels[activePlace.level]} em {activePlace.name}</p>
            <p className="muted">{activePlace.note}</p>
          </article>
          <article className="summary-card">
            <p className="card-label">Melhor janela</p>
            <strong className="summary-value">{data.bestTime}</strong>
            <p className="muted">Uma faixa com menor intensidade estimada.</p>
          </article>
          <article className="summary-card">
            <p className="card-label">Área mais tranquila</p>
            <strong className="summary-value">{data.quietArea}</strong>
            <p className="muted">Boa opção para uma pausa ou trajeto alternativo.</p>
          </article>
        </section>

        <section className="content-grid" aria-label="Mapa e níveis sonoros">
          <article className="panel map-panel">
            <div className="panel-heading"><div><p className="eyebrow">Mapa acústico</p><h2>Como o entorno está no período da {period.toLowerCase()}</h2></div><span className="simulated-badge">Dados simulados</span></div>
            <p className="panel-description">Selecione um ponto para ler os detalhes. As áreas são esquemáticas e não representam endereços reais.</p>
            <div className="map-area" role="group" aria-label={`Pontos de ruído no período da ${period.toLowerCase()}`}>
              <div className="map-road road-one" aria-hidden="true" /><div className="map-road road-two" aria-hidden="true" /><div className="map-block block-one" aria-hidden="true" /><div className="map-block block-two" aria-hidden="true" />
              {data.readings.map((place, index) => <button key={place.name} type="button" className={`map-point point-${index} ${place.level} ${activePlace.name === place.name ? 'selected' : ''}`} onClick={() => setSelectedPlace(place.name)} aria-label={`${place.name}: ${place.decibels} decibéis, ${levelLabels[place.level]}. ${place.note}`}>
                <span aria-hidden="true" /><span className="point-label">{place.name}</span>
              </button>)}
              <p className="map-caption">Distrito ilustrativo · {period}</p>
            </div>
            <div className="legend" aria-label="Legenda de níveis"><span><i className="status-dot tranquilo" />Tranquilo</span><span><i className="status-dot moderado" />Moderado</span><span><i className="status-dot intenso" />Intenso</span></div>
            <div className="selected-reading" aria-live="polite"><span className={`status-dot ${activePlace.level}`} aria-hidden="true" /><p><strong>{activePlace.name}</strong> · {activePlace.decibels} dB · {levelLabels[activePlace.level]}<br /><span>{activePlace.note}</span></p></div>
          </article>

          <article className="panel chart-panel">
            <div className="panel-heading"><div><p className="eyebrow">Ritmo do dia</p><h2>Níveis estimados por horário</h2></div></div>
            <p className="panel-description">Use as variações como uma referência de planejamento, não como medição em tempo real.</p>
            <div className="chart" role="img" aria-label={`Gráfico: ${data.chart.map((item) => `${item.hour}, ${item.decibels} decibéis`).join('; ')}`}>
              {data.chart.map((item, index) => <div className="bar-column" key={item.hour}><span className="bar-value">{item.decibels}</span><div className="bar-track"><div className={`bar bar-${index} ${getLevel(item.decibels)}`} /></div><span className="bar-label">{item.hour}</span></div>)}
            </div>
            <details className="data-table"><summary>Ver dados em texto</summary><ul>{data.chart.map((item) => <li key={item.hour}>{item.hour}: {item.decibels} dB ({levelLabels[getLevel(item.decibels)]})</li>)}</ul></details>
          </article>
        </section>
      </main>
      <footer>Sonitus · informações para apoiar escolhas com mais conforto sensorial.</footer>
    </div>
  )
}

function getLevel(decibels: number): NoiseLevel {
  if (decibels < 55) return 'tranquilo'
  if (decibels < 70) return 'moderado'
  return 'intenso'
}

createRoot(document.getElementById('root')!).render(<App />)
