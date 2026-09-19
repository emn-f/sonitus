# Sonitus

## Visão do produto

O Sonitus é uma plataforma comunitária de acessibilidade sensorial. Seu propósito é transformar informações sobre o ruído urbano em orientações simples para que as pessoas possam escolher trajetos, horários e ambientes com mais conforto e previsibilidade.

O primeiro produto será um protótipo web interativo, baseado em dados simulados. Ele não depende de sensores físicos reais nem de integração com órgãos públicos para funcionar.

## Protótipo web

O protótipo foi construído com React, Vite, TypeScript e CSS puro. Para entender como navegar pela interface, compreender os indicadores e utilizar os recursos de acessibilidade pelo ponto de vista do usuário, consulte o [Guia de Uso](docs/GUIA_DE_USO.md).

### Experiência visual e acessibilidade

A interface segue a identidade **Sonitus Sensory Sanctuary**, pensada para reduzir sobrecarga visual: superfícies em tons quentes, azul profundo, verde-sálvia, tipografia Plus Jakarta Sans e animações discretas. O modo claro e o modo noturno usam paletas próprias e são persistidos localmente.

Os controles do cabeçalho oferecem alternância de tema e de **movimento reduzido**. Ao ativar a última opção, o botão recebe texto, cor e indicador visual de estado; transições e animações também respeitam essa escolha e a preferência de sistema `prefers-reduced-motion`.

O layout é responsivo para telas pequenas, médias e grandes. Em telas usuais, o mapa ocupa toda a largura disponível para preservar a leitura de rótulos e pontos; em telas muito largas, os detalhes voltam a ocupar um painel lateral. A navegação principal mantém itens em uma única linha e as opções secundárias ficam no botão “Mais opções” (ícone de menu apenas no mobile).

## Para quem é

O foco principal são pessoas neurodivergentes, especialmente pessoas autistas com sensibilidade auditiva. A plataforma também pode beneficiar idosos, pessoas em tratamento, famílias, cuidadores e qualquer pessoa que queira reduzir a exposição a ambientes muito ruidosos.

## Problema

O ruído urbano afeta a qualidade de vida e torna o deslocamento e a permanência em certos locais menos previsíveis. Para pessoas com maior sensibilidade sonora, um pico de ruído pode causar desconforto, sobrecarga sensorial ou impedir atividades cotidianas. Hoje, raramente existem informações acessíveis e contextualizadas sobre onde e quando o ambiente tende a estar mais silencioso.

## Proposta de valor

O Sonitus oferece uma leitura clara e prática do cenário sonoro da cidade. Em vez de apresentar somente medições técnicas, organiza os dados por localização e horário e os traduz em classificações compreensíveis:

- **Tranquilo**: ambiente com menor intensidade de ruído.
- **Moderado**: ruído perceptível, com atenção recomendada.
- **Intenso**: maior probabilidade de desconforto ou sobrecarga.

Assim, a pessoa pode planejar melhor seus compromissos e deslocamentos de acordo com suas necessidades sensoriais.

## Escopo do MVP

O MVP será um protótipo web com dados simulados de ruído. Ele incluirá:

- mapa com ruas ou bairros e sua classificação sonora;
- visualização por faixa de horário;
- indicação de picos de ruído;
- filtros para ajudar a encontrar períodos e regiões mais tranquilos;
- busca por locais;
- relatos comunitários opcionais sobre a experiência sensorial em um local ou período.

Os dados simulados serão organizados para permitir demonstração realista de variações por região e horário, sem representar medições reais nem fazer promessas de precisão operacional.

## Experiência esperada

Uma pessoa poderá buscar um destino, consultar o mapa e comparar os horários disponíveis. A interface deve priorizar linguagem direta, contraste adequado, classificação visual consistente e explicações fáceis de entender. O resultado desejado é apoiar uma decisão cotidiana, como escolher uma rota alternativa, remarcar um compromisso ou sair em um horário mais confortável.

## Três Dimensões da Entrega do Protótipo

Esta evolução do MVP acadêmico demonstra como o Sonitus se comportaria como uma plataforma urbana real através de três pilares integrados:

1. **Monitoramento e Cartografia Urbana**:
   - Centro de monitoramento acústico em tempo real simulado;
   - Mapa acústico como protagonista com malha viária, distritos, heatmap suave de dispersão sonora e inspeção detalhada de sensores.

2. **Impacto Social e Saúde**:
   - Mapeamento e proteção de zonas sensíveis (hospitais, clínicas de TEA, escolas e abrigos);
   - Identificação de **Oásis de Conforto Acústico** (zonas calmas) para descompressão sensorial de pessoas autistas, hipersensíveis e idosos;
   - Central de alertas conceituais para detecção de recorrência de ruído abusivo.

3. **Viabilidade Tecnológica**:
   - Visão da futura rede de sensores IoT (telemetria simulada de 12 nós via LoRaWAN e NB-IoT);
   - **Protótipo 3D Interativo do Hardware Sonitus Node v1.2** (construído em Three.js, com controles orbitais, detalhes de engenharia de borda e garantia de Privacidade por Concepção).

---

## Estrutura Atual do Protótipo

A base de código foi refatorada de forma modular e tipada:

```text
src/
├── types/          # Interfaces de domínio (Sensor, SensitiveZone, Alert, etc.)
├── data/           # Base unificada de dados simulados (noiseData.ts)
├── components/     # Componentes reutilizáveis (Header, Navigation, SoundBadge, SensorModel3D, MetricCard, Footer)
├── sections/       # Telas funcionais (Overview, Map, SensitiveZones, Alerts, Sensors, Technology, About)
├── styles.css      # Design system com tokens, acessibilidade, temas claro/escuro e redução de movimento
├── App.tsx         # Shell de aplicação com lazy-loading e estado global
└── main.tsx        # Ponto de montagem React 19
```

---

## Arquitetura Conceitual e Privacidade por Concepção

Na versão atual, a aplicação consome uma base local de dados simulados coerentes e os distribui por todos os módulos.

O conceito tecnológico prevê que futuros nós de sensoriamento (Sonitus Node v1.2) baseados no microcontrolador **ESP32-S3** calculem as métricas de decibéis ponderados (dB LAeq) localmente na memória volátil, descartando o áudio bruto instantaneamente. **O Sonitus não grava, não armazena e não transmite conversas de voz humana**.

Além disso, a plataforma preserva rigorosamente a dignidade de grupos vulneráveis: mapeia exclusivamente instalações de circulação pública, **jamais residências particulares ou indivíduos PCDs**.

---

## Fora do escopo inicial

- sensores físicos instalados e coleta de dados reais;
- integração com fiscalização, órgãos públicos ou serviços de emergência;
- alertas automáticos para gestão pública;
- mapeamento de casas, perfis pessoais ou localização individual de PCDs;
- uso do produto como ferramenta principal de fiscalização ou venda para governos.

## Etapas de construção

1. Definir áreas, horários e cenários que comporão os dados simulados.
2. Modelar a estrutura dos dados de localização, intensidade e período.
3. Criar a interface web com mapa, legendas, busca e filtros.
4. Implementar a visualização de picos e detalhes por local/horário.
5. Adicionar relatos comunitários opcionais em uma versão posterior do protótipo.
6. Testar a clareza da experiência com foco em acessibilidade sensorial e ajustar a interface.

## Desenvolvimento

### Desenvolvimento local

```bash
pnpm install
pnpm dev
```

O terminal exibirá o endereço local fornecido pelo Vite (por padrão, `http://localhost:5173`).

### Dev Container

Para executar o projeto em um ambiente padronizado via VS Code:

1. Instale a extensão **Dev Containers** no VS Code;
2. Abra a pasta do projeto no VS Code;
3. Execute `Dev Containers: Reopen in Container` (via `Ctrl+Shift+P` ou `Cmd+Shift+P`);
4. Aguarde a instalação das dependências;
5. No terminal integrado, execute:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm dev
   ```
6. Acesse a porta encaminhada do Sonitus (`http://localhost:5173`).

## Possibilidades futuras

Depois de validado o protótipo, o Sonitus poderá explorar dados coletados por sensores públicos, indicadores históricos, rotas com menor exposição sonora, colaboração com instituições e recursos de apoio à gestão urbana. Esses caminhos ampliam o impacto da plataforma, mas não alteram sua prioridade: apoiar a autonomia das pessoas no planejamento do cotidiano.
