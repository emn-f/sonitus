import React, { useState } from 'react'
import type { CommunityImpactType, CommunityReport, CommunitySourceType, DistrictId, NavigationTab, Period } from '../types'
import { districtsList, initialCommunityReports } from '../data/noiseData'
import {
  AlertTriangle,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  Heart,
  HelpCircle,
  Info,
  Layers,
  MapPin,
  MessageSquare,
  PawPrint,
  Send,
  Shield,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'

interface CommunityEducationSectionProps {
  period: Period
  onNavigate: (tab: NavigationTab) => void
  onSelectPlace: (placeName: string) => void
}

export const CommunityEducationSection: React.FC<CommunityEducationSectionProps> = ({
  period,
  onNavigate,
  onSelectPlace,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'relatos' | 'educacao' | 'cartilha'>('relatos')

  // Estado dos relatos comunitários
  const [reports, setReports] = useState<CommunityReport[]>(initialCommunityReports)
  const [filterImpact, setFilterImpact] = useState<string>('todos')
  const [filterDistrict, setFilterDistrict] = useState<string>('todos')

  // Form state
  const [formLocation, setFormLocation] = useState('')
  const [formDistrict, setFormDistrict] = useState<DistrictId>('centro')
  const [formPeriod, setFormPeriod] = useState<Period>(period)
  const [formSource, setFormSource] = useState<CommunitySourceType>('som_automotivo')
  const [formImpact, setFormImpact] = useState<CommunityImpactType>('tea_hipersensibilidade')
  const [formIntensity, setFormIntensity] = useState<'leve' | 'moderado' | 'intenso' | 'severo'>('intenso')
  const [formDescription, setFormDescription] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formLocation.trim() || !formDescription.trim()) return

    const newReport: CommunityReport = {
      id: `REL-2026-${String(reports.length + 1).padStart(3, '0')}`,
      anonymousCode: `Colaborador(a) Anônimo(a) #${Math.floor(1000 + Math.random() * 9000)}`,
      location: formLocation.trim(),
      districtId: formDistrict,
      timestamp: 'Agora mesmo',
      period: formPeriod,
      sourceType: formSource,
      impactType: formImpact,
      intensityPerceived: formIntensity,
      description: formDescription.trim(),
      status: 'registrado',
      sensorCorrelation: 'Em processamento de correlação com malha de sensores da área',
    }

    setReports([newReport, ...reports])
    setFormLocation('')
    setFormDescription('')
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  const filteredReports = reports.filter((r) => {
    if (filterImpact !== 'todos' && r.impactType !== filterImpact) return false
    if (filterDistrict !== 'todos' && r.districtId !== filterDistrict) return false
    return true
  })

  const getImpactBadge = (impact: CommunityImpactType) => {
    switch (impact) {
      case 'tea_hipersensibilidade':
        return { label: 'Sobrecarga Sensorial / TEA', icon: Brain, className: 'impact-tea' }
      case 'animais':
        return { label: 'Bem-Estar Animal', icon: PawPrint, className: 'impact-animal' }
      case 'sono':
        return { label: 'Perturbação do Sono', icon: VolumeX, className: 'impact-sono' }
      case 'trabalho_estudo':
        return { label: 'Concentração & Trabalho', icon: BookOpen, className: 'impact-trabalho' }
      case 'saude_idosos':
        return { label: 'Saúde de Idosos', icon: Heart, className: 'impact-idosos' }
      default:
        return { label: 'Incômodo Geral', icon: Volume2, className: 'impact-geral' }
    }
  }

  return (
    <div className="section-community-education">
      {/* Hero Banner */}
      <section className="community-hero-banner" aria-labelledby="community-title">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="community-tag">
              <MessageSquare size={14} aria-hidden="true" />
              Canal de Escuta Cidadã
            </span>
            <span className="privacy-pill">
              <Shield size={14} aria-hidden="true" />
              100% Anônimo (LGPD)
            </span>
          </div>
          <h1 id="community-title" className="hero-heading">
            Participação Comunitária & Educação Ambiental
          </h1>
          <p className="hero-description">
            O decibelímetro mede o volume, mas não mede o estresse. Relate aqui o impacto do barulho perto de você, sem se identificar. Os dados apoiam ações para pessoas autistas e animais.
          </p>
        </div>

        <div className="community-concept-callout" role="note">
          <Info size={20} className="callout-icon" aria-hidden="true" />
          <div>
            <strong>Complementaridade Metodológica</strong>
            <p>
              O relato dos moradores ajuda a identificar incômodos que o sensor sozinho não consegue registrar.
            </p>
          </div>
        </div>
      </section>

      {/* Navegação entre Sub-abas */}
      <div className="subtabs-bar" role="tablist" aria-label="Seções de Comunidade e Educação">
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'relatos'}
          className={`subtab-btn ${activeSubTab === 'relatos' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('relatos')}
        >
          <MessageSquare size={16} aria-hidden="true" />
          <span>Relatos da População ({reports.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'cartilha'}
          className={`subtab-btn ${activeSubTab === 'cartilha' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('cartilha')}
        >
          <BookOpen size={16} aria-hidden="true" />
          <span>Cartilha: Saúde e Leis</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'educacao'}
          className={`subtab-btn ${activeSubTab === 'educacao' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('educacao')}
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>Dicas e Ações</span>
        </button>
      </div>

      {/* ABA 1: CANAL DE RELATOS CIDADÃOS */}
      {activeSubTab === 'relatos' && (
        <div className="community-reports-view">
          <div className="reports-layout-grid">
            {/* Formulário de Envio sem Coleta de Dados Pessoais */}
            <section className="report-form-card" aria-labelledby="form-report-title">
              <header className="form-card-header">
                <div className="form-title-group">
                  <h2 id="form-report-title" className="form-title">Registrar Relato de Incômodo Sonoro</h2>
                  <p className="form-subtitle">
                    Em conformidade com a LGPD, este formulário <strong>não solicita nome, telefone, e-mail ou documento</strong>.
                  </p>
                </div>
              </header>

              {formSubmitted && (
                <div className="form-success-banner" role="status">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Relato registrado com sucesso! Ele foi adicionado ao painel participativo.</span>
                </div>
              )}

              <form onSubmit={handleSubmitReport} className="report-form">
                <div className="form-row">
                  <label htmlFor="report-district" className="form-label">
                    Bairro / Distrito:
                  </label>
                  <select
                    id="report-district"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value as DistrictId)}
                    className="form-select"
                  >
                    {districtsList.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="report-location" className="form-label">
                    Referência do Local (rua, praça ou cruzamento):
                  </label>
                  <input
                    id="report-location"
                    type="text"
                    required
                    placeholder="Ex: Próximo à praça central, em frente ao hospital..."
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-grid-two">
                  <div className="form-row">
                    <label htmlFor="report-period" className="form-label">Período da Ocorrência:</label>
                    <select
                      id="report-period"
                      value={formPeriod}
                      onChange={(e) => setFormPeriod(e.target.value as Period)}
                      className="form-select"
                    >
                      <option value="Manhã">Manhã (06h às 12h)</option>
                      <option value="Tarde">Tarde (12h às 18h)</option>
                      <option value="Noite">Noite (18h às 06h)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor="report-source" className="form-label">Fonte de Ruído:</label>
                    <select
                      id="report-source"
                      value={formSource}
                      onChange={(e) => setFormSource(e.target.value as CommunitySourceType)}
                      className="form-select"
                    >
                      <option value="som_automotivo">Som automotivo / Paredão</option>
                      <option value="trafego">Tráfego intenso / Motos ruidosas</option>
                      <option value="comercio">Bares / Restaurantes / Shows</option>
                      <option value="obras">Construção civil / Reformas</option>
                      <option value="fogos">Fogos de artifício com estampido</option>
                      <option value="animais">Latidos excessivos contínuos</option>
                      <option value="outro">Outra fonte</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-two">
                  <div className="form-row">
                    <label htmlFor="report-impact" className="form-label">Impacto Principal Percebido:</label>
                    <select
                      id="report-impact"
                      value={formImpact}
                      onChange={(e) => setFormImpact(e.target.value as CommunityImpactType)}
                      className="form-select"
                    >
                      <option value="tea_hipersensibilidade">Pessoa com TEA / Sobrecarga Sensorial</option>
                      <option value="animais">Animais em pânico / Bem-Estar Animal</option>
                      <option value="sono">Perturbação do repouso e sono</option>
                      <option value="trabalho_estudo">Impossibilidade de estudo / trabalho</option>
                      <option value="saude_idosos">Idosos / Convalescença hospitalar</option>
                      <option value="geral">Desconforto acústico geral</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor="report-intensity" className="form-label">Nível de Incômodo:</label>
                    <select
                      id="report-intensity"
                      value={formIntensity}
                      onChange={(e) => setFormIntensity(e.target.value as any)}
                      className="form-select"
                    >
                      <option value="leve">Leve (perceptível mas suportável)</option>
                      <option value="moderado">Moderado (dificulta concentração)</option>
                      <option value="intenso">Intenso (provoca estresse agudo)</option>
                      <option value="severo">Severo (provoca pânico ou dor física)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="report-desc" className="form-label">Descrição do Incômodo e Contexto:</label>
                  <textarea
                    id="report-desc"
                    required
                    rows={3}
                    placeholder="Descreva a frequência, o impacto no entorno e se há pessoas vulneráveis ou animais afetados..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="form-submit-btn">
                  <Send size={16} aria-hidden="true" />
                  <span>Enviar Relato Comunitário Anônimo</span>
                </button>
              </form>
            </section>

            {/* Painel de Relatos Recentes e Correlações */}
            <section className="reports-feed-container" aria-labelledby="feed-title">
              <header className="feed-header">
                <div>
                  <h2 id="feed-title" className="feed-heading">Relatos Registrados pela População</h2>
                  <p className="feed-sub">
                    Relatos que mostram onde o som afeta a rotina das pessoas.
                  </p>
                </div>
              </header>

              {/* Filtros de Relatos */}
              <div className="feed-filters-row" role="group" aria-label="Filtros de relatos da comunidade">
                <div className="filter-item">
                  <label htmlFor="filter-impact-sel">Filtro por Impacto:</label>
                  <select
                    id="filter-impact-sel"
                    value={filterImpact}
                    onChange={(e) => setFilterImpact(e.target.value)}
                    className="feed-filter-select"
                  >
                    <option value="todos">Todos os Impactos</option>
                    <option value="tea_hipersensibilidade">Sobrecarga Sensorial / TEA</option>
                    <option value="animais">Bem-Estar Animal</option>
                    <option value="sono">Perturbação do Sono</option>
                    <option value="trabalho_estudo">Concentração & Trabalho</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label htmlFor="filter-district-sel">Bairro:</label>
                  <select
                    id="filter-district-sel"
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    className="feed-filter-select"
                  >
                    <option value="todos">Todos os Bairros</option>
                    {districtsList.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lista de Cards de Relatos */}
              <div className="reports-cards-list">
                {filteredReports.map((report) => {
                  const impactInfo = getImpactBadge(report.impactType)
                  const ImpactIcon = impactInfo.icon
                  return (
                    <article key={report.id} className="community-report-card">
                      <header className="report-card-top">
                        <div className="report-code-badge">
                          <span className="report-id">{report.id}</span>
                          <span className="report-author">{report.anonymousCode}</span>
                          <span className="report-sim-badge">Dados Simulados</span>
                        </div>
                        <span className={`report-impact-pill ${impactInfo.className}`}>
                          <ImpactIcon size={13} aria-hidden="true" />
                          <span>{impactInfo.label}</span>
                        </span>
                      </header>

                      <div className="report-card-body">
                        <div className="report-location-line">
                          <MapPin size={14} aria-hidden="true" />
                          <strong>{report.location}</strong>
                          <span className="report-period-tag">Turno: {report.period}</span>
                        </div>
                        <p className="report-desc-text">“{report.description}”</p>

                        <div className="report-meta-row">
                          <span className={`intensity-badge intensity-${report.intensityPerceived}`}>
                            Gravidade percebida: {report.intensityPerceived.toUpperCase()}
                          </span>
                          <span className="report-time-tag">{report.timestamp}</span>
                        </div>

                        {report.sensorCorrelation && (
                          <div className="correlation-box">
                            <Layers size={13} aria-hidden="true" />
                            <span><strong>Cruzamento Técnico:</strong> {report.sensorCorrelation}</span>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ABA 2: CARTILHA DIGITAL */}
      {activeSubTab === 'cartilha' && (
        <section className="digital-guidebook-view" aria-labelledby="guidebook-title">
          <header className="guidebook-header">
            <h2 id="guidebook-title" className="guidebook-heading">
              Cartilha Sonitus: Ruído Urbano, Saúde Coletiva e Acessibilidade
            </h2>
            <p className="guidebook-lead">
              Material desenvolvido no escopo acadêmico para traduzir a ciência acústica, a legislação brasileira e os princípios de inclusão para a comunidade.
            </p>
          </header>

          <div className="guidebook-chapters-grid">
            {/* Capítulo 1: Saúde Humana */}
            <article className="guidebook-chapter-card">
              <div className="chapter-badge">Capítulo 1</div>
              <h3 className="chapter-title">Efeitos Auditivos e Extra-Auditivos na Saúde</h3>
              <p className="chapter-copy">
                Conforme reconhecido pela Organização Mundial da Saúde (OMS, 2018) e destacado na revisão sistemática brasileira da Revista CEFAC (Pereira et al., 2025), a poluição sonora não causa apenas perda de audição e zumbido (tinnitus).
              </p>
              <ul className="chapter-bullets">
                <li><strong>Efeitos Cardiovasculares:</strong> A exposição contínua eleva o cortisol e a adrenalina, aumentando a pressão arterial sistêmica e o risco de infartos e AVC.</li>
                <li><strong>Fragmentação do Sono:</strong> Mesmo sons abaixo do despertar consciente interrompem as fases profundas (sono REM), gerando fadiga crônica e imunodepressão.</li>
                <li><strong>Saúde Mental e Cognitiva:</strong> Irritabilidade crônica, ansiedade e queda severa de concentração em ambientes escolares e de trabalho.</li>
              </ul>
              <div className="chapter-normative-note">
                <strong>Base Normativa:</strong> ABNT NBR 10151:2019 e Resolução CONAMA nº 1/1990 fixam critérios de avaliação para proteção do bem-estar e da saúde em áreas habitadas.
              </div>
            </article>

            {/* Capítulo 2: Neurodivergência */}
            <article className="guidebook-chapter-card highlight-tea">
              <div className="chapter-badge">Capítulo 2</div>
              <h3 className="chapter-title">Neurodiversidade, Autismo e Hipersensibilidade Auditiva</h3>
              <p className="chapter-copy">
                Pessoas no espectro autista frequentemente apresentam alterações no processamento sensorial auditivo (Gomes, Pedroso & Wagner, 2008; Posar & Visconti, 2018).
              </p>
              <ul className="chapter-bullets">
                <li><strong>O Ruído como Barreira Ambiental:</strong> A Lei nº 12.764/2012 (Política Nacional de Proteção à Pessoa com TEA) e a Lei Brasileira de Inclusão (Lei nº 13.146/2015) determinam que acessibilidade não é apenas arquitetônica: o ambiente sonoro hostil restringe a autonomia e a convivência.</li>
                <li><strong>Sobrecarga Sensorial (Meltdown):</strong> Buzinas súbitas e motores desregulados geram dor física real e desregulação emocional severa.</li>
                <li><strong>A Experiência Humana Além dos Decibéis:</strong> Um mesmo nível instrumental pode ser aceitável para uma pessoa neurotípica e insuportável para quem tem hipersensibilidade.</li>
              </ul>
              <div className="chapter-normative-note">
                <strong>Diretriz Sonitus:</strong> Mapear refúgios sensoriais e rotas de baixo ruído para assegurar o direito à cidade a todos os cidadãos.
              </div>
            </article>

            {/* Capítulo 3: Animais */}
            <article className="guidebook-chapter-card highlight-animal">
              <div className="chapter-badge">Capítulo 3</div>
              <h3 className="chapter-title">Fauna Doméstica, Animais Silvestres e Biodiversidade Urbana</h3>
              <p className="chapter-copy">
                A poluição sonora urbana constitui uma forma de degradação ecológica invisibilizada que atinge severamente animais domésticos e a fauna em cidades (Gomes, 2024).
              </p>
              <ul className="chapter-bullets">
                <li><strong>Audição de Alta Frequência em Cães e Gatos:</strong> Cães percebem sons de até 45.000 Hz (humanos até 20.000 Hz). Estampidos e escapamentos provocam pânico, taquicardia, fugas e acidentes graves.</li>
                <li><strong>Mascaramento Acústico da Fauna Silvestre:</strong> O ruído constante de tráfego encobre o canto de cortejo e alertas de predadores de aves urbanas, expulsando espécies de parques e áreas verdes.</li>
                <li><strong>Cuidado em Abrigos e Clínicas:</strong> Manter perímetros com LAeq controlado abaixo de 50 dB é indispensável para evitar convulsões e pânico em recintos de resgate.</li>
              </ul>
              <div className="chapter-normative-note">
                <strong>Recomendação Prática:</strong> Substituir fogos com estampido por efeitos visuais luminosos e preservar corredores verdes de amortecimento sonoro.
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ABA 3: MATERIAIS EDUCATIVOS & BOAS PRÁTICAS */}
      {activeSubTab === 'educacao' && (
        <section className="educational-materials-view" aria-labelledby="materials-title">
          <header className="materials-header">
            <h2 id="materials-title" className="materials-heading">
              Materiais de Conscientização & Boas Práticas Cidadãs
            </h2>
            <p className="materials-sub">
              Práticas cotidianas simples para reduzir as emissões sonoras e promover uma convivência urbana solidária em Salvador.
            </p>
          </header>

          <div className="practices-grid">
            <article className="practice-card">
              <div className="practice-icon"><VolumeX size={24} /></div>
              <h3>Trânsito Gentil e Mobilidade</h3>
              <p>Evite o uso indiscriminado de buzinas em engarrafamentos. Mantenha os escapamentos de motocicletas e automóveis em conformidade original, sem adulterações de ruído.</p>
              <span className="practice-tag">Impacto: Redução de até 15 dB em vias arteriais</span>
            </article>

            <article className="practice-card">
              <div className="practice-icon"><Heart size={24} /></div>
              <h3>Respeito aos Perímetros Sensíveis</h3>
              <p>Ao circular no entorno de hospitais, clínicas pediátricas, escolas e abrigos de animais, reduza a aceleração e desligue caixas de som automotivo imediatamente.</p>
              <span className="practice-tag">Impacto: Proteção direta a pacientes e neurodivergentes</span>
            </article>

            <article className="practice-card">
              <div className="practice-icon"><PawPrint size={24} /></div>
              <h3>Celebrações Sem Estampido</h3>
              <p>Adote celebrações conscientes sem fogos de artifício ruidosos. Os animais domésticos, a fauna de parques e pessoas autistas agradecem a substituição por luzes silenciosas.</p>
              <span className="practice-tag">Impacto: Prevenção de estresse agudo e fugas de animais</span>
            </article>

            <article className="practice-card">
              <div className="practice-icon"><Shield size={24} /></div>
              <h3>Comércio e Estabelecimentos Conscientes</h3>
              <p>Bares e restaurantes com música ao vivo devem investir em tratamento acústico e limitar o som ambiente às áreas internas após as 22h, conforme legislação municipal.</p>
              <span className="practice-tag">Impacto: Respeito ao repouso e qualidade de vida da vizinhança</span>
            </article>
          </div>

          <div className="laudato-si-banner" role="complementary">
            <div className="laudato-header">
              <Award size={22} className="laudato-icon" aria-hidden="true" />
              <div>
                <strong>Ecologia Integral e Qualidade da Vida Cotidiana</strong>
                <span className="laudato-ref">Encíclica Laudato Si’ — Papa Francisco (n. 44 e n. 150)</span>
              </div>
            </div>
            <blockquote className="laudato-quote">
              "Muitas cidades tornam-se pouco saudáveis para viver, devido não só à poluição da água ou do solo, mas também à poluição visual e acústica. [...] Cuidar do ambiente urbano significa cuidar das pessoas que nele habitam, promovendo a harmonia com o ambiente e o encontro entre elas."
            </blockquote>
          </div>
        </section>
      )}
    </div>
  )
}
