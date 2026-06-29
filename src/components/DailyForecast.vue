<template>
  <div class="daily-forecast glass-card">
    <h2 class="daily-forecast__title">Próximos dias</h2>
    <div class="daily-forecast__list">
      <div v-for="(day, index) in days" :key="day.date" class="forecast-item">
        <span class="forecast-item__day">{{ formatDayLabel(day.date, index) }}</span>
        <WeatherIcon :condition="getCondition(day.weathercode)" class="forecast-item__icon" />
        <div class="forecast-item__temps">
          <span class="forecast-item__max">{{ Math.round(day.tempMax) }}°</span>
          <span class="forecast-item__min">{{ Math.round(day.tempMin) }}°</span>
        </div>
        <div v-if="day.precipitation > 0" class="forecast-item__precip">
          <svg viewBox="0 0 12 12" class="precip-icon"><path d="M6 1c0 0-4 4.5-4 6.5a4 4 0 0 0 8 0C10 5.5 6 1 6 1z" fill="currentColor"/></svg>
          {{ day.precipitation.toFixed(1) }}mm
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { useWeatherCondition, formatDayLabel } from '@/composables/useWeather'
import type { DailyData, WeatherConditionType } from '@/types'

const props = defineProps<{
  daily: DailyData
}>()

function getCondition(code: number): WeatherConditionType {
  return useWeatherCondition(code, 20).condition
}

const days = computed(() =>
  props.daily.time.slice(0, 7).map((date, i) => ({
    date,
    weathercode: props.daily.weathercode[i] ?? 0,
    tempMax: props.daily.temperature_2m_max[i] ?? 0,
    tempMin: props.daily.temperature_2m_min[i] ?? 0,
    precipitation: props.daily.precipitation_sum[i] ?? 0,
  })),
)
</script>

<style scoped>
.daily-forecast {
  padding: 24px 28px;
  color: white;
}

.daily-forecast__title {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 16px;
}

.daily-forecast__list {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.daily-forecast__list::-webkit-scrollbar {
  height: 4px;
}

.daily-forecast__list::-webkit-scrollbar-track {
  background: transparent;
}

.daily-forecast__list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  min-width: 80px;
  transition: background 0.2s ease;
}

.forecast-item:first-child {
  background: rgba(255, 255, 255, 0.15);
}

.forecast-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.forecast-item__day {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: capitalize;
  font-weight: 500;
}

.forecast-item__icon {
  width: 36px;
  height: 36px;
  color: white;
}

.forecast-item__temps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.forecast-item__max {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.forecast-item__min {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

.forecast-item__precip {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  color: rgba(180, 220, 255, 0.9);
}

.precip-icon {
  width: 10px;
  height: 10px;
  color: rgba(180, 220, 255, 0.9);
}
</style>
