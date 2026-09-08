export type NoiseLevel = 'tranquilo' | 'moderado' | 'intenso'

export type Period = 'Manhã' | 'Tarde' | 'Noite'

export interface PlaceReading {
  name: string
  district: string
  level: NoiseLevel
  decibels: number
  position: { x: number; y: number }
  note: string
}

export interface PeriodData {
  current: PlaceReading
  bestTime: string
  quietArea: string
  readings: PlaceReading[]
  chart: { hour: string; decibels: number }[]
}

export const levelLabels: Record<NoiseLevel, string> = {
  tranquilo: 'Tranquilo',
  moderado: 'Moderado',
  intenso: 'Intenso',
}

export const periodData: Record<Period, PeriodData> = {
  Manhã: {
    current: { name: 'Praça das Palmeiras', district: 'Centro', level: 'moderado', decibels: 62, position: { x: 49, y: 48 }, note: 'Movimento gradual e sons de comércio.' },
    bestTime: '8h às 9h', quietArea: 'Jardim Aurora',
    readings: [
      { name: 'Jardim Aurora', district: 'Norte', level: 'tranquilo', decibels: 48, position: { x: 22, y: 25 }, note: 'Ruas arborizadas e fluxo leve.' },
      { name: 'Rua do Mercado', district: 'Centro', level: 'intenso', decibels: 74, position: { x: 71, y: 33 }, note: 'Entrega de mercadorias e tráfego.' },
      { name: 'Praça das Palmeiras', district: 'Centro', level: 'moderado', decibels: 62, position: { x: 49, y: 48 }, note: 'Movimento gradual e sons de comércio.' },
      { name: 'Vila Serena', district: 'Sul', level: 'tranquilo', decibels: 51, position: { x: 27, y: 74 }, note: 'Percurso com menor circulação.' },
      { name: 'Avenida Central', district: 'Leste', level: 'moderado', decibels: 66, position: { x: 76, y: 69 }, note: 'Tráfego constante perto dos cruzamentos.' },
    ],
    chart: [{ hour: '7h', decibels: 49 }, { hour: '9h', decibels: 62 }, { hour: '11h', decibels: 68 }, { hour: '13h', decibels: 65 }, { hour: '15h', decibels: 60 }, { hour: '17h', decibels: 70 }, { hour: '19h', decibels: 58 }],
  },
  Tarde: {
    current: { name: 'Avenida Central', district: 'Leste', level: 'intenso', decibels: 73, position: { x: 76, y: 69 }, note: 'Fluxo elevado próximo aos cruzamentos.' },
    bestTime: '14h às 15h', quietArea: 'Vila Serena',
    readings: [
      { name: 'Jardim Aurora', district: 'Norte', level: 'moderado', decibels: 58, position: { x: 22, y: 25 }, note: 'Atividade moderada nos arredores.' },
      { name: 'Rua do Mercado', district: 'Centro', level: 'intenso', decibels: 78, position: { x: 71, y: 33 }, note: 'Maior movimento comercial.' },
      { name: 'Praça das Palmeiras', district: 'Centro', level: 'moderado', decibels: 67, position: { x: 49, y: 48 }, note: 'Conversas e tráfego urbano.' },
      { name: 'Vila Serena', district: 'Sul', level: 'tranquilo', decibels: 50, position: { x: 27, y: 74 }, note: 'Opção de pausa com menor fluxo.' },
      { name: 'Avenida Central', district: 'Leste', level: 'intenso', decibels: 73, position: { x: 76, y: 69 }, note: 'Fluxo elevado próximo aos cruzamentos.' },
    ],
    chart: [{ hour: '7h', decibels: 52 }, { hour: '9h', decibels: 64 }, { hour: '11h', decibels: 71 }, { hour: '13h', decibels: 76 }, { hour: '15h', decibels: 65 }, { hour: '17h', decibels: 73 }, { hour: '19h', decibels: 63 }],
  },
  Noite: {
    current: { name: 'Vila Serena', district: 'Sul', level: 'tranquilo', decibels: 46, position: { x: 27, y: 74 }, note: 'Movimento reduzido e entorno mais calmo.' },
    bestTime: '20h às 21h', quietArea: 'Jardim Aurora',
    readings: [
      { name: 'Jardim Aurora', district: 'Norte', level: 'tranquilo', decibels: 44, position: { x: 22, y: 25 }, note: 'Baixa circulação no início da noite.' },
      { name: 'Rua do Mercado', district: 'Centro', level: 'moderado', decibels: 61, position: { x: 71, y: 33 }, note: 'Comércio encerrando atividades.' },
      { name: 'Praça das Palmeiras', district: 'Centro', level: 'moderado', decibels: 56, position: { x: 49, y: 48 }, note: 'Ambiente com conversas pontuais.' },
      { name: 'Vila Serena', district: 'Sul', level: 'tranquilo', decibels: 46, position: { x: 27, y: 74 }, note: 'Movimento reduzido e entorno mais calmo.' },
      { name: 'Avenida Central', district: 'Leste', level: 'moderado', decibels: 59, position: { x: 76, y: 69 }, note: 'Tráfego menos intenso após o pico.' },
    ],
    chart: [{ hour: '7h', decibels: 49 }, { hour: '9h', decibels: 62 }, { hour: '11h', decibels: 68 }, { hour: '13h', decibels: 65 }, { hour: '15h', decibels: 60 }, { hour: '17h', decibels: 70 }, { hour: '19h', decibels: 49 }],
  },
}
