<template>
  <div class="app" :class="appBackgroundClass">
    <AppHeader v-if="authStore.isAuthenticated" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useWeatherStore } from '@/stores/weather'
import { useWeatherCondition } from '@/composables/useWeather'
import AppHeader from '@/components/AppHeader.vue'

const authStore = useAuthStore()
const weatherStore = useWeatherStore()

const appBackgroundClass = computed(() => {
  if (!weatherStore.data) return 'app--default'
  const { current_weather } = weatherStore.data
  const { scenario } = useWeatherCondition(current_weather.weathercode, current_weather.temperature)
  return `app--${scenario}`
})
</script>

<style>
.app {
  min-height: 100vh;
  transition: background 1.2s ease;
}

.app--default {
  background: linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0d3b6e 100%);
}

.app--sunny-hot {
  background: linear-gradient(160deg, #7c2d12 0%, #ea580c 40%, #fbbf24 100%);
}

.app--sunny-cold {
  background: linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #38bdf8 100%);
}

.app--rainy {
  background: linear-gradient(160deg, #0d1b2a 0%, #1e3a5f 40%, #374151 100%);
}

.app--stormy {
  background: linear-gradient(160deg, #0a0015 0%, #2d1b69 45%, #1f2937 100%);
}

.app--cloudy {
  background: linear-gradient(160deg, #1e293b 0%, #334155 45%, #475569 100%);
}

.app--snowy {
  background: linear-gradient(160deg, #1e3a5f 0%, #3b82f6 45%, #93c5fd 100%);
}
</style>
