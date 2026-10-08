import React from 'react'
import {
  AlertCircle,
  Award,
  BookOpen,
  Brain,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  Heart,
  Hospital,
  Info,
  Layers,
  MapPin,
  PawPrint,
  Scale,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'

export const AboutSection: React.FC = () => {
  const teamMembers = [
    'Adilson Miranda Junior',
    'Alison Andrade Rocha',
    'Caio Vinícius dos Santos e Santos',
    'Emanuel Arlan Sousa Silva Ferreira',
    'Fernanda Lopes Matos',
    'Guilherme Araujo de Souza',
    'Jefferson Luiz Santos Fernandes',
    'Joao Henrique Mendes dos Santos',
    'Julia Alves de Oliveira Costa',
    'Marcos Vinicius Sousa Batista',
    'Raissa Moura dos Santos',
  ]

  const legalFramework = [
    {
      title: 'Constituição Federal de 1988 (Art. 225)',
      desc: 'Assegura a todos o direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida.',
    },
    {
      title: 'Lei de Crimes Ambientais (Lei nº 9.605/1998, Art. 54)',
      desc: 'Tipifica a poluição de qualquer natureza em níveis que resultem ou possam resultar em danos à saúde humana com pena de reclusão e multa.',
    },
    {
      title: 'Lei das Contravenções Penais (Decreto-Lei nº 3.688/1941, Art. 42)',
      desc: 'Pune a perturbação do trabalho ou do sossego alheios mediante gritaria, algazarra, profissão ruidosa ou instrumentos sonoros.',
    },
    {
      title: 'Resolução CONAMA nº 1/1990 & ABNT NBR 10151:2019',
      desc: 'Estabelece critérios de medição, limites de LAeq por tipo de zona e períodos diurno e noturno para proteção de áreas habitadas.',
    },
    {
      title: 'Lei Berenice Piana (Lei nº 12.764/2012) & LBI (Lei nº 13.146/2015)',
      desc: 'Reconhece o autismo como deficiência legal e fundamenta o ruído urbano como barreira ambiental que limita a inclusão e o direito à cidade.',
    },
    {
      title: 'Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)',
      desc: 'Garante o princípio de Privacy by Design: o Sonitus não grava áudio, não transcreve conversas e não mapeia residências ou dados pessoais.',
    },
  ]

  const benchmarks = [
    {
      name: 'NoiseCapture (Europa)',
      focus: 'Mapeamento acústico colaborativo via aplicativo de smartphone da comunidade.',
      distinction: 'O Sonitus adiciona nós fixos autônomos, foco em neurodiversidade e triagem para fiscalização.',
    },
    {
      name: 'SONYC — Sounds of New York City (NYU)',
      focus: 'Rede distribuída de sensores acústicos de baixo custo e análise urbana na cidade de Nova York.',
      distinction: 'O Sonitus traz acessibilidade sensorial, cuidado com a fauna urbana e canal comunitário anônimo sem gravação.',
    },
    {
      name: 'Radar Sonoro de São José dos Campos (SP)',
      focus: 'Sistema tecnológico voltado à autuação e fiscalização de veículos com ruído excessivo.',
      distinction: 'O Sonitus compreende o problema sistêmico: onde, quando, com que recorrência e em quais contextos sensíveis ocorre.',
    },
  ]

  return (
    <div className="section-about">
      {/* Hero Institucional e Acadêmico */}
      <section className="about-hero-banner" aria-labelledby="about-title">
        <div className="hero-pill-group">
          <span className="academic-tag">
            <GraduationCap size={14} aria-hidden="true" />
            Universidade Católica do Salvador (UCSal)
          </span>
          <span className="discipline-tag">
            Questões Ambientais na Comunidade
          </span>
          <span className="location-tag">
            <MapPin size={13} aria-hidden="true" />
            Salvador - BA · Outubro de 2026
          </span>
        </div>
        <h1 id="about-title" className="hero-heading">
          Sonitus: Monitoramento Inteligente da Poluição Sonora e Urbana
        </h1>
        <p className="hero-description">
          Projeto acadêmico sob orientação da <strong>Profa. Dra. Janine Melo</strong>, voltado à análise crítica das questões ambientais no cotidiano urbano de Salvador. O Sonitus integra sensoriamento acústico de baixo custo, visualização acessível, apoio preventivo à fiscalização, zonas sensíveis e canal comunitário com foco prioritário em pessoas neurodivergentes e no bem-estar animal.
        </p>
      </section>

      {/* Estudo de Caso Real: Salvador e a Sedur */}
      <section className="case-salvador-card" aria-labelledby="salvador-case-title">
        <div className="case-header">
          <Building2 size={24} className="case-icon" aria-hidden="true" />
          <div>
            <h2 id="salvador-case-title" className="case-title">
              Contexto Urbano: O Desafio do Ruído em Salvador
            </h2>
            <p className="case-sub">
              Dados oficiais que demonstram a concretude e a urgência do problema ambiental no município.
            </p>
          </div>
        </div>

        <div className="case-stats-grid">
          <div className="stat-card">
            <span className="stat-num">10.097</span>
            <span className="stat-label">Denúncias de poluição sonora</span>
            <span className="stat-source">Registradas pela Sedur Salvador entre jan/jun de 2026</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">400+</span>
            <span className="stat-label">Equipamentos apreendidos</span>
            <span className="stat-source">Apreensões em ações de fiscalização urbana no semestre</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">Top Fontes</span>
            <span className="stat-label">Veículos, bares e eventos</span>
            <span className="stat-source">Principais emissores relatados pela população soteropolitana</span>
          </div>
        </div>

        <div className="case-analysis-text">
          <p>
            Atualmente, a fiscalização municipal em Salvador depende em grande parte da formalização de denúncias durante o flagrante sonoro. Sem um monitoramento contínuo e georreferenciado, torna-se difícil identificar padrões temporais e espaciais para atuar de forma preventiva. O Sonitus propõe a infraestrutura conceitual necessária para que a gestão pública atue com dados empíricos e planejamento de rotas e vistorias.
          </p>
        </div>
      </section>

      {/* Os 4 Pilares Sociais e Ambientais */}
      <div className="about-pillars-grid" aria-label="Pilares conceituais do Sonitus">
        <article className="pillar-card">
          <div className="pillar-card-icon neuro">
            <Brain size={24} aria-hidden="true" />
          </div>
          <h3>Neurodivergência & TEA</h3>
          <p>
            O ruído como barreira de acessibilidade. Pessoas no espectro autista com hipersensibilidade auditiva (Gomes et al., 2008; Posar & Visconti, 2018) sofrem sobrecarga sensorial e dor física em vias barulhentas. O Sonitus apoia rotas calmas e previsão acústica.
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon health">
            <Hospital size={24} aria-hidden="true" />
          </div>
          <h3>Saúde Coletiva & Hospitais</h3>
          <p>
            A OMS e a revisão brasileira da Revista CEFAC (Pereira et al., 2025) apontam efeitos extra-auditivos: hipertensão, estresse e insônia. A plataforma estabelece perímetros rigorosos para proteger centros hospitalares e clínicas.
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon animal">
            <PawPrint size={24} aria-hidden="true" />
          </div>
          <h3>Fauna e Bem-Estar Animal</h3>
          <p>
            Cães e gatos ouvem frequências até 4x mais altas e sofrem pânico agudo e taquicardia com fogos e buzinas. Na fauna silvestre, o ruído urbano causa mascaramento da vocalização reprodutiva e fuga de habitats (Gomes, 2024).
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon elderly">
            <Award size={24} aria-hidden="true" />
          </div>
          <h3>Ecologia Integral (Laudato Si')</h3>
          <p>
            Inspirado na Encíclica Laudato Si' do Papa Francisco (n. 44 e 150), o projeto compreende que cuidar do ambiente urbano e combater a poluição visual e acústica é cuidar diretamente da qualidade de vida e dignidade das pessoas.
          </p>
        </article>
      </div>

      {/* Arcabouço Jurídico e Normativo */}
      <section className="legal-framework-section" aria-labelledby="legal-title">
        <div className="section-title-line">
          <Scale size={20} aria-hidden="true" />
          <h2 id="legal-title">Fundamentação Jurídica & Normas Técnicas</h2>
        </div>
        <div className="legal-grid">
          {legalFramework.map((item, idx) => (
            <article key={idx} className="legal-card">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Referências de Soluções Existentes */}
      <section className="benchmarks-section" aria-labelledby="benchmarks-title">
        <div className="section-title-line">
          <Layers size={20} aria-hidden="true" />
          <h2 id="benchmarks-title">Iniciativas de Referência & O Diferencial do Sonitus</h2>
        </div>
        <div className="benchmarks-grid">
          {benchmarks.map((b, idx) => (
            <article key={idx} className="benchmark-card">
              <h4>{b.name}</h4>
              <p className="benchmark-focus"><strong>Abordagem de referência:</strong> {b.focus}</p>
              <p className="benchmark-diff"><strong>Diferencial do Sonitus:</strong> {b.distinction}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Metodologia de Simulação & Limites do Protótipo */}
      <section className="methodology-card" aria-labelledby="methodology-title">
        <div className="methodology-header">
          <Info size={24} className="methodology-icon" aria-hidden="true" />
          <div>
            <h2 id="methodology-title" className="methodology-title">
              Metodologia do Projeto Parcial & Caráter Simulador
            </h2>
            <p className="methodology-sub">
              Diferenciação mandatória entre a proposta conceitual acadêmica e uma futura implantação em campo:
            </p>
          </div>
        </div>

        <div className="simulation-comparison-grid">
          <div className="comparison-box simulated">
            <h4>O que o protótipo demonstra com dados simulados:</h4>
            <ul>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Simulação Baseada na NBR 10151:</strong> Leituras de LAeq parametrizadas por tipo de local e período diurno/noturno com variações realistas.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Regras de Alerta da Etapa 5:</strong> Janelas de 10 minutos, exigência de 2 janelas consecutivas para persistência e reincidência de 3 alertas/hora.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Picos Isolados Diferenciados:</strong> Buzinas de 90 dB e sirenes catalogadas sem emissão de alarme indevido para equipes da fiscalização.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Canal de Relatos Participativos:</strong> Contribuições anônimas sem coleta de dados pessoais, cumprindo a LGPD.</span>
              </li>
            </ul>
          </div>

          <div className="comparison-box real">
            <h4>Limitações reconhecidas no projeto parcial:</h4>
            <ul>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Sem Medições Físicas em Campo:</strong> Não há nós de hardware instalados em postes públicos de Salvador nesta entrega acadêmica.</span>
              </li>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Sem Conexão Governamental Real:</strong> Não emite multas, notificações autônomas ou autos de infração jurídica.</span>
              </li>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Desafios Futuros para Implantação:</strong> Calibração de sensores em câmara acústica, atenuação de vento e chuva, sustentabilidade financeira e convênios institucionais.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Autoria Acadêmica */}
      <section className="academic-team-card" aria-labelledby="team-title">
        <header className="team-header">
          <GraduationCap size={22} aria-hidden="true" />
          <div>
            <h2 id="team-title" className="team-title">Equipe do Projeto Parcial — UCSal</h2>
            <p className="team-sub">
              Estudantes autores do trabalho na disciplina Questões Ambientais na Comunidade:
            </p>
          </div>
        </header>

        <div className="team-names-grid">
          {teamMembers.map((name, idx) => (
            <div key={idx} className="team-name-badge">
              <span className="bullet-dot" />
              <span>{name}</span>
            </div>
          ))}
        </div>

        <footer className="team-footer">
          <p>
            <strong>Orientação Docente:</strong> Profa. Dra. Janine Melo · Universidade Católica do Salvador (UCSal) · Campus Pituaçu · Salvador - BA
          </p>
        </footer>
      </section>
    </div>
  )
}
