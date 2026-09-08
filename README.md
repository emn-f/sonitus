# Sonitus

## Visão do produto

O Sonitus é uma plataforma comunitária de acessibilidade sensorial. Seu propósito é transformar informações sobre o ruído urbano em orientações simples para que as pessoas possam escolher trajetos, horários e ambientes com mais conforto e previsibilidade.

O primeiro produto será um protótipo web interativo, baseado em dados simulados. Ele não depende de sensores físicos reais nem de integração com órgãos públicos para funcionar.

## Protótipo web

O protótipo foi construído com React, Vite, TypeScript e CSS puro. Para executá-lo após instalar as dependências, use `pnpm dev`. Para gerar a versão de produção, use `pnpm build`.

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

## Arquitetura conceitual

Na versão inicial, a aplicação web consumirá uma base local de dados simulados e exibirá as informações em mapa, filtros e detalhes por área/horário.

Como possibilidade futura, uma rede de sensores IoT baseada em ESP32 poderia medir níveis de ruído em pontos públicos e enviar leituras a uma API. Essa arquitetura é apenas conceitual nesta etapa: não faz parte do funcionamento exigido pelo protótipo.

## Privacidade e cuidado com os dados

O Sonitus não mapeará residências nem dados pessoais de pessoas com deficiência. Relatos comunitários devem ser opcionais e minimizados, sem exigir identificação pessoal. Em expansões futuras, a plataforma poderá destacar categorias públicas, como hospitais, clínicas, escolas e abrigos, sempre com atenção à utilidade pública e à privacidade.

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

## Possibilidades futuras

Depois de validado o protótipo, o Sonitus poderá explorar dados coletados por sensores públicos, indicadores históricos, rotas com menor exposição sonora, colaboração com instituições e recursos de apoio à gestão urbana. Esses caminhos ampliam o impacto da plataforma, mas não alteram sua prioridade: apoiar a autonomia das pessoas no planejamento do cotidiano.
