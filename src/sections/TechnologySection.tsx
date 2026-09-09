import React from 'react'
import { SensorModel3D } from '../components/SensorModel3D'
import {
  ArrowRight,
  Cpu,
  EyeOff,
  HardDrive,
  Lock,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react'

interface TechnologySectionProps {
  reducedMotion: boolean
  theme: 'light' | 'dark'
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  reducedMotion,
  theme,
}) => {
  return (
    <div className="section-technology">
      {/* Hero Header */}
      <section className="tech-hero-banner" aria-labelledby="tech-heading">
        <div className="banner-left">
          <div className="hero-pill-group">
            <span className="tech-tag">
              <Cpu size={14} aria-hidden="true" />
              Arquitetura de Hardware & Edge Computing
            </span>
            <span className="prototype-tag">Protótipo Conceitual 3D</span>
          </div>
          <h1 id="tech-heading" className="hero-heading">
            Tecnologia: Sensor Urbano & Pipeline IoT
          </h1>
          <p className="hero-description">
            Entenda como os dados acústicos seriam coletados em uma futura cidade inteligente. O hardware foi concebido como uma luminária ambiental compacta, com processamento em borda (Edge Computing) que extrai métricas sonoras em decibéis diretamente no poste, sem jamais gravar voz humana ou armazenar conversas.
          </p>
        </div>
      </section>

      {/* 3D Hardware Model Interactive Section */}
      <section className="tech-3d-interactive-card" aria-labelledby="hardware-model-title">
        <div className="card-top-bar">
          <div>
            <span className="card-mini-eyebrow">Visualização Tridimensional</span>
            <h2 id="hardware-model-title" className="card-main-title">
              Protótipo Conceitual do Sensor Sonitus Node v1.2
            </h2>
          </div>
          <span className="tech-status-badge">
            <Sparkles size={14} aria-hidden="true" />
            Interativo · Três Eixos de Rotação
          </span>
        </div>

        <SensorModel3D reducedMotion={reducedMotion} theme={theme} />
      </section>

      {/* End-to-End Architecture Flow Diagram */}
      <section className="pipeline-flow-section" aria-labelledby="pipeline-heading">
        <div className="pipeline-header">
          <span className="card-mini-eyebrow">Arquitetura de Dados</span>
          <h2 id="pipeline-heading" className="card-main-title">
            Fluxo de Informação Ponta a Ponta: Da Pressão do Ar à Decisão Humana
          </h2>
          <p className="pipeline-description">
            Como a informação flui desde o estímulo mecânico das ondas sonoras urbanas até apoiar uma pessoa neurodivergente a escolher um trajeto calmo ou um gestor público a fiscalizar uma avenida ruidosa:
          </p>
        </div>

        <div className="pipeline-steps-grid" role="list" aria-label="Passos da arquitetura IoT">
          {/* Step 1 */}
          <div className="pipeline-step-card" role="listitem">
            <div className="step-number-badge">1</div>
            <div className="step-icon-circle">
              <Radio size={24} aria-hidden="true" />
            </div>
            <h3 className="step-title">Sensor Urbano</h3>
            <p className="step-subtitle">Captação Acústica MEMS</p>
            <p className="step-copy">
              A membrana do microfone capta a vibração mecânica do ar em 360° através da grade perimétrica da luminária no poste.
            </p>
            <div className="step-feature-tag">Pressão Acústica (dB SPL)</div>
          </div>

          <div className="pipeline-arrow" aria-hidden="true">
            <ArrowRight size={22} />
          </div>

          {/* Step 2 */}
          <div className="pipeline-step-card highlight-privacy" role="listitem">
            <div className="step-number-badge">2</div>
            <div className="step-icon-circle">
              <Cpu size={24} aria-hidden="true" />
            </div>
            <h3 className="step-title">ESP32 / Edge AI</h3>
            <p className="step-subtitle">Processamento em Borda</p>
            <p className="step-copy">
              Amostragem digital direta e cálculo do valor RMS ponderado A (dB(A)). O áudio bruto é descartado em nanossegundos na memória volátil.
            </p>
            <div className="step-feature-tag privacy">Zero Gravação de Voz</div>
          </div>

          <div className="pipeline-arrow" aria-hidden="true">
            <ArrowRight size={22} />
          </div>

          {/* Step 3 */}
          <div className="pipeline-step-card" role="listitem">
            <div className="step-number-badge">3</div>
            <div className="step-icon-circle">
              <Wifi size={24} aria-hidden="true" />
            </div>
            <h3 className="step-title">Rede IoT / Envio</h3>
            <p className="step-subtitle">LoRaWAN & NB-IoT</p>
            <p className="step-copy">
              Transmissão de pacotes ultraleves de telemetria criptografada (apenas 8 bytes com timestamp, dB médio e pico) a cada intervalo.
            </p>
            <div className="step-feature-tag">Baixo Consumo / Longo Alcance</div>
          </div>

          <div className="pipeline-arrow" aria-hidden="true">
            <ArrowRight size={22} />
          </div>

          {/* Step 4 */}
          <div className="pipeline-step-card" role="listitem">
            <div className="step-number-badge">4</div>
            <div className="step-icon-circle">
              <Server size={24} aria-hidden="true" />
            </div>
            <h3 className="step-title">Plataforma Sonitus</h3>
            <p className="step-subtitle">Ingestão & Algoritmos</p>
            <p className="step-copy">
              Agregação espacial dos nós da cidade, cálculo de médias por bairro, geração de heatmap contínuo e acionamento de alertas por recorrência.
            </p>
            <div className="step-feature-tag">Detecção de Anomalias</div>
          </div>

          <div className="pipeline-arrow" aria-hidden="true">
            <ArrowRight size={22} />
          </div>

          {/* Step 5 */}
          <div className="pipeline-step-card" role="listitem">
            <div className="step-number-badge">5</div>
            <div className="step-icon-circle">
              <Users size={24} aria-hidden="true" />
            </div>
            <h3 className="step-title">Impacto Social & Gestão</h3>
            <p className="step-subtitle">Cidadãos e Poder Público</p>
            <p className="step-copy">
              Pessoas autistas encontram oásis sonoros para pausas sensoriais; gestores públicos planejam asfaltos de amortecimento e fiscalizam rotas pesadas.
            </p>
            <div className="step-feature-tag">Acessibilidade & Cidades Calmas</div>
          </div>
        </div>
      </section>

      {/* Privacy and Technical FAQs Card */}
      <section className="tech-privacy-deep-dive" aria-labelledby="privacy-heading">
        <div className="privacy-deep-header">
          <ShieldCheck size={26} className="privacy-badge-icon" aria-hidden="true" />
          <div>
            <h2 id="privacy-heading" className="privacy-deep-title">
              Privacidade por Concepção (Privacy by Design)
            </h2>
            <p className="privacy-deep-sub">
              Três pilares inegociáveis do projeto acadêmico Sonitus para proteção de dados e dignidade individual:
            </p>
          </div>
        </div>

        <div className="privacy-pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon">
              <EyeOff size={20} aria-hidden="true" />
            </div>
            <h4>Impossibilidade Técnica de Escuta</h4>
            <p>
              O firmware do microcontrolador não implementa codecs de áudio (como MP3, AAC ou WAV). O chip de rádio (LoRaWAN) não possui largura de banda sequer para transmitir um trecho de fala de 1 segundo. Ele transmite apenas coordenadas de decibéis.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon">
              <HardDrive size={20} aria-hidden="true" />
            </div>
            <h4>Memória Zero de Armazenamento</h4>
            <p>
              O hardware não possui cartão de memória, memória flash não-volátil para dados de áudio ou buffer persistente. Uma vez calculado o valor RMS instantâneo, os dados analógicos de amplitude são sobrescritos na RAM volátil.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon">
              <Lock size={20} aria-hidden="true" />
            </div>
            <h4>Sem Mapeamento de Indivíduos</h4>
            <p>
              A cartografia acústica do Sonitus restringe-se estritamente ao espaço público (vias, praças, hospitais, parques). O sistema recusa o mapeamento de residências individuais de pessoas neurodivergentes ou com deficiência.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
