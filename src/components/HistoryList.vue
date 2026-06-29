<template>
  <div class="history-list">
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="history-item glass-card"
      role="button"
      tabindex="0"
      @click="$emit('select', entry.searchedCity)"
      @keydown.enter="$emit('select', entry.searchedCity)"
    >
      <div class="history-item__icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z" stroke="currentColor" stroke-width="1.5"/><polyline points="10,6 10,10 13,13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <div class="history-item__info">
        <span class="history-item__city">{{ entry.searchedCity }}</span>
        <span class="history-item__date">{{ formatEntryDate(entry) }}</span>
      </div>
      <div class="history-item__action" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><polyline points="6,3 11,8 6,13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryEntry } from '@/types'

defineProps<{
  entries: HistoryEntry[]
}>()

defineEmits<{
  select: [city: string]
}>()

function formatEntryDate(entry: HistoryEntry): string {
  const raw = entry.searchedAt
  if (!raw) return ''
  return new Date(raw).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  color: white;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;
}

.history-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.18) !important;
}

.history-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.history-item__icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.history-item__icon svg {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.history-item__info {
  flex: 1;
  min-width: 0;
}

.history-item__city {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item__date {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 2px;
}

.history-item__action {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.history-item__action svg {
  width: 100%;
  height: 100%;
}
</style>
