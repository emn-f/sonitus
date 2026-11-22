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

## Referências

- **Saúde, Neurodiversidade e Fauna:** [OMS — Environmental noise guidelines (2018)](https://www.who.int/europe/publications/i/item/9789289053563) · [Pereira et al., Revista CEFAC (2025)](https://www.scielo.br/j/rcefac/a/ZrPcLfM8zDpLTLsHMm73H5g/?lang=pt) · [Gomes, Pedroso & Wagner (2008)](https://www.scielo.br/j/pfono/a/Sdgb8F9HJXp8yNjVsNgp5Qh/abstract/?lang=pt) · [Posar & Visconti (2018)](https://www.scielo.br/j/jped/a/hGVMgzMtDYtgtGKsC68M7dR/abstract/?lang=pt) · [Gomes, Revista Tópicos (2024)](https://revistatopicos.com.br/generate/pdf_zenodo/pub_14231066.pdf)
- **Normas e Legislação:** [ABNT NBR 10151:2019](https://www2.uesb.br/biblioteca/wp-content/uploads/2022/03/ABNT-NBR10151-AC%C3%9ASTICA-MEDI%C3%87%C3%83O-E-AVALIA%C3%87%C3%83O-DE-N%C3%8DVEL-SONORO-EM-%C3%81REA-HABITADAS.pdf) · [CONAMA nº 1/1990](https://www.ibama.gov.br/sophia/cnia/legislacao/MMA/RE0001-080390.PDF) · [CF/88](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) · [Lei nº 9.605/1998](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm) · [Decreto-Lei nº 3.688/1941](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm) · [Lei nº 5.354/1998 (Salvador)](https://leis.org/prefeitura/ba/salvador/lei/lei-ordinaria/1998/5354/lei-ordinaria-n-5354-1998-dispoe-sobre-sons-urbanos-fixa-niveis-e-horarios-em-que-sera-permitida-sua-emissao-cria-a-licenca-para-utilizacao-sonora-e-da-outras) · [Lei Berenice Piana nº 12.764/2012](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm) · [LBI nº 13.146/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) · [LGPD nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- **Contexto, Benchmarks e Ecologia Integral:** [Encíclica *Laudato Si'* (2015)](https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html) · [SONYC — NYU](https://wp.nyu.edu/sonyc/) · [NoiseCapture](https://noise-planet.org/noisecapture.html) · [Radar Sonoro (São José dos Campos, 2026)](https://www.sjc.sp.gov.br/noticias/2026/agosto/07/prefeitura-reforca-fiscalizacao-contra-poluicao-sonora/) · [Sedur Salvador — apreensões (2024)](https://www.bahianoticias.com.br/noticia/292007-sedur-destroi-25-mil-equipamentos-sonoros-apreendidos-nesta-terca-em-salvador) · [Prefeitura de Salvador — combate ao ruído (2026)](https://salvador.ba.gov.br/prefeitura-orienta-sobre-combate-a-poluicao-sonora-durante-jogos-da-copa-do-mundo/) · [Iberdrola](https://www.iberdrola.com/sustentabilidade/o-que-e-poluicao-sonora-causas-consequencias-solucoes)
