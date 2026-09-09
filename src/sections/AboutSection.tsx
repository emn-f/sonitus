import React from 'react'
import {
  AlertCircle,
  BookOpen,
  Brain,
  CheckCircle2,
  Hospital,
  Info,
  PawPrint,
  Users,
} from 'lucide-react'

export const AboutSection: React.FC = () => {
  return (
    <div className="section-about">
      {/* Hero */}
      <section className="about-hero-banner" aria-labelledby="about-title">
        <div className="hero-pill-group">
          <span className="academic-tag">
            <BookOpen size={14} aria-hidden="true" />
            Fundamentação Teórica & Metodologia
          </span>
          <span className="prototype-tag">MVP Acadêmico Interativo</span>
        </div>
        <h1 id="about-title" className="hero-heading">
          Sobre o Sonitus: Monitoramento Acústico Inteligente & Inclusão Urbana
        </h1>
        <p className="hero-description">
          O Sonitus nasceu para responder a um dos problemas mais invisíveis e negligenciados das metrópoles contemporâneas: a <strong>poluição sonora crônica</strong> e seus impactos severos na saúde física, mental e sensorial de grupos vulneráveis.
        </p>
      </section>

      {/* Grid de Pilares */}
      <div className="about-pillars-grid" aria-label="Pilares conceituais do Sonitus">
        <article className="pillar-card">
          <div className="pillar-card-icon neuro">
            <Brain size={24} aria-hidden="true" />
          </div>
          <h3>Neurodivergência & TEA</h3>
          <p>
            Pessoas no espectro autista frequentemente apresentam hipersensibilidade auditiva (hiperacusia). Ambientes com picos imprevisíveis de ruído mecânico ou buzinas causam sobrecarga sensorial severa (sensory meltdown), pânico e isolamento social. O Sonitus oferece previsibilidade para trajetos e pausas com conforto acústico.
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon health">
            <Hospital size={24} aria-hidden="true" />
          </div>
          <h3>Saúde Hospitalar & Pacientes</h3>
          <p>
            O ruído em perímetros hospitalares eleva a pressão arterial de pacientes, fragmenta o sono reparador e aumenta o estresse do corpo médico. A plataforma estabelece zonas de silêncio rigorosas e detecta violações recorrentes nas imediações de centros de saúde.
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon elderly">
            <Users size={24} aria-hidden="true" />
          </div>
          <h3>Idosos & Qualidade de Vida</h3>
          <p>
            A poluição sonora contínua é fator de risco comprovado pela OMS para demência, acidentes cardiovasculares e fadiga cognitiva em pessoas idosas. O Sonitus apoia a escolha de percursos para caminhadas calmas em bairros residenciais arborizados.
          </p>
        </article>

        <article className="pillar-card">
          <div className="pillar-card-icon animal">
            <PawPrint size={24} aria-hidden="true" />
          </div>
          <h3>Bem-Estar Animal Urbano</h3>
          <p>
            Cães, gatos e aves urbanas possuem espectro auditivo mais amplo e sensível que os humanos. Ruídos de tráfego intenso e fogos causam desorientação e estresse cardíaco. Monitorar abrigos e parques protege também a fauna doméstica e urbana.
          </p>
        </article>
      </div>

      {/* Seção Metodológica: Simulado vs Real */}
      <section className="methodology-card" aria-labelledby="methodology-title">
        <div className="methodology-header">
          <Info size={24} className="methodology-icon" aria-hidden="true" />
          <div>
            <h2 id="methodology-title" className="methodology-title">
              Metodologia de Simulação & Limites do Protótipo
            </h2>
            <p className="methodology-sub">
              Diferenciação mandatória entre um protótipo acadêmico e uma implantação municipal física:
            </p>
          </div>
        </div>

        <div className="simulation-comparison-grid">
          <div className="comparison-box simulated">
            <h4>O que o Sonitus é nesta entrega acadêmica:</h4>
            <ul>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Protótipo Interativo Completo:</strong> Interface funcional construída em React 19, TypeScript e CSS puro com visualizador 3D em Three.js.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Dados Realistas Simulados:</strong> 12 sensores modelados com curvas horárias e correlações urbanas plausíveis para validação de layout e experiência.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" aria-hidden="true" />
                <span><strong>Simulação de Algoritmos:</strong> Demonstração de cálculo de índices LAeq, detecção de recorrência de alertas e cartografia de calor.</span>
              </li>
            </ul>
          </div>

          <div className="comparison-box real">
            <h4>O que o Sonitus NÃO alega possuir nesta etapa:</h4>
            <ul>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Sem Sensores Físicos Instalados:</strong> Não há dispositivos físicos instalados em postes da cidade nem medições de campo nesta entrega.</span>
              </li>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Sem Conexão Governamental:</strong> Não há integração com órgãos municipais de fiscalização, CET, polícia ou emissão de multas.</span>
              </li>
              <li>
                <AlertCircle size={16} className="alert-icon" aria-hidden="true" />
                <span><strong>Sem Rastreamento de Indivíduos:</strong> A plataforma não rastreia usuários, não coleta geolocalização por GPS nem mapeia residências privadas.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap para Futura Implementação Real */}
      <section className="roadmap-section" aria-labelledby="roadmap-title">
        <h2 id="roadmap-title" className="roadmap-heading">
          Roadmap para Evolução em Cidade Piloto
        </h2>
        <div className="roadmap-steps">
          <div className="roadmap-item">
            <span className="step-num">Fase 1</span>
            <h4>Validação de Software & Ergonomia Sensorial</h4>
            <p>Concluída nesta entrega: Protótipo interativo com foco em acessibilidade sensorial, WCAG e visualização 3D do conceito de hardware.</p>
          </div>
          <div className="roadmap-item">
            <span className="step-num">Fase 2</span>
            <h4>Montagem de 3 Nós Piloto em ESP32</h4>
            <p>Construção de bancada física com ESP32-S3 e microfones MEMS I2S INMP441 em câmara de teste acústico para calibração com decibelímetro profissional classe 1.</p>
          </div>
          <div className="roadmap-item">
            <span className="step-num">Fase 3</span>
            <h4>Piloto em Campus Universitário / Hospital</h4>
            <p>Instalação de nós em postes de teste com gateway LoRaWAN municipal para aferição em ambiente externo real sem armazenamento de áudio.</p>
          </div>
          <div className="roadmap-item">
            <span className="step-num">Fase 4</span>
            <h4>Integração Cidadã & Apoio à Gestão</h4>
            <p>Disponibilização da plataforma como serviço público municipal de mobilidade sensorial e apoio à tomada de decisão urbana sustentável.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
