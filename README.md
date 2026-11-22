# Sonitus — Monitoramento Acústico Urbano & Acessibilidade Sensorial

> **MVP Acadêmico (v0.2.0) · Protótipo Web Conceitual**  
> Projeto desenvolvido na **Universidade Católica do Salvador (UCSal)** para a disciplina de extensão **Questões Ambientais na Comunidade (`ELE-EXT009`)**, semestre **2026.2**, sob orientação da **Profa. Dra. Janine Melo**.  
> Demonstração online: https://sonitus-delta.vercel.app

> [!NOTE]
> **Natureza Simulada do Protótipo:** Todos os sensores, leituras de decibéis (`dB LAeq`), alertas de triagem e relatos exibidos nesta plataforma são **100% simulados** para fins acadêmicos e demonstração conceitual. Não há hardware instalado em postes reais de Salvador nem envio de multas ou autos de infração automáticos.

---

## Visão do Produto & Problema

O ruído urbano excessivo prejudica a qualidade de vida e transforma o deslocamento e a permanência em espaços públicos em fontes de sobrecarga sensorial e sofrimento físico. O **Sonitus** propõe uma plataforma de inteligência acústica urbana e acessibilidade sensorial que traduz dados sonoros em orientações claras de conforto para a população — com foco especial em:

- **Pessoas neurodivergentes**, sobretudo no espectro autista (TEA) com hipersensibilidade auditiva;
- **Pacientes hospitalares, idosos, estudantes e cuidadores**;
- **Fauna urbana e animais domésticos** (em abrigos, clínicas veterinárias e parques);
- **Apoio preventivo à fiscalização pública** (priorização de vistorias sem caráter punitivo automatizado).

A leitura ambiental organiza o som por região e período do dia em três faixas compreensíveis:

- **Tranquilo:** ambiente com menor pressão sonora, adequado para permanência e descompressão;
- **Moderado:** ruído perceptível, exigindo atenção em deslocamentos sensíveis;
- **Intenso:** nível elevado, com maior risco de estresse, sobrecarga sensorial ou desconforto físico.

---

## Módulos Entregues no MVP (8 Seções)

A interface segue a identidade **Sonitus Sensory Sanctuary** (tema claro/escuro persistido localmente, contraste acessível WCAG, tipografia *Plus Jakarta Sans*, modo de movimento reduzido e responsividade para desktop, tablet e celular):

1. **Planejar meu conforto (`OverviewSection`):** diagnóstico acústico resumido do período, janela mais calma do dia, curva horária estimada e orientações sensoriais práticas.
2. **Mapa Acústico (`MapSection`):** visualização interativa de Salvador com 18 pontos monitorados simulados, manchas de calor sonoro (`LAeq`), camadas de zonas sensíveis, filtros por distrito/intensidade/categoria e gaveta de inspeção detalhada por turno (**Manhã**, **Tarde** e **Noite**).
3. **Zonas Tranquilas & Sensíveis (`SensitiveZonesSection`):** monitoramento conceitual de hospitais, clínicas, escolas, abrigos de animais e **Oásis de Conforto Acústico** recomendados para pausa sensorial — respeitando o princípio ético de **jamais mapear residências particulares ou indivíduos**.
4. **Comunidade & Educação (`CommunityEducationSection`):**
   - **Relatos da População:** canal participativo **100% anônimo (LGPD)** com persistência local simulada e correlação conceitual com a malha de sensores;
   - **Cartilha Digital (Saúde e Leis):** síntese acessível sobre efeitos extra-auditivos (OMS / Revista CEFAC), neurodivergência e hipersensibilidade auditiva (Lei Berenice Piana e LBI) e impactos sobre a fauna urbana;
   - **Dicas e Boas Práticas:** ações cotidianas de convivência sonora e reflexão de ecologia integral (*Laudato Si'*).
5. **Alertas & Apoio à Fiscalização (`AlertsSection`):** separa ocorrências em três modos:
   - **Alertas em Aberto:** eventos persistentes simulados para apoio à priorização preventiva da Sedur;
   - **Picos Momentâneos:** eventos transitórios curtos (buzinas, sirenes) registrados apenas para diagnóstico, sem disparo automático de fiscalização;
   - **Regras de Medição (Etapa 5):** critérios baseados na **ABNT NBR 10151:2019** em 4 faixas (`45` / `55` / `65` / `70 dB`), **Lei Municipal de Salvador nº 5.354/1998** (`70 dB` das 7h às 22h · `60 dB` das 22h às 7h), persistência de **2 janelas consecutivas de 10 min** e reincidência crítica com **3 ou mais episódios em 7 dias**.
6. **Rede de Sensores (`SensorsSection`):** catálogo dos 18 nós IoT simulados (`Sonitus Node v1.2`) com protocolo (LoRaWAN, NB-IoT e Wi-Fi Mesh), autonomia, firmware e leitura por turno.
7. **Como Funciona / Tecnologia (`TechnologySection`):** visualizador **3D interativo em Three.js** do protótipo conceitual de hardware (ESP32-S3 + microfone MEMS), fluxo de dados de borda e garantia de **Privacy by Design** (cálculo local de decibéis sem gravar áudio ou conversas).
8. **Sobre o Sonitus (`AboutSection`):** dados públicos de contexto em Salvador (Sedur), pilares socioambientais, fundamentação jurídica, benchmarks (*NoiseCapture*, *SONYC*, *Radar Sonoro*), limitações do projeto parcial e equipe autora.

---

## Estrutura Atual do Projeto

```text
src/
├── components/     # Header, Navigation, SoundBadge, SensorModel3D, Footer
├── data/           # Base simulada unificada e parâmetros normativos (noiseData.ts)
├── sections/       # OverviewSection, MapSection, SensitiveZonesSection,
│                   # CommunityEducationSection, AlertsSection, SensorsSection,
│                   # TechnologySection e AboutSection
├── styles/         # Arquitetura CSS modular por domínio (index.css, tokens.css,
│                   # layout.css, overview.css, map.css, zones.css, alerts.css,
│                   # sensors.css, community.css, technology.css, about.css)
├── types/          # Contratos TypeScript de domínio (index.ts)
├── App.tsx         # Shell da aplicação, estado global e lazy loading do 3D
└── main.tsx        # Ponto de montagem React 19
```

Documentação de apoio em [`docs/`](docs/):
- [Guia de Uso](docs/GUIA_DE_USO.md)
- [Contexto Conceitual e Restrições](docs/sonitus-context.md)
- [Arquitetura e Recursos](docs/ARQUITETURA_E_RECURSOS.md)
- [Requisitos](docs/REQUISITOS.md)

---

## Contexto Acadêmico, Orientação & Equipe

- **Instituição:** Universidade Católica do Salvador (UCSal) — Campus Pituaçu · Salvador, BA
- **Disciplina:** Questões Ambientais na Comunidade (`ELE-EXT009`) · Semestre **2026.2**
- **Docente Orientadora:** Profa. Dra. Janine Melo

### Equipe de Estudantes Autores

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

---

## Escopo Não Contemplado Nesta Entrega Acadêmica

- Sensores físicos instalados em via pública ou medições acústicas reais em campo;
- Integração operacional em tempo real com a Sedur ou outros órgãos públicos;
- Aplicação automática de multas ou sanções administrativas;
- Qualquer coleta de dados pessoais ou mapeamento de residências particulares.

---

## Desenvolvimento Local (`pnpm`)

### Execução no terminal

```bash
pnpm install
pnpm dev
```

Para validar tipagem, lint e build de produção:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

### Dev Container (VS Code)

1. Instale a extensão **Dev Containers** no VS Code;
2. Abra a pasta do projeto e execute `Dev Containers: Reopen in Container` (`Ctrl+Shift+P` / `Cmd+Shift+P`);
3. No terminal integrado, rode `pnpm lint`, `pnpm typecheck` e `pnpm dev` e acesse `http://localhost:5173`.
