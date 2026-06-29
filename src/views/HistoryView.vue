<template>
  <div class="history-view">
    <div class="history-view__container">
      <div class="history-view__header">
        <h1 class="history-view__title">Histórico de buscas</h1>
        <p class="history-view__subtitle">Suas últimas pesquisas de previsão do tempo</p>
      </div>

      <LoadingSpinner v-if="isLoading" message="Carregando histórico..." />

      <div v-else-if="error" class="history-view__error">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="loadHistory">Tentar novamente</button>
      </div>

      <div v-else-if="entries.length === 0" class="history-view__empty">
        <svg viewBox="0 0 64 64" class="empty-icon" fill="none">
          <circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="2" opacity="0.4" />
          <polyline points="32,18 32,32 40,40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
          <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6" />
        </svg>
        <p class="empty-text">Nenhum histórico encontrado</p>
        <p class="empty-sub">Faça uma busca de previsão do tempo para começar</p>
        <RouterLink to="/" class="go-home-btn">Ir para a previsão</RouterLink>
      </div>

      <HistoryList v-else :entries="entries" @select="goToWeather" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { historyService } from '@/services/historyService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import HistoryList from '@/components/HistoryList.vue'
import type { HistoryEntry } from '@/types'

const router = useRouter()

const entries = ref<HistoryEntry[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function loadHistory() {
  isLoading.value = true
  error.value = null
  try {
    entries.value = await historyService.getHistory()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar histórico'
  } finally {
    isLoading.value = false
  }
}

function goToWeather(city: string) {
  router.push({ path: '/', query: { city } })
}

onMounted(loadHistory)
</script>

<style scoped>
.history-view {
  min-height: calc(100vh - 64px);
  padding: 32px 16px 48px;
}

.history-view__container {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.history-view__header {
  color: white;
}

.history-view__title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.history-view__subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.history-view__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
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
  background: rgba(255, 255, 255, 0.18);
}

.history-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 64px 24px;
  text-align: center;
  color: white;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: rgba(255, 255, 255, 0.5);
}

.empty-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.85);
}

.empty-sub {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

.go-home-btn {
  margin-top: 8px;
  padding: 11px 28px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s;
}

.go-home-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}
</style>
