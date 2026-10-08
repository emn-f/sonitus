export type NoiseLevel = 'tranquilo' | 'moderado' | 'intenso'

export type Period = 'Manhã' | 'Tarde' | 'Noite'

export type NavigationTab =
  | 'visao-geral'
  | 'mapa'
  | 'zonas-sensiveis'
  | 'alertas'
  | 'comunidade'
  | 'sensores'
  | 'tecnologia'
  | 'sobre'

export type DistrictId =
  | 'centro'
  | 'jardim-aurora'
  | 'vila-serena'
  | 'distrito-saude'
  | 'eixo-leste'
  | 'parque-verde'

export type SensorCategory =
  | 'comercial'
  | 'arterial'
  | 'hospitalar'
  | 'escolar'
  | 'abrigo'
  | 'parque'

export interface SensorReading {
  decibels: number
  peakDb: number
  level: NoiseLevel
  note: string
}

export interface Sensor {
  id: string
  name: string
  districtId: DistrictId
  districtName: string
  locationDesc: string
  status: 'online' | 'atencao' | 'offline'
  firmware: string
  connectivity: 'LoRaWAN' | 'NB-IoT' | 'Wi-Fi Mesh'
  batteryPercent: number
  powerSource: 'Solar + Li-ion' | 'Rede Iluminação'
  lastTransmission: string
  category: SensorCategory
  readings: Record<Period, SensorReading>
}

export type SensitiveZoneType =
  | 'hospital'
  | 'clinica'
  | 'escola'
  | 'abrigo'
  | 'parque'

export interface SensitiveZone {
  id: string
  name: string
  type: SensitiveZoneType
  districtId: DistrictId
  districtName: string
  isQuietOasis: boolean
  targetLimitDb: number
  currentPeriodDb: Record<Period, number>
  proximityToHeavyTraffic: string
  quietestWindow: string
  targetAudience: string[]
  recommendation: string
}

export interface Alert {
  id: string
  sensorId: string
  location: string
  districtId: DistrictId
  timestamp: string
  period: Period
  severity: 'critica' | 'atencao' | 'informativa'
  title: string
  decibels: number
  threshold: number
  reason: string
  occurrences: number
  status: 'novo' | 'analise' | 'normalizado'
  recommendedAction: string
  // Regras metodológicas da Etapa 5 do projeto:
  evaluationWindowMinutes?: number // Janela padrão: 10 min
  consecutiveWindowsExceeded?: number // Excedido em >= 2 janelas consecutivas
  isRecurring?: boolean // Reincidência: 3 alertas no mesmo ponto em 1 hora
  nbr10151LimitDb?: number // Limite normativo de referência diurno/noturno
}

export interface AcousticEvent {
  id: string
  sensorId: string
  location: string
  timestamp: string
  period: Period
  peakDb: number
  ambientLaeqDb: number
  sourceType: 'buzina' | 'sirene' | 'escapamento' | 'evento_noturno' | 'fogos' | 'obra'
  durationSeconds: number
  reason: string
  alertTriggered: false // Conforme metodologia, pico isolado NÃO gera alerta automático
  methodologyNote: string
}

export type CommunityImpactType =
  | 'tea_hipersensibilidade'
  | 'animais'
  | 'sono'
  | 'trabalho_estudo'
  | 'saude_idosos'
  | 'geral'

export type CommunitySourceType =
  | 'trafego'
  | 'comercio'
  | 'obras'
  | 'animais'
  | 'fogos'
  | 'som_automotivo'
  | 'outro'

export interface CommunityReport {
  id: string
  anonymousCode: string // Identificador anônimo sem dados pessoais (LGPD)
  location: string
  districtId: DistrictId
  timestamp: string
  period: Period
  sourceType: CommunitySourceType
  impactType: CommunityImpactType
  intensityPerceived: 'leve' | 'moderado' | 'intenso' | 'severo'
  description: string
  status: 'registrado' | 'correlacionado' | 'em_analise'
  sensorCorrelation?: string
}

export interface HourlyReading {
  hour: string
  avgCity: number
  centro: number
  jardimAurora: number
  distritoSaude: number
  vilaSerena: number
  eixoLeste: number
}

export interface DistrictInfo {
  id: DistrictId
  name: string
  tagline: string
  description: string
  color: string
}

export interface PlaceReading {
  name: string
  district: string
  districtId: DistrictId
  level: NoiseLevel
  decibels: number
  peakDb: number
  note: string
  category: SensorCategory
  sensorId: string
}

export interface PeriodData {
  current: PlaceReading
  bestTime: string
  quietArea: string
  readings: PlaceReading[]
  chart: { hour: string; decibels: number }[]
}
