import type { WeatherConditionInfo, WeatherConditionType, WeatherScenario } from '@/types'

const STORMY_CODES = new Set([95, 96, 99])
const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86])
const RAIN_CODES = new Set([61, 63, 65, 66, 67, 80, 81, 82])
const DRIZZLE_CODES = new Set([51, 53, 55, 56, 57])
const FOG_CODES = new Set([45, 48])
const CLOUDY_CODES = new Set([3])
const PARTLY_CLOUDY_CODES = new Set([1, 2])

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Principalmente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Geada com neblina',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa densa',
  56: 'Garoa congelante leve',
  57: 'Garoa congelante densa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  66: 'Chuva congelante leve',
  67: 'Chuva congelante forte',
  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve forte',
  77: 'Grãos de neve',
  80: 'Chuva isolada leve',
  81: 'Chuva isolada moderada',
  82: 'Chuva isolada forte',
  85: 'Neve isolada leve',
  86: 'Neve isolada forte',
  95: 'Tempestade',
  96: 'Tempestade com granizo',
  99: 'Tempestade com granizo forte',
}

function getConditionType(code: number): WeatherConditionType {
  if (STORMY_CODES.has(code)) return 'stormy'
  if (SNOW_CODES.has(code)) return 'snowy'
  if (RAIN_CODES.has(code)) return 'rainy'
  if (DRIZZLE_CODES.has(code)) return 'drizzle'
  if (FOG_CODES.has(code)) return 'foggy'
  if (CLOUDY_CODES.has(code)) return 'cloudy'
  if (PARTLY_CLOUDY_CODES.has(code)) return 'partly-cloudy'
  return 'sunny'
}

function getScenario(code: number, temperature: number): WeatherScenario {
  if (STORMY_CODES.has(code)) return 'stormy'
  if (SNOW_CODES.has(code)) return 'snowy'
  if (RAIN_CODES.has(code) || DRIZZLE_CODES.has(code)) return 'rainy'
  if (FOG_CODES.has(code) || CLOUDY_CODES.has(code) || PARTLY_CLOUDY_CODES.has(code)) return 'cloudy'
  return temperature >= 25 ? 'sunny-hot' : 'sunny-cold'
}

const CONDITION_LABELS: Record<WeatherConditionType, (temp: number) => string> = {
  sunny: (temp) => (temp >= 25 ? 'Ensolarado e quente' : 'Ensolarado e frio'),
  'partly-cloudy': () => 'Parcialmente nublado',
  cloudy: () => 'Nublado',
  foggy: () => 'Neblina',
  drizzle: () => 'Garoa',
  rainy: () => 'Chuva',
  snowy: () => 'Neve',
  stormy: () => 'Tempestade',
}

export function useWeatherCondition(code: number, temperature: number): WeatherConditionInfo {
  const condition = getConditionType(code)
  const scenario = getScenario(code, temperature)
  const description = WMO_DESCRIPTIONS[code] ?? 'Condição desconhecida'
  const label = CONDITION_LABELS[condition](temperature)

  return { condition, scenario, label, description }
}

export function formatWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO']
  const index = Math.round(degrees / 45) % 8
  return directions[index] ?? 'N'
}

export function getCurrentHourIndex(times: string[]): number {
  const currentHour = new Date().toISOString().slice(0, 13)
  const index = times.findIndex((t) => t.startsWith(currentHour))
  return index >= 0 ? index : 0
}

export function formatDayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Hoje'
  if (index === 1) return 'Amanhã'
  const parts = dateStr.split('-').map(Number)
  const year = parts[0] ?? new Date().getFullYear()
  const month = parts[1] ?? 1
  const day = parts[2] ?? 1
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', { weekday: 'short' })
}
