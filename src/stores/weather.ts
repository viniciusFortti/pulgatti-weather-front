import { defineStore } from 'pinia'
import { ref } from 'vue'
import { weatherService } from '@/services/weatherService'
import type { WeatherResponse } from '@/types'

export const useWeatherStore = defineStore('weather', () => {
  const data = ref<WeatherResponse | null>(null)
  const currentCity = ref<string>('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWeather(city: string) {
    isLoading.value = true
    error.value = null
    try {
      data.value = await weatherService.getByCity(city)
      currentCity.value = city
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar previsão do tempo'
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  function clearWeather() {
    data.value = null
    currentCity.value = ''
    error.value = null
  }

  return { data, currentCity, isLoading, error, fetchWeather, clearWeather }
})
