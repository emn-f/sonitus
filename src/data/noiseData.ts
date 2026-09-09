import type {
  Alert,
  DistrictId,
  DistrictInfo,
  HourlyReading,
  NoiseLevel,
  Period,
  PeriodData,
  PlaceReading,
  Sensor,
  SensitiveZone,
} from '../types'

export { type NoiseLevel, type Period, type PlaceReading, type PeriodData }

export const levelLabels: Record<NoiseLevel, string> = {
  tranquilo: 'Tranquilo',
  moderado: 'Moderado',
  intenso: 'Intenso',
}

export const levelDescriptions: Record<NoiseLevel, string> = {
  tranquilo: 'Ambiente favorável para concentração, repouso e caminhadas sensoriais (< 55 dB).',
  moderado: 'Sons urbanos cotidianos perceptíveis; atenção moderada para hipersensibilidade (55 a 70 dB).',
  intenso: 'Pressão sonora elevada com risco de sobrecarga sensorial ou estresse auditivo (> 70 dB).',
}

export const districtsList: DistrictInfo[] = [
  {
    id: 'centro',
    name: 'Centro Histórico & Comercial',
    tagline: 'Comércio pulsante e tráfego concentrado',
    description: 'Área mista de grande circulação de veículos de entrega, pedestres e linhas de transporte urbano.',
    color: '#b83e3b',
  },
  {
    id: 'distrito-saude',
    name: 'Distrito Saúde & Bem-Estar',
    tagline: 'Entorno hospitalar com exigência de silêncio',
    description: 'Polo médico e terapêutico que abriga o Hospital Municipal e clínicas pediátricas e de reabilitação.',
    color: '#25527e',
  },
  {
    id: 'jardim-aurora',
    name: 'Jardim Aurora',
    tagline: 'Corredor arborizado de convivência na zona norte',
    description: 'Vias com arborização densa, baixo fluxo contínuo de automóveis e acolhimento comunitário.',
    color: '#1c7d62',
  },
  {
    id: 'vila-serena',
    name: 'Vila Serena',
    tagline: 'Área verde de convivência com tráfego calmo na zona sul',
    description: 'Bairro de perfil tranquilo, com praças preservadas e percursos com menor agressão sonora.',
    color: '#1c7d62',
  },
  {
    id: 'eixo-leste',
    name: 'Eixo Leste / Mobilidade',
    tagline: 'Corredor viário de integração e transporte',
    description: 'Avenidas arteriais com tráfego rápido, linhas troncais de ônibus e cruzamentos de grande fluxo.',
    color: '#b06a14',
  },
  {
    id: 'parque-verde',
    name: 'Parque das Águas & Área Verde',
    tagline: 'Oásis sensorial e regeneração acústica',
    description: 'Espaço público de conservação e lazer passivo, com amortecimento natural proporcionado pela vegetação e lago.',
    color: '#1c7d62',
  },
]

export const sensorsList: Sensor[] = [
  {
    id: 'SNS-001',
    name: 'Sensor Rua do Mercado',
    districtId: 'centro',
    districtName: 'Centro Histórico & Comercial',
    locationDesc: 'Poste 14, cruzamento com Calçadão',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 94,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 14s',
    category: 'comercial',
    readings: {
      Manhã: { decibels: 74, peakDb: 81, level: 'intenso', note: 'Descarga matinal de mercadorias e fluxo de pedestres.' },
      Tarde: { decibels: 78, peakDb: 84, level: 'intenso', note: 'Pico comercial vespertino e circulação de caminhonetes.' },
      Noite: { decibels: 61, peakDb: 69, level: 'moderado', note: 'Fechamento de lojas e tráfego residual moderado.' },
    },
  },
  {
    id: 'SNS-002',
    name: 'Sensor Praça das Palmeiras',
    districtId: 'centro',
    districtName: 'Centro Histórico & Comercial',
    locationDesc: 'Luminária pública lateral à praça',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 88,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 9s',
    category: 'comercial',
    readings: {
      Manhã: { decibels: 62, peakDb: 70, level: 'moderado', note: 'Fluxo matinal de pedestres e pequenos comércios.' },
      Tarde: { decibels: 67, peakDb: 74, level: 'moderado', note: 'Conversas intensas, som ambiente de cafés e trânsito adjacente.' },
      Noite: { decibels: 56, peakDb: 64, level: 'moderado', note: 'Passeio público ameno com ruído decrescente.' },
    },
  },
  {
    id: 'SNS-003',
    name: 'Sensor Calçadão dos Andradas',
    districtId: 'centro',
    districtName: 'Centro Histórico & Comercial',
    locationDesc: 'Fachada do edifício comercial 104',
    status: 'online',
    firmware: 'v1.4.0-esp32',
    connectivity: 'Wi-Fi Mesh',
    batteryPercent: 98,
    powerSource: 'Rede Iluminação',
    lastTransmission: 'há 23s',
    category: 'comercial',
    readings: {
      Manhã: { decibels: 66, peakDb: 73, level: 'moderado', note: 'Movimento constante de comércio varejista e pedestres.' },
      Tarde: { decibels: 72, peakDb: 79, level: 'intenso', note: 'Horário de pico nas vitrines e artistas de rua.' },
      Noite: { decibels: 54, peakDb: 62, level: 'tranquilo', note: 'Após fechamento do comércio de rua, ambiente calmo.' },
    },
  },
  {
    id: 'SNS-004',
    name: 'Sensor Hospital Dr. Arnaldo',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    locationDesc: 'Acesso do pronto-atendimento',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'NB-IoT',
    batteryPercent: 99,
    powerSource: 'Rede Iluminação',
    lastTransmission: 'há 6s',
    category: 'hospitalar',
    readings: {
      Manhã: { decibels: 57, peakDb: 69, level: 'moderado', note: 'Atenção: ambulâncias e tráfego leve no entorno hospitalar.' },
      Tarde: { decibels: 63, peakDb: 74, level: 'moderado', note: 'Atenção redobrada: trocas de turno e trânsito na via de acesso.' },
      Noite: { decibels: 49, peakDb: 65, level: 'tranquilo', note: 'Período noturno respeitando zona de silêncio hospitalar.' },
    },
  },
  {
    id: 'SNS-005',
    name: 'Sensor Clínica Pediátrica Santa Sofia',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    locationDesc: 'Recuo da ala de reabilitação e TEA',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 91,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 18s',
    category: 'hospitalar',
    readings: {
      Manhã: { decibels: 50, peakDb: 58, level: 'tranquilo', note: 'Ambiente controlado e protegido para pacientes com sensibilidade sensorial.' },
      Tarde: { decibels: 54, peakDb: 63, level: 'tranquilo', note: 'Circulação moderada de veículos nos horários de consultas.' },
      Noite: { decibels: 42, peakDb: 48, level: 'tranquilo', note: 'Calmaria absoluta favorável ao descanso.' },
    },
  },
  {
    id: 'SNS-006',
    name: 'Sensor Escola Darcy Ribeiro',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    locationDesc: 'Poste na travessia de pedestres escolar',
    status: 'online',
    firmware: 'v1.4.1-esp32',
    connectivity: 'NB-IoT',
    batteryPercent: 86,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 29s',
    category: 'escolar',
    readings: {
      Manhã: { decibels: 68, peakDb: 77, level: 'moderado', note: 'Entrada de alunos e trânsito escolar das 7h às 8h.' },
      Tarde: { decibels: 69, peakDb: 78, level: 'moderado', note: 'Recreio e saída escolar das 16h30 com picos sonoros.' },
      Noite: { decibels: 43, peakDb: 50, level: 'tranquilo', note: 'Sem atividades escolares, via desimpedida e silenciosa.' },
    },
  },
  {
    id: 'SNS-007',
    name: 'Sensor Parque das Águas',
    districtId: 'parque-verde',
    districtName: 'Parque das Águas & Área Verde',
    locationDesc: 'Deck central próximo ao lago',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 97,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 12s',
    category: 'parque',
    readings: {
      Manhã: { decibels: 44, peakDb: 52, level: 'tranquilo', note: 'Zona de conforto acústico: canto de pássaros e brisa suave.' },
      Tarde: { decibels: 48, peakDb: 57, level: 'tranquilo', note: 'Presença de famílias e caminhantes em ritmo calmo.' },
      Noite: { decibels: 41, peakDb: 47, level: 'tranquilo', note: 'Excelente refúgio para descompressão sensorial.' },
    },
  },
  {
    id: 'SNS-008',
    name: 'Sensor Jardim Aurora / Hortênsias',
    districtId: 'jardim-aurora',
    districtName: 'Jardim Aurora',
    locationDesc: 'Alameda das Hortênsias, acesso à praça pública',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 89,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 15s',
    category: 'parque',
    readings: {
      Manhã: { decibels: 48, peakDb: 55, level: 'tranquilo', note: 'Ruas arborizadas e fluxo leve, ideal para caminhadas matinais.' },
      Tarde: { decibels: 58, peakDb: 66, level: 'moderado', note: 'Atividade comunitária suave e uso moderado da praça.' },
      Noite: { decibels: 44, peakDb: 51, level: 'tranquilo', note: 'Baixa circulação de automóveis e silêncio noturno.' },
    },
  },
  {
    id: 'SNS-009',
    name: 'Sensor Abrigo Animal São Francisco',
    districtId: 'jardim-aurora',
    districtName: 'Jardim Aurora',
    locationDesc: 'Recuo acústico do abrigo veterinário',
    status: 'online',
    firmware: 'v1.4.0-esp32',
    connectivity: 'Wi-Fi Mesh',
    batteryPercent: 93,
    powerSource: 'Rede Iluminação',
    lastTransmission: 'há 32s',
    category: 'abrigo',
    readings: {
      Manhã: { decibels: 52, peakDb: 63, level: 'tranquilo', note: 'Horário de alimentação dos animais com latidos breves isolados.' },
      Tarde: { decibels: 55, peakDb: 64, level: 'moderado', note: 'Visitas monitoradas e cuidados com a audição dos animais.' },
      Noite: { decibels: 45, peakDb: 52, level: 'tranquilo', note: 'Área calma garantindo o descanso dos animais abrigados.' },
    },
  },
  {
    id: 'SNS-010',
    name: 'Sensor Vila Serena / Praça Ipês',
    districtId: 'vila-serena',
    districtName: 'Vila Serena',
    locationDesc: 'Praça dos Ipês, coreto comunitário',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 92,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 8s',
    category: 'parque',
    readings: {
      Manhã: { decibels: 51, peakDb: 59, level: 'tranquilo', note: 'Percurso calmo com menor circulação veicular.' },
      Tarde: { decibels: 50, peakDb: 57, level: 'tranquilo', note: 'Opção excelente para pausas e momentos de descompressão.' },
      Noite: { decibels: 46, peakDb: 52, level: 'tranquilo', note: 'Entorno silencioso, adequado para pausas e caminhadas leves.' },
    },
  },
  {
    id: 'SNS-011',
    name: 'Sensor Vila Serena / Caminho Verde',
    districtId: 'vila-serena',
    districtName: 'Vila Serena',
    locationDesc: 'Área pública de convivência ao fim do percurso',
    status: 'online',
    firmware: 'v1.3.9-esp32',
    connectivity: 'LoRaWAN',
    batteryPercent: 82,
    powerSource: 'Solar + Li-ion',
    lastTransmission: 'há 45s',
    category: 'parque',
    readings: {
      Manhã: { decibels: 46, peakDb: 53, level: 'tranquilo', note: 'Percurso público com fluxo leve de pedestres.' },
      Tarde: { decibels: 48, peakDb: 54, level: 'tranquilo', note: 'Permanência sensorial muito confortável.' },
      Noite: { decibels: 42, peakDb: 46, level: 'tranquilo', note: 'Zona com níveis de silêncio próximos do campo.' },
    },
  },
  {
    id: 'SNS-012',
    name: 'Sensor Avenida Central / Cruzamento',
    districtId: 'eixo-leste',
    districtName: 'Eixo Leste / Mobilidade',
    locationDesc: 'Semáforo principal com Via Rápida',
    status: 'online',
    firmware: 'v1.4.2-esp32',
    connectivity: 'NB-IoT',
    batteryPercent: 96,
    powerSource: 'Rede Iluminação',
    lastTransmission: 'há 11s',
    category: 'arterial',
    readings: {
      Manhã: { decibels: 66, peakDb: 76, level: 'moderado', note: 'Tráfego constante próximo aos cruzamentos e linhas de ônibus.' },
      Tarde: { decibels: 73, peakDb: 82, level: 'intenso', note: 'Fluxo elevado na hora do rush vespertino.' },
      Noite: { decibels: 59, peakDb: 68, level: 'moderado', note: 'Tráfego reduzindo após às 20h30.' },
    },
  },
]

export const sensitiveZonesList: SensitiveZone[] = [
  {
    id: 'SZ-01',
    name: 'Hospital Municipal Dr. Arnaldo',
    type: 'hospital',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    isQuietOasis: false,
    targetLimitDb: 50,
    currentPeriodDb: { Manhã: 57, Tarde: 63, Noite: 49 },
    proximityToHeavyTraffic: 'A 180m da Avenida Central',
    quietestWindow: '20h às 06h',
    targetAudience: ['Pacientes em leitos de recuperação', 'Corpo médico e enfermagem', 'Visitantes em convalescença'],
    recommendation: 'Recomenda-se desvio de tráfego pesado e reforço de fiscalização na área de parada de emergência.',
  },
  {
    id: 'SZ-02',
    name: 'Clínica Pediátrica & TEA Santa Sofia',
    type: 'clinica',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    isQuietOasis: true,
    targetLimitDb: 48,
    currentPeriodDb: { Manhã: 50, Tarde: 54, Noite: 42 },
    proximityToHeavyTraffic: 'Isolada por recuo ajardinado de 45m',
    quietestWindow: '13h às 15h e após 18h',
    targetAudience: ['Crianças com TEA e hipersensibilidade auditiva', 'Terapeutas ocupacionais', 'Famílias em consulta'],
    recommendation: 'Excelente controle acústico passivo. Janela ideal de agendamento terapêutico no início da tarde.',
  },
  {
    id: 'SZ-03',
    name: 'Escola Municipal Darcy Ribeiro',
    type: 'escola',
    districtId: 'distrito-saude',
    districtName: 'Distrito Saúde & Bem-Estar',
    isQuietOasis: false,
    targetLimitDb: 52,
    currentPeriodDb: { Manhã: 68, Tarde: 69, Noite: 43 },
    proximityToHeavyTraffic: 'Entrada voltada para rua de circulação moderada',
    quietestWindow: '12h às 13h (intervalo de turnos)',
    targetAudience: ['Estudantes no espectro autista', 'Corpo docente', 'Comunidade escolar'],
    recommendation: 'Picos sonoros concentrados na entrada (07h15) e saída (17h00). Sugere-se abafador auricular em horários de troca.',
  },
  {
    id: 'SZ-04',
    name: 'Abrigo Animal São Francisco',
    type: 'abrigo',
    districtId: 'jardim-aurora',
    districtName: 'Jardim Aurora',
    isQuietOasis: false,
    targetLimitDb: 50,
    currentPeriodDb: { Manhã: 52, Tarde: 55, Noite: 45 },
    proximityToHeavyTraffic: 'Via pública de acesso local com baixo fluxo',
    quietestWindow: '18h às 07h',
    targetAudience: ['Cães e gatos resgatados com estresse sonoro', 'Voluntários e cuidadores'],
    recommendation: 'Cães possuem sensibilidade auditiva até 4x superior à humana. Manutenção de níveis abaixo de 55 dB evita pânico coletivo.',
  },
  {
    id: 'SZ-05',
    name: 'Parque das Águas — Oásis Acústico',
    type: 'parque',
    districtId: 'parque-verde',
    districtName: 'Parque das Águas & Área Verde',
    isQuietOasis: true,
    targetLimitDb: 45,
    currentPeriodDb: { Manhã: 44, Tarde: 48, Noite: 41 },
    proximityToHeavyTraffic: 'Cinturão verde de 300m bloqueia ruído das vias expressas',
    quietestWindow: '07h às 10h e 18h às 21h',
    targetAudience: ['Pessoas neurodivergentes em busca de descompressão', 'Idosos', 'Cidadãos buscando caminhadas serenas'],
    recommendation: 'Área com menor pressão sonora da cidade. Recomendada para pausas sensoriais restauradoras e recarga de energia mental.',
  },
  {
    id: 'SZ-06',
    name: 'Bosque Vila Serena & Praça dos Ipês',
    type: 'parque',
    districtId: 'vila-serena',
    districtName: 'Vila Serena',
    isQuietOasis: true,
    targetLimitDb: 48,
    currentPeriodDb: { Manhã: 51, Tarde: 50, Noite: 46 },
    proximityToHeavyTraffic: 'Circunscrita por vias públicas de acesso local, sem tráfego de ônibus',
    quietestWindow: '14h às 16h',
    targetAudience: ['Pessoas idosas', 'Famílias com carrinho de bebê', 'Pessoas com sensibilidade auditiva'],
    recommendation: 'Refúgio sonoro urbano permanente. Calçadas largas com pouca reverberação acústica e bancos sombreados.',
  },
]

export const alertsList: Alert[] = [
  {
    id: 'ALT-2026-084',
    sensorId: 'SNS-001',
    location: 'Rua do Mercado, 140 (Centro)',
    districtId: 'centro',
    timestamp: '14:25 (há 35 min)',
    period: 'Tarde',
    severity: 'critica',
    title: 'Recorrência excessiva de ruído acima de 75 dB',
    decibels: 84,
    threshold: 75,
    reason: 'Rua do Mercado ultrapassou 75 dB em 4 ocorrências contínuas durante descarga logística pesada.',
    occurrences: 4,
    status: 'novo',
    recommendedAction: 'Alerta simulado: orientar transportadoras sobre horários autorizados de carga e sugerir rota alternativa a pedestres sensíveis.',
  },
  {
    id: 'ALT-2026-083',
    sensorId: 'SNS-004',
    location: 'Hospital Dr. Arnaldo (Distrito Saúde)',
    districtId: 'distrito-saude',
    timestamp: '13:50 (há 1h10)',
    period: 'Tarde',
    severity: 'atencao',
    title: 'Pico pontual em raio sensível hospitalar',
    decibels: 74,
    threshold: 55,
    reason: 'Região próxima ao Hospital Municipal apresentou pico de 74 dB decorrente de comboio e sirenes em via adjacente.',
    occurrences: 2,
    status: 'analise',
    recommendedAction: 'Alerta simulado: registrar padrão de interferência para estudo de barreira acústica na entrada norte do complexo médico.',
  },
  {
    id: 'ALT-2026-082',
    sensorId: 'SNS-012',
    location: 'Avenida Central / Cruzamento Leste',
    districtId: 'eixo-leste',
    timestamp: '12:40 (há 2h20)',
    period: 'Tarde',
    severity: 'atencao',
    title: 'Elevação contínua no fluxo da mobilidade',
    decibels: 82,
    threshold: 70,
    reason: 'Avenida Central apresenta recorrência elevada de ruído mecânico no início do turno da tarde.',
    occurrences: 6,
    status: 'novo',
    recommendedAction: 'Alerta simulado: avisar usuários sobre congestionamento sonoro e direcionar rotas sensoriais calmas pela Vila Serena.',
  },
  {
    id: 'ALT-2026-079',
    sensorId: 'SNS-006',
    location: 'Escola Municipal Darcy Ribeiro',
    districtId: 'distrito-saude',
    timestamp: '07:35 (período da manhã)',
    period: 'Manhã',
    severity: 'informativa',
    title: 'Pico habitual de entrada escolar matutina',
    decibels: 77,
    threshold: 65,
    reason: 'Concentração de ônibus escolares e buzinas na faixa de embarque e desembarque.',
    occurrences: 3,
    status: 'normalizado',
    recommendedAction: 'Alerta simulado: evento concluído com dissipação natural do ruído após o início das aulas.',
  },
  {
    id: 'ALT-2026-077',
    sensorId: 'SNS-002',
    location: 'Praça das Palmeiras (Centro)',
    districtId: 'centro',
    timestamp: 'Ontem, 21:15',
    period: 'Noite',
    severity: 'informativa',
    title: 'Normalização acústica pós-evento cultural',
    decibels: 71,
    threshold: 65,
    reason: 'Desmontagem de estrutura na praça gerou ruído temporário, rapidamente contornado.',
    occurrences: 1,
    status: 'normalizado',
    recommendedAction: 'Alerta simulado: arquivado após retorno aos parâmetros de conforto noturno (< 55 dB).',
  },
]

export const hourlyTrendHistory: HourlyReading[] = [
  { hour: '00:00', avgCity: 43, centro: 48, jardimAurora: 40, distritoSaude: 42, vilaSerena: 38, eixoLeste: 47 },
  { hour: '02:00', avgCity: 41, centro: 44, jardimAurora: 38, distritoSaude: 40, vilaSerena: 36, eixoLeste: 45 },
  { hour: '04:00', avgCity: 42, centro: 47, jardimAurora: 39, distritoSaude: 41, vilaSerena: 37, eixoLeste: 48 },
  { hour: '06:00', avgCity: 53, centro: 60, jardimAurora: 44, distritoSaude: 52, vilaSerena: 42, eixoLeste: 65 },
  { hour: '08:00', avgCity: 64, centro: 73, jardimAurora: 50, distritoSaude: 62, vilaSerena: 49, eixoLeste: 75 },
  { hour: '10:00', avgCity: 62, centro: 71, jardimAurora: 49, distritoSaude: 59, vilaSerena: 48, eixoLeste: 70 },
  { hour: '12:00', avgCity: 66, centro: 75, jardimAurora: 56, distritoSaude: 64, vilaSerena: 51, eixoLeste: 76 },
  { hour: '14:00', avgCity: 67, centro: 78, jardimAurora: 58, distritoSaude: 63, vilaSerena: 50, eixoLeste: 77 },
  { hour: '16:00', avgCity: 65, centro: 74, jardimAurora: 55, distritoSaude: 65, vilaSerena: 49, eixoLeste: 74 },
  { hour: '18:00', avgCity: 68, centro: 77, jardimAurora: 54, distritoSaude: 60, vilaSerena: 48, eixoLeste: 79 },
  { hour: '20:00', avgCity: 57, centro: 64, jardimAurora: 46, distritoSaude: 52, vilaSerena: 45, eixoLeste: 66 },
  { hour: '22:00', avgCity: 49, centro: 55, jardimAurora: 42, distritoSaude: 46, vilaSerena: 40, eixoLeste: 54 },
]

/**
 * Constrói a estrutura de compatibilidade com o formato legado do Sonitus,
 * porém populada dinamicamente a partir dos 12 sensores modelados.
 */
export function getPeriodData(period: Period): PeriodData {
  const readings: PlaceReading[] = sensorsList.map((sensor) => {
    const r = sensor.readings[period]
    return {
      name: sensor.name.replace('Sensor ', ''),
      district: sensor.districtName,
      districtId: sensor.districtId,
      level: r.level,
      decibels: r.decibels,
      peakDb: r.peakDb,
      note: r.note,
      category: sensor.category,
      sensorId: sensor.id,
    }
  })

  // Leitura padrão em foco
  const defaultPlace =
    period === 'Manhã'
      ? readings.find((p) => p.name === 'Praça das Palmeiras') ?? readings[0]
      : period === 'Tarde'
      ? readings.find((p) => p.name === 'Avenida Central / Cruzamento') ?? readings[0]
      : readings.find((p) => p.name === 'Vila Serena / Praça Ipês') ?? readings[0]

  const bestTime =
    period === 'Manhã' ? '8h às 9h' : period === 'Tarde' ? '14h30 às 15h30' : '20h às 21h'

  const quietArea =
    period === 'Manhã'
      ? 'Parque das Águas (44 dB)'
      : period === 'Tarde'
      ? 'Vila Serena (50 dB)'
      : 'Parque das Águas / Vila Serena (41 dB)'

  // Gráfico do dia para o período
  const chartHours =
    period === 'Manhã'
      ? ['06h', '07h', '08h', '09h', '10h', '11h', '12h']
      : period === 'Tarde'
      ? ['12h', '13h', '14h', '15h', '16h', '17h', '18h']
      : ['18h', '19h', '20h', '21h', '22h', '23h', '00h']

  const chart = chartHours.map((hour) => {
    const histMatch = hourlyTrendHistory.find((h) => h.hour.startsWith(hour.slice(0, 2)))
    return {
      hour,
      decibels: histMatch ? histMatch.avgCity : 58,
    }
  })

  return {
    current: defaultPlace,
    bestTime,
    quietArea,
    readings,
    chart,
  }
}

export const periodData: Record<Period, PeriodData> = {
  Manhã: getPeriodData('Manhã'),
  Tarde: getPeriodData('Tarde'),
  Noite: getPeriodData('Noite'),
}

export function computeCityMetrics(period: Period) {
  const data = periodData[period]
  const totalReadings = data.readings.length
  const sumDb = data.readings.reduce((acc, curr) => acc + curr.decibels, 0)
  const avgDb = Math.round(sumDb / totalReadings)

  const quietZones = data.readings.filter((r) => r.level === 'tranquilo').length
  const warningZones = data.readings.filter((r) => r.level === 'intenso').length
  const moderateZones = data.readings.filter((r) => r.level === 'moderado').length

  const activeSensors = sensorsList.filter((s) => s.status === 'online').length
  const totalSensors = sensorsList.length

  const alertsLast24h = alertsList.length

  return {
    avgDb,
    quietZones,
    warningZones,
    moderateZones,
    activeSensors,
    totalSensors,
    districtsCount: districtsList.length,
    alertsLast24h,
    quietestPlace: [...data.readings].sort((a, b) => a.decibels - b.decibels)[0],
    loudestPlace: [...data.readings].sort((a, b) => b.decibels - a.decibels)[0],
  }
}
