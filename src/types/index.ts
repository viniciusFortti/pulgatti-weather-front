export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface City {
  id?: number
  name: string        // normalizado no serviço a partir de cityName
  cityName?: string   // campo real da API
  country?: string
  state?: string
  admin1?: string
  latitude?: number
  longitude?: number
  updatedAt?: string
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: string
}

export interface HourlyData {
  time: string[]
  temperature_2m: number[]
  relativehumidity_2m: number[]
  precipitation: number[]
  weathercode: number[]
  windspeed_10m: number[]
  apparent_temperature?: number[]
}

export interface DailyData {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  windspeed_10m_max: number[]
  precipitation_probability_max?: number[]
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: CurrentWeather
  hourly: HourlyData
  daily: DailyData
  city?: string
}

export interface HistoryEntry {
  id: number
  searchedCity: string
  searchedAt: string
  snapshotTemperature: number
  snapshotWeatherCode: number
}

export type WeatherConditionType =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'foggy'
  | 'drizzle'
  | 'rainy'
  | 'snowy'
  | 'stormy'

export type WeatherScenario = 'sunny-hot' | 'sunny-cold' | 'rainy' | 'stormy' | 'cloudy' | 'snowy'

export interface WeatherConditionInfo {
  condition: WeatherConditionType
  scenario: WeatherScenario
  label: string
  description: string
}
