# Guia de Uso — Sonitus

Bem-vindo ao **Sonitus**! Este guia foi elaborado para apresentar todas as funcionalidades, seções, indicadores e conceitos do protótipo evoluído da plataforma de **monitoramento acústico inteligente urbano**.

---

## 1. Visão Geral e Propósito

O Sonitus é o conceito de uma plataforma urbana concebida para mapear, analisar e mitigar a poluição sonora nas cidades, integrando três dimensões complementares:
1. **Monitoramento e Cartografia**: visualização de níveis sonoros, picos recorrentes e manchas de ruído (heatmap) por vias e bairros.
2. **Impacto Social e Saúde**: foco prioritário na proteção de pessoas neurodivergentes (como autistas com hipersensibilidade auditiva), pacientes hospitalares, idosos e animais urbanos.
3. **Viabilidade Tecnológica**: demonstração de uma arquitetura IoT com nós de sensoriamento baseados em ESP32-S3 e visualização 3D interativa do hardware conceitual.

> [!IMPORTANT]
> **Dados 100% Simulados e Caráter Demonstrativo**:
> Todos os sensores, valores em decibéis, curvas históricas e alertas apresentados são **simulados**. O sistema não possui sensores físicos em postes reais nesta entrega. Diferencie sempre **"monitoramento em tempo real simulado"** de captação física real.

---

## 2. Como Executar e Acessar

### Acesso Local (Terminal)

Requisitos: Node.js (versão 22 ou superior) e gerenciador `pnpm`.

```bash
pnpm install
pnpm dev
```

O terminal iniciará o servidor Vite estritamente na porta:
```text
http://localhost:5173
```
Se a porta 5173 estiver ocupada, o Vite falhará de forma clara sem trocar silenciosamente de porta (`strictPort: true`).

### Acesso via Dev Container (VS Code)

1. Abra a pasta do projeto no VS Code com a extensão **Dev Containers** instalada;
2. Selecione `Dev Containers: Reopen in Container`;
3. Execute `pnpm dev` no terminal integrado;
4. O VS Code notificará a disponibilidade do endereço `http://localhost:5173`.

---

## 3. Navegação da Plataforma

A aplicação é organizada através de uma barra de abas acessível no topo:

- **Visão Geral**: centro de comando urbano com KPIs da cidade, radar de ruído, curva de 24 horas e atalhos rápidos.
- **Mapa Acústico (Protagonista)**: mapa urbano ilustrativo com 12 sensores georreferenciados, heatmap dinâmico, camadas visuais, filtros e gaveta de inspeção detalhada.
- **Zonas Sensíveis & Conforto**: instalações de saúde, escolas e abrigos protegidos, além do catálogo de **Oásis de Conforto Acústico** (zonas tranquilas) para descompressão sensorial.
- **Alertas**: central de detecção de eventos e anomalias simuladas (picos repetitivos, violações de zonas de silêncio), com severidade, causas e ações recomendadas.
- **Rede de Sensores**: telemetria técnica dos 12 nós (SNS-001 a SNS-012), conectividade (LoRaWAN, NB-IoT), nível de bateria e fontes de alimentação.
- **Tecnologia & Hardware 3D**: visualizador tridimensional interativo do sensor conceitual (Sonitus Node v1.2), pipeline da arquitetura IoT ponta a ponta e garantias de privacidade.
- **Sobre o Sonitus**: fundamentação acadêmica, neurodivergência e TEA, metodologia de simulação e roadmap de implantação piloto.

---

## 4. Barra Superior (Header)

A barra superior fixa acompanha toda a navegação e disponibiliza:
- **Logomarca Sonitus**: atalho de retorno à tela inicial com ícone de ondas acústicas.
- **Navegação principal**: atalhos em uma única linha para Visão Geral, Mapa Acústico, Zonas de Refúgio e Privacidade e Sensores. As áreas complementares estão reunidas em **Mais opções**; em celulares, ele se transforma em um ícone de menu.
- **Status da cidade**: leitura resumida do nível atual na barra superior.
- **Seletor de Turno (Manhã / Tarde / Noite)**: altera simultaneamente os dados de toda a plataforma (sensores, mapa, gráficos e alertas).
- **Botão Reduzir Movimento**: exibe explicitamente “Reduzir movimento” ou “Movimento reduzido”; quando ativo, usa fundo verde e indicador de estado. Desativa imediatamente transições, rotações e animações, respeitando também `prefers-reduced-motion`.
- **Botão Tema Claro / Escuro**: alterna a paleta de cores entre superfícies diurnas e noturnas com persistência em `localStorage`.

> [!TIP]
> Todos os controles podem ser alcançados por teclado. O foco recebe contorno visível, e os botões de estado comunicam a seleção por texto, cor e `aria-pressed`.

---

## 5. Centro de Monitoramento Urbano (Visão Geral)

A Visão Geral funciona como o painel principal de inteligência acústica da cidade:
- **Banner de Status da Cidade**: exibe a pressão sonora média atual em dB(A) e destaca o **Oásis de Silêncio do Momento** (local com menor decibel registrado).
- **Cards de Indicadores Chave (KPIs)**:
  - *Média Urbana*: média ponderada de todos os sensores no período;
  - *Zonas Tranquilas*: quantidade de pontos abaixo de 55 dB e percentual da cidade;
  - *Zonas em Atenção*: quantidade de pontos acima de 70 dB;
  - *Rede de Sensores IoT*: contagem de nós simulados operacionais (12/12 online);
  - *Alertas 24h*: quantidade de ocorrências críticas detectadas nas últimas 24 horas.
- **Destaque do Mapa Acústico**: prévia clicável para navegar diretamente ao mapa interativo.
- **Oásis de Conforto Acústico**: sugestões imediatas de refúgios sensoriais para pessoas com hipersensibilidade auditiva.
- **Ritmo da Cidade (Curva de 24 Horas)**: gráfico temporal de colunas com linhas de referência para conforto (45 dB), limite diurno da OMS para áreas sensíveis (55 dB), comércio (65 dB) e zona crítica (75 dB).
- **Distribuição Acústica da Cidade**: barra percentual proporcional segmentada entre Tranquilo, Moderado e Intenso.
- **Tabela de Dados em Texto**: seção expansível com tabela acessível contendo os dados numéricos detalhados hora a hora por distrito.

---

## 6. Mapa Acústico e Heatmap (O Protagonista)

O mapa foi completamente redesenhado para simular uma planta urbana convincente:

### Elementos Urbanos Representados
- **Distritos e Bairros**: Centro Histórico & Comercial, Distrito Saúde & Bem-Estar, Jardim Aurora, Vila Serena, Eixo Leste / Mobilidade e Parque das Águas.
- **Malha Viária**: avenidas expressas de pista dupla, vias coletoras, acessos hospitalares e calçadões de pedestres.
- **Áreas Verdes e Recursos Hídricos**: cobertura vegetal densa e lago no Parque das Águas atuando como atenuadores de som.
- **Ícones de Instalações Sensíveis**: cruzes hospitalares, escolas municipais e abrigos veterinários sinalizados no mapa.

### Camada de Calor Acústico (Heatmap)
- Halos suaves com gradientes radiais projetados sobre os pontos emissores de ruído.
- Gradientes controlados em verde (tranquilo), âmbar (moderado) e coral (intenso), comunicando visualmente a pressão acústica das artérias da cidade sem poluição visual.

### Ferramentas e Filtros do Mapa
- **Busca Textual**: filtre rapidamente por nome da rua, hospital, praça ou código do sensor (ex: "Hospital", "SNS-004", "Mercado").
- **Filtro por Distrito**: visualize bairros específicos ou a cidade inteira.
- **Filtro por Nível Sonoro**: isole locais em Tranquilo (< 55 dB), Moderado (55 a 70 dB) ou Intenso (> 70 dB).
- **Filtro por Categoria**: filtre por Zonas Sensíveis, Áreas Verdes, Residenciais, Comerciais ou Arteriais.
- **Controle de Camadas**: botões para ligar/desligar o Heatmap, as Zonas Sensíveis, os Rótulos de Texto e o modo de tela expandida.

### Gaveta de Inspeção do Ponto Selecionado
Ao clicar em qualquer sensor ou marcador no mapa, o painel lateral exibe:
- Código do sensor (ex: SNS-001) e bairro correspondente;
- Leitura instantânea em decibéis com badge sonoro e pico registrado no período;
- Observação contextual do entorno urbano;
- **Recomendação Sensorial & Neurodivergência**: orientações práticas para pessoas no espectro autista e hipersensíveis (uso de abafadores, percursos favoráveis);
- **Diretrizes para Gestão Pública Urbana**: sugestões de intervenção para a prefeitura (escalonamento de carga/descarga, asfalto com absorção acústica, barreiras vegetais);
- **Telemetria do Sensor**: versão do firmware, protocolo de comunicação (LoRaWAN/NB-IoT), percentual de bateria, tipo de alimentação e latência simulada.

### Leitura confortável em cada tela

- Em desktop e notebook, o mapa prioriza a largura completa da área de conteúdo e os detalhes aparecem abaixo, dando mais espaço aos distritos, vias e rótulos.
- Em monitores muito largos, a gaveta de detalhes pode ficar ao lado do mapa sem reduzir a legibilidade.
- Em tablets e celulares, filtros e detalhes se reorganizam verticalmente; os marcadores mantêm área de toque confortável e somente o ponto selecionado exibe seu rótulo completo para evitar sobreposição.

---

## 7. Zonas Sensíveis & Zonas de Conforto Acústico

Esta seção aprofunda o impacto social do Sonitus:
- **Oásis de Conforto Acústico (Zonas Tranquilas)**: refúgios urbanos com níveis consistentemente abaixo de 50 dB (Parque das Águas, Bosque Vila Serena, Praça dos Ipês), com melhor janela de horário para caminhadas calmas e descompressão mental.
- **Instalações Sensíveis**: hospitais, clínicas neuropediátricas de TEA, escolas municipais e abrigos de animais com comparativo numérico contra o teto acústico desejado (Normas ABNT NBR 10151 e diretrizes da OMS).
- **Filtro por Categoria de Proteção**: navegue entre Oásis, Hospitais, Educação e Abrigos de Animais.
- **Botão "Ver no Mapa"**: localiza imediatamente a instalação na cartografia acústica.

---

## 8. Central de Alertas Simulados

Demonstra como o Sonitus alertaria gestores públicos e cidadãos diante de anomalias acústicas:
- **Classificação por Severidade**:
  - *Crítica* (coral): picos graves sustentados acima de 75 dB em vias residenciais ou hospitalares;
  - *Atenção* (âmbar): recorrência de tráfego pesado e buzinas em horários inadequados;
  - *Informativa* (azul): eventos atípicos pontuais e avisos de retorno à normalidade.
- **Status do Alerta**: Novo, Em análise ou Normalizado.
- **Dados do Alerta**: código identificador, horário detectado, sensor de origem, localização, causa descrita pelo algoritmo e ação conceitual sugerida.
- **Filtros Combinados**: filtre por gravidade e por status com contadores atualizados.

---

## 9. Rede de Sensores IoT

Visão de engenharia da infraestrutura de monitoramento:
- **Painel de Telemetria Geral**: contagem de nós conectados, distribuição dos protocolos de rede (LoRaWAN AU915, LTE NB-IoT e Wi-Fi Mesh) e saúde da rede.
- **Cards dos Sensores (SNS-001 a SNS-012)**:
  - Estado operacional (Online / Atenção / Offline);
  - Leitura em dB no turno selecionado e pico do período;
  - Tipo de conectividade e intensidade do sinal;
  - Percentual de bateria e fonte de alimentação (Micro painel solar + Li-ion ou Rede de iluminação pública);
  - Versão do firmware em execução;
  - Tempo decorrido desde o último envio de pacote de telemetria.

---

## 10. Tecnologia & Protótipo 3D do Hardware Sonitus

Esta seção materializa a viabilidade técnica da solução e explica como os dados seriam gerados na prática:

### Protótipo Tridimensional Interativo
- **Conceito Visual**: dispositivo em formato de luminária ambiental compacta para instalação em postes de iluminação ou fachadas cívicas.
- **Controles Orbitais 3D**:
  - Arraste com o mouse ou toque para rotacionar em qualquer ângulo;
  - Use o scroll do mouse ou os botões de zoom para aproximar/afastar;
  - Botão de rotação automática suave (pausada se o modo de redução de movimento estiver ativo);
  - Botão de restauração do ângulo inicial.
- **Ângulos Pré-definidos de Inspeção**:
  - *Geral*: visão panorâmica do nó completo montado no poste;
  - *Grade Acústica*: aproximação da câmara de 360° do microfone MEMS;
  - *Fixação Poste*: detalhe da abraçadeira metálica e do amortecedor mecânico antivibração;
  - *Cúpula Solar*: visualização superior do micro painel fotovoltaico de recarga.
- **Detalhamento dos Componentes Técnicos**:
  - *Microfone Ambiental MEMS (I2S)*: captação estrita de pressão sonora em decibéis, sem canal de áudio analógico para gravação;
  - *ESP32-S3 (Edge AI)*: microcontrolador que calcula os índices LAeq localmente e descarta o buffer de sinal em nanossegundos;
  - *Módulo LoRaWAN / NB-IoT*: envio de pacotes ultraleves de 8 bytes com baixo consumo energético e alcance urbano;
  - *Cúpula e Grade IP66*: proteção contra poeira, chuva e raios UV com membrana acústica hidrofóbica;
  - *Anel LED de Diagnóstico*: indicador luminoso circular suave para inspeção visual por equipes técnicas de campo;
  - *Braço de Fixação Universal*: suporte articulado com elastômero para isolar trepidações mecânicas do trânsito.
- **Fallback Acessível (Sem WebGL)**: caso o navegador ou sistema não suporte aceleração tridimensional por hardware, um diagrama esquemático vetorial em SVG de alta fidelidade é exibido automaticamente.

### Fluxo de Dados Ponta a Ponta (Pipeline IoT)
Diagrama visual de 5 etapas demonstrando o percurso do sinal:
`Sensor Urbano (MEMS)` → `ESP32 / Processamento em Borda` → `Rede LoRaWAN / NB-IoT` → `Plataforma Sonitus (Nuvem)` → `Impacto Social & Gestão Pública`.

---

## 11. Princípios de Privacidade por Concepção (Privacy by Design)

O projeto Sonitus estabelece garantias rigorosas:
1. **Sem Gravação ou Transmissão de Voz**: os sensores processam exclusivamente a amplitude de pressão física (dB SPL) convertida em decibéis ponderados (dB(A)). O hardware não possui armazenamento de áudio nem capacidade técnica de reconstruir diálogos humanos.
2. **Largura de Banda Restrita**: a rede LoRaWAN transmite apenas pacotes numéricos mínimos, tornando inviável o tráfego de qualquer fluxo de voz.
3. **Sem Mapeamento de Indivíduos**: a plataforma monitora unicamente espaços públicos e instalações comunitárias, jamais mapeando residências particulares ou a localização individual de pessoas autistas ou com deficiência.

---

## 12. Acessibilidade Sensorial e Digital

- **HTML Semântico**: uso rigoroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`, tabelas com `<caption>`, `<thead>` e `<tbody>`.
- **Navegação Total por Teclado**: todos os sensores do mapa, botões de filtro, abas de navegação e controles 3D possuem estados `:focus-visible` destacados com anel de alto contraste.
- **Sem Dependência Exclusiva de Cor**: todas as leituras sonoras combinam cores acessíveis com ícones, valores numéricos em dB e rótulos textuais claros (Tranquilo, Moderado, Intenso).
- **Controle de Redução de Movimento**: o botão "Reduzir movimento" (e a media query `prefers-reduced-motion: reduce`) neutraliza transições, animações de pulso nos sensores e a auto-rotação do modelo 3D.
- **Alternativa Textual Completa**: todos os gráficos possuem visualizações correspondentes em texto e tabelas acessíveis.
