<template>
  <div class="city-search" v-click-outside="closeSuggestions">
    <div class="city-search__input-wrapper">
      <svg viewBox="0 0 20 20" class="city-search__search-icon" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8" fill="none" />
        <line x1="13" y1="13" x2="17" y2="17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        placeholder="Buscar cidade..."
        class="city-search__input"
        autocomplete="off"
        @input="handleInput"
        @keydown.enter.prevent="handleEnter"
        @keydown.down.prevent="moveSelection(1)"
        @keydown.up.prevent="moveSelection(-1)"
        @keydown.escape="closeSuggestions"
      />
      <button
        v-if="query"
        class="city-search__clear"
        aria-label="Limpar busca"
        @click="clearSearch"
      >
        <svg viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <button class="city-search__btn" aria-label="Buscar" @click="searchSelected">
        Buscar
      </button>
    </div>

    <ul v-if="suggestions.length > 0" class="city-search__suggestions" role="listbox">
      <li
        v-for="(city, index) in suggestions"
        :key="city.id ?? city.name"
        role="option"
        :class="['city-search__suggestion', { 'city-search__suggestion--active': index === activeIndex }]"
        @click="selectCity(city)"
        @mouseenter="activeIndex = index"
      >
        <svg viewBox="0 0 16 16" class="suggestion-pin"><path d="M8 1a5 5 0 0 1 5 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 0 1 5-5z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8" cy="6" r="1.5" fill="currentColor"/></svg>
        <span class="suggestion-name">{{ city.name }}</span>
        <span v-if="city.admin1 || city.country" class="suggestion-region">
          {{ [city.admin1, city.country].filter(Boolean).join(', ') }}
        </span>
      </li>
    </ul>

    <p v-if="noResults" class="city-search__empty">Nenhuma cidade encontrada para "{{ query }}"</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cityService } from '@/services/cityService'
import type { City } from '@/types'

const emit = defineEmits<{
  select: [city: string]
}>()

const query = ref('')
const suggestions = ref<City[]>([])
const activeIndex = ref(-1)
const noResults = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

let debounceTimer: ReturnType<typeof setTimeout>

function handleInput() {
  clearTimeout(debounceTimer)
  noResults.value = false
  activeIndex.value = -1

  if (query.value.length < 2) {
    suggestions.value = []
    return
  }

  debounceTimer = setTimeout(fetchSuggestions, 300)
}

async function fetchSuggestions() {
  try {
    const results = await cityService.search(query.value)
    suggestions.value = results.slice(0, 6)
    noResults.value = results.length === 0
  } catch {
    suggestions.value = []
  }
}

function selectCity(city: City) {
  query.value = city.name
  suggestions.value = []
  noResults.value = false
  emit('select', city.name)
}

function handleEnter() {
  const selected = suggestions.value[activeIndex.value]
  if (activeIndex.value >= 0 && selected) {
    selectCity(selected)
  } else if (query.value.trim()) {
    searchSelected()
  }
}

function searchSelected() {
  if (query.value.trim()) {
    suggestions.value = []
    emit('select', query.value.trim())
  }
}

function moveSelection(direction: 1 | -1) {
  const total = suggestions.value.length
  if (total === 0) return
  activeIndex.value = (activeIndex.value + direction + total) % total
}

function clearSearch() {
  query.value = ''
  suggestions.value = []
  noResults.value = false
  inputRef.value?.focus()
}

function closeSuggestions() {
  suggestions.value = []
}

type ClickOutsideElement = HTMLElement & { _clickOutside?: (e: Event) => void }

const vClickOutside = {
  mounted(el: ClickOutsideElement, binding: { value: () => void }) {
    el._clickOutside = (event: Event) => {
      if (!el.contains(event.target as Node)) binding.value()
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: ClickOutsideElement) {
    if (el._clickOutside) {
      document.removeEventListener('click', el._clickOutside)
    }
  },
}
</script>

<style scoped>
.city-search {
  position: relative;
  width: 100%;
}

.city-search__input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 4px 4px 4px 16px;
  gap: 8px;
  transition: border-color 0.2s;
}

.city-search__input-wrapper:focus-within {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

.city-search__search-icon {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.city-search__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1rem;
  padding: 10px 0;
}

.city-search__input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.city-search__clear {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  padding: 4px;
  display: flex;
  align-items: center;
}

.city-search__clear svg {
  width: 14px;
  height: 14px;
}

.city-search__btn {
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
  flex-shrink: 0;
}

.city-search__btn:hover {
  background: white;
  transform: scale(1.02);
}

.city-search__btn:active {
  transform: scale(0.98);
}

.city-search__suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 6px;
  z-index: 200;
}

.city-search__suggestion {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;
  color: rgba(255, 255, 255, 0.85);
}

.city-search__suggestion:hover,
.city-search__suggestion--active {
  background: rgba(255, 255, 255, 0.1);
}

.suggestion-pin {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
}

.suggestion-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.suggestion-region {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  margin-left: auto;
}

.city-search__empty {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  text-align: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  z-index: 200;
}
</style>
