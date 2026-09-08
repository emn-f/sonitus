# Guia de Uso — Sonitus

Bem-vindo ao **Sonitus**! Este guia foi preparado para ajudar qualquer pessoa a entender, navegar e utilizar a interface do Sonitus com tranquilidade, clareza e previsibilidade.

---

## O que é o Sonitus

O Sonitus é uma proposta de plataforma de **acessibilidade sensorial**, desenvolvida com foco especial em pessoas neurodivergentes (como pessoas no espectro autista, pessoas com TDAH ou com sensibilidade auditiva), pessoas idosas, cuidadores e qualquer pessoa que busque mais conforto sonoro no dia a dia.

O objetivo é transformar estimativas de ruído em orientações práticas, permitindo planejar horários de saída, rotas de deslocamento e pausas com menor sobrecarga sensorial.

> [!IMPORTANT]
> **Dados simulados e caráter demonstrativo**:
> Os dados exibidos no Sonitus são **totalmente simulados** e **não representam medições em tempo real**. O sistema deve ser utilizado como uma demonstração interativa de como o planejamento sensorial pode apoiar decisões do cotidiano urbano.

---

## Como acessar

Existem duas formas principais de iniciar e visualizar o Sonitus no seu computador: diretamente via terminal local ou utilizando um Dev Container no VS Code.

### Acesso local (padrão)

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 22 ou superior recomendada) e o gerenciador [pnpm](https://pnpm.io/) instalados.

1. Abra o terminal na pasta do projeto e instale as dependências:
   ```bash
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. O terminal informará o endereço local do Vite, por padrão:
   ```text
   http://localhost:5173
   ```
4. Abra o navegador e digite esse endereço na barra de navegação.

> [!WARNING]
> **Não abra o arquivo `index.html` diretamente pelo navegador (via `file://`)**:
> O Sonitus utiliza módulos JavaScript e recursos modernos empacotados pelo Vite. Para carregar corretamente os estilos e scripts, ele precisa ser servido através do comando `pnpm dev`.

### Acesso via Dev Container (VS Code)

Se preferir um ambiente isolado e padronizado, você pode abrir o Sonitus no Visual Studio Code com a extensão **Dev Containers**:

1. Abra o diretório do projeto no VS Code.
2. Quando solicitado (ou pressionando `Ctrl+Shift+P` / `Cmd+Shift+P` e digitando `Dev Containers: Reopen in Container`), reabra a pasta dentro do container.
3. As dependências serão instaladas automaticamente durante a criação do ambiente.
4. No terminal do VS Code dentro do container, execute:
   ```bash
   pnpm dev
   ```
5. O VS Code detectará a porta `5173` e abrirá o navegador automaticamente (ou você pode clicar na notificação de porta encaminhada).

---

## Entendendo a tela inicial

Ao abrir o Sonitus, você verá uma tela organizada em blocos visuais claros, pensados para não sobrecarregar sua atenção:

1. **Barra superior**:
   - Logotipo e atalho de retorno ao início;
   - Botão **Reduzir movimento**: ativa ou desativa animações da interface;
   - Botão **Tema claro / escuro**: alterna a paleta de cores entre modos diurno e noturno.

2. **Cabeçalho introdutório**:
   - Apresenta a mensagem principal e o seletor de períodos (Manhã, Tarde, Noite).

3. **Cartões de resumo (Summary Grid)**:
   - **Leitura agora**: exibe o local em foco no período atual, o valor numérico em decibéis (**dB**), a classificação sensorial (**Tranquilo**, **Moderado** ou **Intenso**) e uma breve observação contextual sobre o ambiente.
   - **Melhor janela**: indica o intervalo de horário com menor probabilidade de sobrecarga sonora dentro daquele período (por exemplo, "8h às 9h").
   - **Área mais tranquila**: destaca uma região ou bairro recomendado para momentos de pausa ou percursos com menor fluxo.

---

## Selecionando o período

No canto superior do painel principal, você encontra o seletor de turnos:

- **Manhã**
- **Tarde**
- **Noite**

Ao clicar em um dos botões, todos os elementos da interface se adaptam simultaneamente:
- A leitura em destaque e as recomendações de horário se ajustam;
- Os pontos do mapa acústico recalculam seus níveis sonoros e notas;
- As barras do gráfico refletem o padrão acústico correspondente àquele período.

Isso permite simular e comparar mentalmente o deslocamento em diferentes momentos do dia.

---

## Usando o mapa acústico

O painel **Mapa acústico** traz uma representação visual e esquemática de diferentes áreas de circulação:

- **Pontos sonoros**: cada ponto colorido no mapa simboliza um local e sua faixa de intensidade acústica estimada.
  - **Tranquilo (verde calmo)**: menor intensidade de som, entorno favorável ao repouso e concentração;
  - **Moderado (âmbar suave)**: sons urbanos habituais, com movimento gradual que requer atenção leve;
  - **Intenso (coral suave)**: fluxo elevado de tráfego, comércio ou aglomerações, com maior probabilidade de sobrecarga sensorial.
- **Selecionando um local**: clique ou navegue via teclado até qualquer um dos pontos do mapa. O ponto selecionado receberá um anel de destaque e o cartão **Leitura agora** (assim como a caixa descritiva abaixo do mapa) atualizará imediatamente suas informações para mostrar o nome, os decibéis e a nota daquele ponto.
- **Aviso esquemático**: o mapa é puramente conceitual e ilustrativo. As ruas e quadras representadas não correspondem a coordenadas geográficas de bairros reais.

---

## Entendendo o gráfico de ruído

O painel **Ritmo do dia** apresenta uma projeção de como a intensidade do ruído se comporta ao longo das horas:

- **Colunas com valores em dB**: cada coluna representa um horário (como 7h, 9h, 11h, etc.) e mostra o nível em decibéis estimado no topo da barra.
- **Cores por classificação**: as barras assumem cores correspondentes às faixas de intensidade (verde para tranquilo, âmbar para moderado e coral para intenso), permitindo identificar picos de ruído à primeira vista.
- **Alternativa textual**: logo abaixo do gráfico, há um item expansível chamado **"Ver dados em texto"**. Ao clicar nele, todos os horários e valores são apresentados em formato de lista simples. Esse recurso garante acessibilidade para leitores de tela e oferece uma alternativa para quem prefere consumir dados de forma estritamente textual e linear.

---

## Tema claro e escuro

No canto superior direito da tela, você encontra o botão de tema:

- **Tema claro**: fundo suave em tons neutros claros, superfícies delicadas e excelente legibilidade sob iluminação diurna.
- **Tema escuro**: superfícies em camadas de azul ardósia profundo, evitando pretos absolutos e reduzindo o cansaço visual em ambientes com pouca luz.

A sua preferência de tema é salva automaticamente no navegador (`localStorage`), de modo que em sua próxima visita a interface lembrará da sua escolha.

---

## Redução de movimento

Acessibilidade sensorial vai além de som e cores. Para muitas pessoas, elementos em movimento, transições suaves ou animações dinâmicas podem provocar enjoo visual, fadiga, vertigem (desconforto vestibular) ou distração.

- **Como acionar**: clique no botão **"Reduzir movimento"** na barra superior. O botão mudará de estado para **"Movimento reduzido: ativo"**.
- **O que faz**: desativa de forma imediata todas as transições de altura de barras, efeitos de escala e variações graduais em toda a interface.
- **Detecção automática**: se o seu sistema operacional já estiver configurado com a opção de preferência de redução de movimento (`prefers-reduced-motion: reduce`), o Sonitus ativará essa configuração por padrão logo na primeira inicialização.

---

## Limitações do protótipo

Para manter a transparência em relação ao estágio atual do Sonitus, é fundamental destacar o que este protótipo **não** possui:

- **Sem sensores físicos reais**: os dados não são captados por microfones em postes ou equipamentos públicos;
- **Sem rastreamento GPS**: a aplicação não sabe onde você está fisicamente;
- **Sem dados em tempo real**: não há medição minuto a minuto de vias públicas;
- **Sem backend ou servidores de banco de dados**: tudo roda localmente no seu navegador a partir do arquivo de simulação;
- **Sem contas ou perfis de usuário**: não há cadastro, senhas nem coleta de nomes ou e-mails;
- **Sem vínculo com fiscalização urbana**: o Sonitus não é ferramenta de denúncia ou aplicação de multas;
- **Sem rastreamento de pessoas**: em hipótese alguma o protótipo monitora indivíduos ou trajetos pessoais.

---

## Privacidade e respeito

O projeto Sonitus adota o princípio de **privacidade por desenho**:

- **Espaço público versus privacidade**: o Sonitus não mapeia residências, casas, apartamentos ou endereços particulares;
- **Proteção a grupos vulneráveis**: não há associação entre níveis sonoros e moradia ou localização de pessoas neurodivergentes ou com deficiência;
- **Simulação responsável**: todas as referências tratam de locais conceituais de circulação pública, assegurando que nenhum dado sensível seja exposto ou manipulado.

Esperamos que o Sonitus proporcione uma experiência acolhedora, tranquila e esclarecedora!
