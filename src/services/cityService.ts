import { api } from './api'
import type { City } from '@/types'

interface ApiCity {
  id?: number
  name?: string
  cityName?: string
  state?: string
  country?: string
  admin1?: string
  latitude?: number
  longitude?: number
  updatedAt?: string
}

interface ApiCityResponse {
  results?: ApiCity[]
}

function normalizeCity(raw: ApiCity): City {
  return {
    ...raw,
    name: raw.cityName ?? raw.name ?? '',
    country: raw.state ?? raw.country,
  }
}

export const cityService = {
  search: async (name: string): Promise<City[]> => {
    const response = await api.get<ApiCityResponse | ApiCity[]>(
      `/cities?name=${encodeURIComponent(name)}`,
    )
    const raw = Array.isArray(response) ? response : (response.results ?? [])
    return raw.map(normalizeCity)
  },
}
