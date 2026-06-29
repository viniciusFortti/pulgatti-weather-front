<template>
  <div class="weather-stats">
    <div v-for="stat in stats" :key="stat.label" class="stat-card glass-card">
      <div class="stat-card__icon" v-html="stat.iconSvg" />
      <span class="stat-card__label">{{ stat.label }}</span>
      <span class="stat-card__value">{{ stat.value }}</span>
      <span v-if="stat.sub" class="stat-card__sub">{{ stat.sub }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatWindDirection } from '@/composables/useWeather'

const props = defineProps<{
  humidity: number
  windspeed: number
  winddirection: number
  precipitation: number
  feelsLike?: number
}>()

const ICON_HUMIDITY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C12 2 5 10.4 5 14.5a7 7 0 0 0 14 0C19 10.4 12 2 12 2z"/></svg>`
const ICON_WIND = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`
const ICON_PRECIP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11.05 11.05 0 0 1-22 0zm-5-7.07A12.91 12.91 0 0 0 12 2a12.91 12.91 0 0 0-6 2.93"/><line x1="12" y1="12" x2="12" y2="21"/><polyline points="9,18 12,21 15,18"/></svg>`
const ICON_FEELS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`
const ICON_COMPASS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.5"/></svg>`

const stats = computed(() => [
  {
    label: 'Umidade',
    value: `${props.humidity}%`,
    iconSvg: ICON_HUMIDITY,
    sub: undefined,
  },
  {
    label: 'Vento',
    value: `${Math.round(props.windspeed)} km/h`,
    iconSvg: ICON_WIND,
    sub: formatWindDirection(props.winddirection),
  },
  {
    label: 'Precipitação',
    value: `${props.precipitation.toFixed(1)} mm`,
    iconSvg: ICON_PRECIP,
    sub: undefined,
  },
  {
    label: 'Sensação',
    value: props.feelsLike !== undefined ? `${Math.round(props.feelsLike)}°C` : '—',
    iconSvg: ICON_FEELS,
    sub: undefined,
  },
  {
    label: 'Dir. Vento',
    value: formatWindDirection(props.winddirection),
    iconSvg: ICON_COMPASS,
    sub: `${props.winddirection}°`,
  },
])
</script>

<style scoped>
.weather-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 16px;
  color: white;
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card__icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.85);
}

.stat-card__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.stat-card__label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.stat-card__value {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
}

.stat-card__sub {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
