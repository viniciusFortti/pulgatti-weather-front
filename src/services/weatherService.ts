import { api } from './api'
import type { WeatherResponse } from '@/types'

export const weatherService = {
  getByCity: (city: string) =>
    api.get<WeatherResponse>(`/weather/forecast?city=${encodeURIComponent(city)}`),
}
