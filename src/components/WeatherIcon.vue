<template>
  <svg
    viewBox="0 0 64 64"
    class="weather-icon"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- Sunny -->
    <template v-if="condition === 'sunny'">
      <circle cx="32" cy="32" r="12" fill="currentColor" />
      <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="32" y1="4" x2="32" y2="13" />
        <line x1="32" y1="51" x2="32" y2="60" />
        <line x1="4" y1="32" x2="13" y2="32" />
        <line x1="51" y1="32" x2="60" y2="32" />
        <line x1="12.1" y1="12.1" x2="18.5" y2="18.5" />
        <line x1="45.5" y1="45.5" x2="51.9" y2="51.9" />
        <line x1="51.9" y1="12.1" x2="45.5" y2="18.5" />
        <line x1="18.5" y1="45.5" x2="12.1" y2="51.9" />
      </g>
    </template>

    <!-- Partly Cloudy -->
    <template v-else-if="condition === 'partly-cloudy'">
      <circle cx="22" cy="22" r="9" fill="#FDB813" />
      <g stroke="#FDB813" stroke-width="2.5" stroke-linecap="round">
        <line x1="22" y1="7" x2="22" y2="13" />
        <line x1="22" y1="31" x2="22" y2="37" />
        <line x1="7" y1="22" x2="13" y2="22" />
        <line x1="31" y1="22" x2="37" y2="22" />
        <line x1="11.6" y1="11.6" x2="15.8" y2="15.8" />
        <line x1="28.2" y1="28.2" x2="32.4" y2="32.4" />
        <line x1="32.4" y1="11.6" x2="28.2" y2="15.8" />
        <line x1="15.8" y1="28.2" x2="11.6" y2="32.4" />
      </g>
      <g fill="white">
        <circle cx="24" cy="46" r="8" />
        <circle cx="34" cy="41" r="10" />
        <circle cx="44" cy="46" r="7" />
        <rect x="16" y="46" width="36" height="10" />
      </g>
    </template>

    <!-- Cloudy -->
    <template v-else-if="condition === 'cloudy'">
      <g fill="currentColor">
        <circle cx="18" cy="34" r="12" />
        <circle cx="32" cy="27" r="15" />
        <circle cx="46" cy="34" r="11" />
        <rect x="6" y="34" width="52" height="14" />
      </g>
    </template>

    <!-- Foggy -->
    <template v-else-if="condition === 'foggy'">
      <g fill="currentColor" opacity="0.65">
        <circle cx="18" cy="28" r="10" />
        <circle cx="30" cy="21" r="13" />
        <circle cx="44" cy="28" r="10" />
        <rect x="8" y="28" width="48" height="12" />
      </g>
      <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="8" y1="46" x2="56" y2="46" />
        <line x1="12" y1="54" x2="52" y2="54" />
        <line x1="16" y1="62" x2="48" y2="62" />
      </g>
    </template>

    <!-- Drizzle -->
    <template v-else-if="condition === 'drizzle'">
      <g fill="currentColor">
        <circle cx="18" cy="30" r="10" />
        <circle cx="30" cy="23" r="13" />
        <circle cx="44" cy="30" r="10" />
        <rect x="8" y="30" width="48" height="12" />
      </g>
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.85">
        <line x1="22" y1="48" x2="20" y2="57" />
        <line x1="34" y1="48" x2="32" y2="57" />
        <line x1="46" y1="48" x2="44" y2="57" />
      </g>
    </template>

    <!-- Rainy -->
    <template v-else-if="condition === 'rainy'">
      <g fill="currentColor">
        <circle cx="17" cy="27" r="10" />
        <circle cx="30" cy="20" r="13" />
        <circle cx="43" cy="27" r="10" />
        <rect x="7" y="27" width="48" height="12" />
      </g>
      <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="16" y1="46" x2="12" y2="58" />
        <line x1="28" y1="46" x2="24" y2="58" />
        <line x1="40" y1="46" x2="36" y2="58" />
        <line x1="22" y1="52" x2="18" y2="64" />
        <line x1="34" y1="52" x2="30" y2="64" />
        <line x1="46" y1="52" x2="42" y2="64" />
      </g>
    </template>

    <!-- Snowy -->
    <template v-else-if="condition === 'snowy'">
      <g fill="currentColor">
        <circle cx="17" cy="27" r="10" />
        <circle cx="30" cy="20" r="13" />
        <circle cx="43" cy="27" r="10" />
        <rect x="7" y="27" width="48" height="12" />
      </g>
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="16" y1="46" x2="16" y2="58" />
        <line x1="10" y1="52" x2="22" y2="52" />
        <line x1="11.5" y1="47.5" x2="20.5" y2="56.5" />
        <line x1="20.5" y1="47.5" x2="11.5" y2="56.5" />
        <line x1="32" y1="46" x2="32" y2="58" />
        <line x1="26" y1="52" x2="38" y2="52" />
        <line x1="27.5" y1="47.5" x2="36.5" y2="56.5" />
        <line x1="36.5" y1="47.5" x2="27.5" y2="56.5" />
        <line x1="48" y1="46" x2="48" y2="58" />
        <line x1="42" y1="52" x2="54" y2="52" />
        <line x1="43.5" y1="47.5" x2="52.5" y2="56.5" />
        <line x1="52.5" y1="47.5" x2="43.5" y2="56.5" />
      </g>
    </template>

    <!-- Stormy -->
    <template v-else-if="condition === 'stormy'">
      <g fill="currentColor">
        <circle cx="16" cy="26" r="12" />
        <circle cx="30" cy="17" r="15" />
        <circle cx="46" cy="26" r="12" />
        <rect x="4" y="26" width="54" height="16" />
      </g>
      <path d="M 36 40 L 25 54 L 33 54 L 20 70 L 42 48 L 34 48 Z" fill="#FFD700" />
    </template>

    <!-- Default fallback: cloud -->
    <template v-else>
      <g fill="currentColor">
        <circle cx="18" cy="34" r="12" />
        <circle cx="32" cy="27" r="15" />
        <circle cx="46" cy="34" r="11" />
        <rect x="6" y="34" width="52" height="14" />
      </g>
    </template>
  </svg>
</template>

<script setup lang="ts">
import type { WeatherConditionType } from '@/types'

defineProps<{
  condition: WeatherConditionType
}>()
</script>

<style scoped>
.weather-icon {
  display: block;
  overflow: visible;
}
</style>
