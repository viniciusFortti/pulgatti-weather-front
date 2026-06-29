<template>
  <div class="weather-card glass-card">
    <div class="weather-card__header">
      <div>
        <h1 class="weather-card__city">{{ city }}</h1>
        <p class="weather-card__date">{{ formattedDate }}</p>
      </div>
      <p class="weather-card__description">{{ conditionInfo.description }}</p>
    </div>

    <div class="weather-card__body">
      <WeatherIcon :condition="conditionInfo.condition" class="weather-card__icon" />
      <div class="weather-card__temp-group">
        <div class="weather-card__temp">
          <span class="weather-card__temp-value">{{ Math.round(temperature) }}</span>
          <span class="weather-card__temp-unit">°C</span>
        </div>
        <p class="weather-card__condition-label">{{ conditionInfo.label }}</p>
        <div class="weather-card__range">
          <span class="weather-card__range-item">
            <svg viewBox="0 0 16 16" class="range-icon"><polyline points="8,2 8,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="5,7 8,10 11,7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            {{ Math.round(tempMin) }}°C
          </span>
          <span class="weather-card__range-divider">|</span>
          <span class="weather-card__range-item">
            <svg viewBox="0 0 16 16" class="range-icon"><polyline points="8,14 8,6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="5,9 8,6 11,9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            {{ Math.round(tempMax) }}°C
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { useWeatherCondition } from '@/composables/useWeather'
import type { WeatherConditionInfo } from '@/types'

const props = defineProps<{
  city: string
  temperature: number
  weathercode: number
  tempMin: number
  tempMax: number
}>()

const conditionInfo = computed<WeatherConditionInfo>(() =>
  useWeatherCondition(props.weathercode, props.temperature),
)

const formattedDate = computed(() =>
  new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }),
)
</script>

<style scoped>
.weather-card {
  padding: 28px 32px;
  color: white;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.weather-card__city {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 4px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.weather-card__date {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  text-transform: capitalize;
}

.weather-card__description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  margin: 0;
  max-width: 160px;
}

.weather-card__body {
  display: flex;
  align-items: center;
  gap: 24px;
}

.weather-card__icon {
  width: 96px;
  height: 96px;
  color: white;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
}

.weather-card__temp-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.weather-card__temp {
  display: flex;
  align-items: flex-start;
  line-height: 1;
}

.weather-card__temp-value {
  font-size: 5rem;
  font-weight: 200;
  letter-spacing: -4px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.weather-card__temp-unit {
  font-size: 2rem;
  font-weight: 300;
  margin-top: 12px;
  opacity: 0.8;
}

.weather-card__condition-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.weather-card__range {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.weather-card__range-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.weather-card__range-divider {
  color: rgba(255, 255, 255, 0.3);
}

.range-icon {
  width: 14px;
  height: 14px;
  fill: none;
}

@media (max-width: 480px) {
  .weather-card {
    padding: 20px;
  }

  .weather-card__city {
    font-size: 1.5rem;
  }

  .weather-card__temp-value {
    font-size: 4rem;
  }

  .weather-card__icon {
    width: 72px;
    height: 72px;
  }

  .weather-card__description {
    display: none;
  }
}
</style>
