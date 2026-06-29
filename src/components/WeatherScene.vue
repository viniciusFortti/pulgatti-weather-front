<template>
  <div class="weather-scene" :class="`weather-scene--${scenario}`">
    <img
      v-if="!imageError && imageSrc"
      :src="imageSrc"
      :alt="label"
      class="weather-scene__image"
      @error="imageError = true"
    />
    <div v-else class="weather-scene__placeholder">
      <span class="weather-scene__emoji" aria-hidden="true">{{ emoji }}</span>
      <p class="weather-scene__label">{{ label }}</p>
      <p class="weather-scene__hint">Adicione uma imagem em: <code>{{ imageSrc }}</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { WeatherScenario } from '@/types'

const props = defineProps<{
  scenario: WeatherScenario
}>()

const imageError = ref(false)

const SCENARIO_CONFIG: Record<WeatherScenario, { label: string; emoji: string; image: string }> = {
  'sunny-hot': {
    label: 'Dia ensolarado e quente',
    emoji: '☀️',
    image: '/images/weather/sunny-hot.jpg',
  },
  'sunny-cold': {
    label: 'Dia ensolarado e frio',
    emoji: '🌤️',
    image: '/images/weather/sunny-cold.jpg',
  },
  rainy: {
    label: 'Dia de chuva',
    emoji: '🌧️',
    image: '/images/weather/rainy.jpg',
  },
  stormy: {
    label: 'Dia de tempestade',
    emoji: '⛈️',
    image: '/images/weather/stormy.jpg',
  },
  cloudy: {
    label: 'Dia nublado',
    emoji: '☁️',
    image: '/images/weather/cloudy.jpg',
  },
  snowy: {
    label: 'Dia de neve',
    emoji: '❄️',
    image: '/images/weather/snowy.jpg',
  },
}

const config = computed(() => SCENARIO_CONFIG[props.scenario])
const imageSrc = computed(() => config.value.image)
const label = computed(() => config.value.label)
const emoji = computed(() => config.value.emoji)
</script>

<style scoped>
.weather-scene {
  width: 100%;
  height: 220px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.weather-scene__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.weather-scene__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.weather-scene__emoji {
  font-size: 4rem;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.weather-scene__label {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.weather-scene__hint {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 0 16px;
}

.weather-scene__hint code {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* Gradients per scenario */
.weather-scene--sunny-hot .weather-scene__placeholder {
  background: linear-gradient(135deg, #ff6b35, #f7b731, #ffd700);
}
.weather-scene--sunny-cold .weather-scene__placeholder {
  background: linear-gradient(135deg, #1e3c72, #4facfe, #a8edea);
}
.weather-scene--rainy .weather-scene__placeholder {
  background: linear-gradient(135deg, #0d1b2a, #1565c0, #546e7a);
}
.weather-scene--stormy .weather-scene__placeholder {
  background: linear-gradient(135deg, #0a0015, #2d1b69, #37474f);
}
.weather-scene--cloudy .weather-scene__placeholder {
  background: linear-gradient(135deg, #3d3d3d, #607d8b, #90a4ae);
}
.weather-scene--snowy .weather-scene__placeholder {
  background: linear-gradient(135deg, #1a237e, #7986cb, #e8eaf6);
}
</style>
