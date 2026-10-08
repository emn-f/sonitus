Você está trabalhando na construção da plataforma **Sonitus**, um projeto acadêmico desenvolvido para a disciplina **Questões Ambientais na Comunidade**, da Universidade Católica do Salvador (UCSal).

Junto deste prompt, você recebeu um documento em PDF chamado **projeto_parcial**. Esse documento é a principal referência conceitual, metodológica e funcional para a construção do Sonitus. Leia o documento integralmente antes de tomar decisões relevantes sobre arquitetura, funcionalidades, interface ou regras de negócio.

## 1. O que é o Sonitus

O Sonitus é uma **proposta conceitual de plataforma de monitoramento da poluição sonora urbana**.

A ideia central é combinar:

* sensores acústicos de baixo custo;
* monitoramento contínuo dos níveis sonoros;
* cálculo e análise de LAeq;
* visualização georreferenciada;
* identificação de áreas críticas;
* alertas para apoio à fiscalização;
* participação da comunidade;
* identificação de zonas sensíveis;
* recursos de acessibilidade;
* educação ambiental.

O objetivo não é apenas “medir decibéis”, mas transformar dados acústicos em informações que possam apoiar **fiscalização, planejamento urbano, conscientização e inclusão**.

## 2. Escopo acadêmico atual

Este é um **projeto parcial**, e isso é importante.

A etapa atual **não possui medições acústicas reais em campo**. O funcionamento da plataforma deve ser demonstrado por meio de **dados simulados**, gerados artificialmente a partir de parâmetros técnicos e normativos definidos no projeto.

Portanto:

* não trate os dados simulados como dados reais de Salvador;
* não apresente mapas ou gráficos simulados como se representassem o cenário acústico real da cidade;
* mantenha explícita a distinção entre dados reais, dados simulados e conceitos/propostas;
* não crie funcionalidades ou conclusões que impliquem que o sistema já esteja realizando fiscalização real.

O documento reconhece que uma implementação real futura exigiria, entre outras coisas, calibração dos sensores, tratamento de interferências ambientais, definição de responsabilidades institucionais, privacidade e sustentabilidade financeira.

## 3. Arquitetura conceitual definida no documento

A plataforma é organizada em quatro camadas:

### 3.1 Sensoriamento

Sensores acústicos de baixo custo, conceitualmente baseados em microcontrolador + microfone MEMS, medem níveis de pressão sonora em dB(A).

Um requisito fundamental é:

**o sistema não deve gravar áudio nem conversas.**

O projeto propõe registrar apenas informações derivadas do nível sonoro, preservando a privacidade.

### 3.2 Transmissão

Os níveis medidos são enviados periodicamente para um servidor, conceitualmente por Wi-Fi ou redes de baixa potência.

### 3.3 Processamento e armazenamento

A plataforma deve trabalhar conceitualmente com:

* LAeq;
* identificação de picos;
* comparação com limites de referência;
* classificação das ocorrências;
* identificação de persistência e recorrência.

### 3.4 Visualização

O sistema deve possuir um dashboard acessível para visualização e análise dos dados.

A proposta inclui:

* mapa de calor;
* gráficos temporais;
* análise por ponto monitorado;
* identificação de excesso recorrente;
* visualização de zonas sensíveis;
* recursos de acessibilidade.

## 4. Zonas sensíveis

O projeto prevê uma camada específica para locais que merecem atenção diferenciada, incluindo, conceitualmente:

* hospitais;
* clínicas;
* escolas;
* centros de atendimento a pessoas com deficiência;
* áreas verdes;
* outros locais ambientalmente ou socialmente sensíveis.

A existência dessas zonas é importante para as regras de alerta e para a interpretação dos dados.

## 5. Neurodivergência e acessibilidade

Esse não é um detalhe secundário do projeto.

O documento estabelece a poluição sonora como também uma **questão de acessibilidade**, destacando que pessoas neurodivergentes, especialmente pessoas no espectro autista, podem apresentar maior sensibilidade a estímulos sonoros.

Por isso, o Sonitus deve considerar que:

> um mesmo nível de ruído medido instrumentalmente não representa necessariamente a mesma experiência para todas as pessoas.

A plataforma deve, portanto, combinar **dados técnicos** com **relatos da comunidade**, sem depender exclusivamente dos decibéis para representar o impacto social do ruído.

Na interface, o projeto prevê recursos como:

* contraste adequado;
* tipografia legível;
* redução de estímulos visuais;
* linguagem simples;
* apresentação clara das informações.

## 6. Participação da comunidade

O Sonitus possui um componente participativo.

A plataforma deve prever um canal para que pessoas possam relatar locais e situações de incômodo sonoro.

Esse componente existe porque o valor medido pelo sensor não necessariamente captura toda a experiência humana do problema.

O relato comunitário deve complementar — e não substituir — o monitoramento técnico.

## 7. Animais e biodiversidade urbana

O projeto também considera os efeitos da poluição sonora sobre animais domésticos e fauna urbana.

A solução pode utilizar os dados para identificar áreas próximas de:

* áreas verdes;
* clínicas veterinárias;
* abrigos;
* outros locais relevantes para o bem-estar animal.

Esse aspecto faz parte da justificativa ambiental do projeto e deve ser preservado na construção da solução.

## 8. Sistema de alertas

O sistema de alertas deve ser tratado como um mecanismo de **apoio à priorização da fiscalização**, e não como um sistema autônomo de punição.

O conceito definido no projeto é:

* comparar o LAeq com um limite de referência aplicável;
* considerar o tipo de área;
* considerar o período do dia;
* considerar persistência;
* considerar reincidência;
* registrar picos isolados sem necessariamente transformá-los em alertas.

Para a simulação metodológica do projeto, foi definido o seguinte exemplo de regra:

* janela de avaliação de 10 minutos;
* alerta quando o limite é excedido em duas janelas consecutivas;
* reincidência quando existem três alertas no mesmo ponto dentro de uma hora;
* picos isolados são registrados como eventos, mas não geram alerta automaticamente.

Esses parâmetros são **decisões metodológicas do protótipo**, e não devem ser apresentados como se fossem necessariamente exigências legais ou da ABNT.

Também é importante não confundir:

**limite técnico/normativo de referência ≠ automaticamente autorização para aplicação de multa.**

O Sonitus oferece informação para apoiar a fiscalização. A decisão institucional e jurídica permanece fora do sistema.

## 9. Contexto brasileiro e de Salvador

O projeto está contextualizado no Brasil e utiliza como referências:

* Constituição Federal;
* Lei de Crimes Ambientais;
* Lei das Contravenções Penais;
* Resolução CONAMA nº 1/1990;
* ABNT NBR 10151;
* Lei Brasileira de Inclusão;
* Lei nº 12.764/2012;
* LGPD;
* legislação municipal relacionada ao ruído urbano.

O contexto local é importante porque o problema é tratado especialmente no ambiente urbano de Salvador.

O documento utiliza dados recentes de denúncias de poluição sonora em Salvador para demonstrar que o problema é concreto e recorrente.

Não invente dados locais. Quando a aplicação usar dados simulados, deixe claro que são simulados.

## 10. Referências a soluções existentes

O documento também posiciona o Sonitus em relação a iniciativas existentes de monitoramento acústico, especialmente:

* **NoiseCapture** — monitoramento e mapeamento participativo;
* **SONYC (Sounds of New York City)** — rede de monitoramento acústico urbano e análise de dados;
* **radar sonoro de São José dos Campos** — aplicação tecnológica voltada ao apoio à fiscalização de ruído urbano.

Essas soluções devem ser vistas como referências e antecedentes tecnológicos.

O Sonitus não deve ser descrito como se tivesse inventado o conceito de monitoramento acústico urbano.

Seu diferencial conceitual está na integração de:

**sensoriamento + análise + visualização + alertas + participação comunitária + zonas sensíveis + acessibilidade/neurodiversidade.**

Uma distinção importante é que soluções como radares acústicos podem estar concentradas na identificação de veículos ou fontes específicas, enquanto o Sonitus busca também compreender **onde, quando, com que frequência e em quais contextos o problema acústico ocorre**.

## 11. Relação com o objetivo do projeto

O objetivo geral estabelecido no documento é desenvolver uma proposta conceitual de plataforma de monitoramento acústico urbano, demonstrada com dados simulados, capaz de identificar e mapear áreas de poluição sonora para apoiar a atuação do poder público e a conscientização da população, com atenção especial às pessoas neurodivergentes e ao bem-estar animal.

Toda funcionalidade nova deve ser avaliada à luz desse objetivo.

Pergunte, antes de adicionar qualquer recurso:

1. Isso contribui diretamente para monitorar, compreender ou comunicar a poluição sonora?
2. Isso ajuda fiscalização, conscientização, acessibilidade ou participação comunitária?
3. Isso respeita o escopo do projeto parcial?
4. Isso está coerente com a metodologia descrita no documento?

Se a resposta for não, evite introduzir a funcionalidade sem uma justificativa clara.

## 12. Privacidade e LGPD

A privacidade é um requisito estrutural.

O conceito do projeto é:

* não gravar áudio;
* não armazenar conversas;
* não coletar dados pessoais de moradores;
* trabalhar com níveis sonoros e informações derivadas;
* permitir relatos comunitários sem exigir dados pessoais desnecessários.

Não introduza, sem justificativa, funcionalidades que façam reconhecimento de voz, armazenamento de gravações, identificação de pessoas ou outras formas de coleta que entrem em conflito com essa premissa.

## 13. Como interpretar o documento

O PDF é a referência principal para entender:

* problema;
* justificativa;
* objetivos;
* arquitetura conceitual;
* metodologia;
* funcionalidades;
* limitações;
* público afetado;
* diferencial do Sonitus.

Não substitua silenciosamente as decisões do documento por suposições próprias.

Quando houver conflito, lacuna ou requisito não especificado, trate isso como **ponto a ser analisado**, e não como autorização automática para inventar uma regra.

Também preserve a distinção entre:

* requisito definido no projeto;
* decisão de implementação;
* hipótese;
* dado simulado;
* dado real;
* requisito normativo/legal.

## 14. Prioridade durante a construção

Ao implementar a plataforma, priorize nesta ordem:

1. coerência com o documento acadêmico;
2. fidelidade ao problema ambiental estudado;
3. clareza dos dados e das visualizações;
4. funcionamento correto do fluxo de monitoramento;
5. privacidade;
6. acessibilidade;
7. possibilidade de demonstrar o protótipo com dados simulados;
8. simplicidade e viabilidade dentro do escopo do projeto parcial.

O objetivo é construir uma plataforma que **demonstre de forma convincente a proposta acadêmica do Sonitus**, e não criar prematuramente um sistema comercial ou uma infraestrutura completa de fiscalização municipal.

Use o PDF como base sempre que precisar compreender o contexto, as premissas, os objetivos ou as decisões já tomadas no projeto.
