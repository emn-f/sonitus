# Contexto do projeto

Antes de trabalhar em funcionalidades relacionadas ao Sonitus, consulte:

`docs/sonitus-context.md`

Esse arquivo contém o contexto acadêmico, objetivos, escopo, metodologia,
premissas e restrições que devem orientar a construção da plataforma.

## Arquitetura de Estilos & CSS Modular (`src/styles/`)

- **Estilos por domínio:** manter o CSS modularizado em `src/styles/` (`tokens.css`, `layout.css`, `overview.css`, `map.css`, `zones.css`, `alerts.css`, `sensors.css`, `community.css`, `technology.css`, `about.css`), importado apenas via `src/styles/index.css`. Não recriar CSS monolítico único.
- **Zero `!important` estrutural:** `!important` é permitido exclusivamente nas regras de acessibilidade `prefers-reduced-motion` e `:root[data-reduce-motion="true"]` em `tokens.css`.
- **Higiene de cards flex e callouts:** sempre zerar `margin` de `h2`/`h3`/`h4`/`p`/`ul` dentro de cards com `display: flex; flex-direction: column; gap: ...` para evitar espaços em branco excessivos. Nunca usar seletor descendente amplo para título de callout (`.callout strong`); usar sempre `.callout > div > strong` para não quebrar texto inline.
- **Checklist pós-edição:** após mexer em estilos ou componentes, validar paridade de classes usadas no JSX e rodar `npm run typecheck && npm run lint && npm run build`.

## Padrões de UI, Navegação e Mobile

- **Cabeçalho e menu lateral:** manter o botão hambúrguer (`<Menu />`) fixo à **esquerda** da logo (`.sanctuary-header-left`) fora do desktop largo (`>= 1500px`), usando `nav` lateral apenas para navegação entre abas.
- **Seletor de turno (`Manhã` / `Tarde` / `Noite`):** nunca colocar botões de turno dentro da sidebar nem renderizar a barra mobile de turno na tela inicial (`visao-geral`); exibir `.mobile-period-strip` apenas nas abas com dados por turno (`mapa`, `zonas-sensiveis`, `sensores`).
- **Quebra limpa em telas pequenas (`<= 760px` / `<= 540px`):** barras de sub-abas, chips de filtro e badges de cabeçalho devem usar `flex-wrap: wrap` (sem `overflow-x` que corte rótulos). Em cards de métricas/metas (`.zone-db-status-block`, `.sensor-reading-summary-box`), empilhar ou alinhar rótulo à esquerda e valor à direita sem colunas órfãs.
- **Iconografia e marca:** evitar ícones associados à IA (`Sparkles`); usar ícones semânticos (`Lightbulb`, `Leaf`, `Clock`, `Radio`, `Compass`). Preservar a marca oficial minimalista em `public/sonitus-logo.svg` (`#062435` + `#4edea3`).

## Rigor Acadêmico (`ELE-EXT009`) & Deploy Vercel

- **Regras normativas sincronizadas com o relatório:** aplicar ABNT NBR 10151 em 4 faixas (`45`/`55`/`65`/`70 dB`), Lei Municipal nº 5.354/1998 (`70 dB` das 7h–22h · `60 dB` das 22h–7h), persistência (`2 janelas consecutivas de 10 min`), reincidência crítica (`3 episódios em 7 dias`), todos os 12 integrantes em `AboutSection.tsx` e indicação explícita de dados simulados.
- **Lockfile & build na Vercel:** usar exclusivamente `pnpm-lock.yaml` (nunca gerar `package-lock.json` nem adicionar binários de browser como `puppeteer` em `devDependencies`).
- **Git não-interativo:** se a assinatura 1Password SSH/GPG falhar no terminal do agente, commitar com `--no-gpg-sign` somente após autorização explícita do usuário em `Conventional Commits` (`pt-BR`).