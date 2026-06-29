<template>
  <div class="weather-view">
    <div class="weather-view__container">
      <CitySearch class="weather-view__search" @select="onCitySelect" />

      <LoadingSpinner v-if="weatherStore.isLoading" message="Buscando previsão..." fullpage />

      <div v-else-if="weatherStore.error" class="weather-view__error">
        <svg viewBox="0 0 48 48" class="error-icon"><circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/><line x1="24" y1="14" x2="24" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="34" r="1.5" fill="currentColor"/></svg>
        <p>{{ weatherStore.error }}</p>
        <button class="retry-btn" @click="retry">Tentar novamente</button>
      </div>

      <template v-else-if="weatherStore.data">
        <WeatherScene :scenario="conditionInfo.scenario" class="weather-view__scene" />

        <WeatherCard
          :city="cityName"
          :temperature="current.temperature"
          :weathercode="current.weathercode"
          :temp-min="daily.temperature_2m_min[0] ?? current.temperature"
          :temp-max="daily.temperature_2m_max[0] ?? current.temperature"
        />

        <WeatherStats
          :humidity="currentHumidity"
          :windspeed="current.windspeed"
          :winddirection="current.winddirection"
          :precipitation="currentPrecipitation"
          :feels-like="currentFeelsLike"
        />

        <DailyForecast :daily="daily" />
      </template>

      <div v-else class="weather-view__empty">
        <div class="empty-illustration" aria-hidden="true">
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="white" opacity="0.15">
              <circle cx="38" cy="38" r="24" />
              <circle cx="60" cy="28" r="30" />
              <circle cx="84" cy="38" r="22" />
              <rect x="14" y="38" width="96" height="28" />
            </g>
            <circle cx="30" cy="20" r="16" fill="white" opacity="0.2" />
            <g stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.2">
              <line x1="30" y1="0" x2="30" y2="6" />
              <line x1="30" y1="34" x2="30" y2="40" />
              <line x1="10" y1="20" x2="16" y2="20" />
              <line x1="44" y1="20" x2="50" y2="20" />
            </g>
          </svg>
        </div>
        <h2 class="empty-title">Nenhuma cidade selecionada</h2>
        <p class="empty-subtitle">Busque uma cidade para ver a previsão do tempo</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { useWeatherCondition, getCurrentHourIndex } from '@/composables/useWeather'
import CitySearch from '@/components/CitySearch.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import WeatherScene from '@/components/WeatherScene.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import WeatherStats from '@/components/WeatherStats.vue'
import DailyForecast from '@/components/DailyForecast.vue'

const weatherStore = useWeatherStore()

const current = computed(() => weatherStore.data!.current_weather)
const daily = computed(() => weatherStore.data!.daily)
const hourly = computed(() => weatherStore.data!.hourly)

const cityName = computed(
  () => weatherStore.data?.city ?? weatherStore.currentCity,
)

const conditionInfo = computed(() =>
  useWeatherCondition(current.value.weathercode, current.value.temperature),
)

const hourIndex = computed(() =>
  getCurrentHourIndex(hourly.value.time),
)

const currentHumidity = computed(
  () => hourly.value.relativehumidity_2m[hourIndex.value] ?? 0,
)

const currentPrecipitation = computed(
  () => hourly.value.precipitation[hourIndex.value] ?? 0,
)

const currentFeelsLike = computed(
  () => hourly.value.apparent_temperature?.[hourIndex.value],
)

function onCitySelect(city: string) {
  weatherStore.fetchWeather(city)
}

function retry() {
  if (weatherStore.currentCity) {
    weatherStore.fetchWeather(weatherStore.currentCity)
  }
}
</script>

<style scoped>
.weather-view {
  min-height: calc(100vh - 64px);
  padding: 24px 16px 48px;
}

.weather-view__container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weather-view__search {
  margin-bottom: 4px;
}

.weather-view__scene {
  margin-top: 4px;
}

.weather-view__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.error-icon {
  width: 56px;
  height: 56px;
  color: rgba(255, 255, 255, 0.5);
}

.retry-btn {
  padding: 10px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.weather-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 64px 24px;
  text-align: center;
  color: white;
}

.empty-illustration svg {
  width: 160px;
  height: auto;
}

.empty-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.9);
}

.empty-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}
</style>
