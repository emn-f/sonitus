export type NoiseLevel = 'tranquilo' | 'moderado' | 'intenso'

export type Period = 'Manhã' | 'Tarde' | 'Noite'

export type NavigationTab =
  | 'visao-geral'
  | 'mapa'
  | 'zonas-sensiveis'
  | 'alertas'
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
  | 'residencial'

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
  position: { x: number; y: number }
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
  | 'residencial_calmo'

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
  position: { x: number; y: number }
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
