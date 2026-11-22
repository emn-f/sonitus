# Sonitus

> **MVP Acadêmico (v0.2.0) · Protótipo Web Conceitual**  
> Projeto desenvolvido na **Universidade Católica do Salvador (UCSal)** para a disciplina de extensão **Questões Ambientais na Comunidade** (2026.2), sob orientação da **Profa. Dra. Janine Melo**.  
> Demonstração: https://sonitus-delta.vercel.app

Protótipo web de monitoramento acústico urbano e acessibilidade sensorial voltado a pessoas neurodivergentes (especialmente no espectro autista com hipersensibilidade auditiva), pacientes, idosos, fauna urbana e apoio preventivo à fiscalização em Salvador.

> [!NOTE]
> Todos os sensores, leituras (`dB LAeq`), alertas e relatos são **100% simulados** para fins acadêmicos — sem sensores físicos em campo, gravação de áudio ou envio automático de multas.

## O que o MVP entrega

- **Planejar meu conforto:** panorama sonoro por período e melhor janela para sair.
- **Mapa Acústico:** 18 nós simulados em Salvador com manchas de calor (`LAeq`), zonas sensíveis e leitura por turno (**Manhã**, **Tarde**, **Noite**).
- **Zonas Tranquilas & Sensíveis:** hospitais, clínicas, escolas, abrigos de animais e *Oásis de Conforto Acústico* (sem mapear residências).
- **Comunidade & Educação:** relatos **100% anônimos (LGPD)**, cartilha digital (saúde, neurodivergência e fauna) e boas práticas.
- **Alertas & Triagem:** diferencia alertas persistentes de picos isolados com base na **ABNT NBR 10151:2019** e na **Lei Municipal nº 5.354/1998**.
- **Rede de Sensores & Hardware 3D:** telemetria IoT simulada e modelo **3D (Three.js)** do nó conceitual (*ESP32-S3 + MEMS*, com **Privacy by Design**).
- **Acessibilidade:** tema claro/escuro e modo de **movimento reduzido** (`prefers-reduced-motion`).

## Estrutura & Documentação

- [`src/`](src/): `App.tsx`, `components/`, `data/noiseData.ts`, `sections/`, `styles/` (CSS modular) e `types/`.
- [`docs/`](docs/): [Guia de Uso](docs/GUIA_DE_USO.md) · [Contexto do Projeto](docs/sonitus-context.md) · [Arquitetura](docs/ARQUITETURA_E_RECURSOS.md) · [Requisitos](docs/REQUISITOS.md).

## Como rodar

```bash
pnpm install
pnpm dev
```

Validação local: `pnpm typecheck && pnpm lint && pnpm build` (ou via VS Code **Dev Containers**).

## Equipe — UCSal (2026.2)

**Orientação:** Profa. Dra. Janine Melo

- Adilson Miranda Junior
- Alison Andrade Rocha
- Caio Vinícius dos Santos e Santos
- Emanuel Arlan Sousa Silva Ferreira
- Fernanda Lopes Matos
- Guilherme Araujo de Souza
- Jefferson Luiz Santos Fernandes
- Joao Henrique Mendes dos Santos
- Julia Alves de Oliveira Costa
- Marcos Vinicius Sousa Batista
- Raissa Moura dos Santos
- Udimile Macedo de Oliveira
