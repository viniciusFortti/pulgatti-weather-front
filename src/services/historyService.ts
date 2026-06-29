import { api } from './api'
import type { HistoryEntry } from '@/types'

export const historyService = {
  getHistory: () => api.get<HistoryEntry[]>('/search-history'),
}
