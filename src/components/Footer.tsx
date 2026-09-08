import React from 'react'
import { ShieldCheck, Cpu, HeartHandshake } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-brand">
              <span className="footer-logo">Sonitus</span>
              <span className="footer-version">v0.2.0 MVP Acadêmico</span>
            </div>
            <p className="footer-description">
              Conceito de plataforma de inteligência acústica urbana para cidades acessíveis, confortáveis e sensoriais.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">
              <ShieldCheck size={16} aria-hidden="true" />
              Privacidade e Ética
            </h3>
            <p className="footer-note">
              Privacidade por Concepção (Privacy by Design): métricas baseadas exclusivamente em decibéis ponderados (dB LAeq). Sem armazenamento ou análise de áudio de conversas. Não mapeia indivíduos ou residências privadas.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">
              <Cpu size={16} aria-hidden="true" />
              Natureza do Protótipo
            </h3>
            <p className="footer-note">
              Todos os sensores, leituras, alertas e telemetrias exibidos nesta plataforma são <strong>100% simulados</strong> para validação conceitual e acadêmica da arquitetura de software e hardware.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">
              <HeartHandshake size={16} aria-hidden="true" />
              Compromisso Social
            </h3>
            <p className="footer-note">
              Apoio direto a pessoas no espectro autista, indivíduos neurodivergentes com hipersensibilidade auditiva, pacientes hospitalares, idosos e animais urbanos.
            </p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Sonitus — Projeto Acadêmico de Monitoramento Acústico Urbano Inteligente.</p>
          <div className="footer-badges">
            <span className="footer-tag">React 19</span>
            <span className="footer-tag">Three.js 3D</span>
            <span className="footer-tag">Acessibilidade WCAG</span>
            <span className="footer-tag">IoT Simulado</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
