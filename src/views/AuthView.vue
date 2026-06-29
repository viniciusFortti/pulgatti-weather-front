<template>
  <div class="auth-view">
    <div class="auth-card">
      <div class="auth-card__brand">
        <div class="auth-card__logo" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="9" fill="white" opacity="0.95" />
            <g stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.95">
              <line x1="20" y1="5" x2="20" y2="10" />
              <line x1="20" y1="30" x2="20" y2="35" />
              <line x1="5" y1="20" x2="10" y2="20" />
              <line x1="30" y1="20" x2="35" y2="20" />
              <line x1="9.4" y1="9.4" x2="13" y2="13" />
              <line x1="27" y1="27" x2="30.6" y2="30.6" />
              <line x1="30.6" y1="9.4" x2="27" y2="13" />
              <line x1="13" y1="27" x2="9.4" y2="30.6" />
            </g>
            <g fill="white" opacity="0.92">
              <circle cx="22" cy="34" r="7" />
              <circle cx="30" cy="30" r="9" />
              <circle cx="39" cy="34" r="6.5" />
              <rect x="15" y="34" width="30" height="10" />
            </g>
          </svg>
        </div>
        <h1 class="auth-card__title">Pulgatti Weather</h1>
        <p class="auth-card__subtitle">Previsão do tempo na palma da mão</p>
      </div>

      <div class="auth-card__tabs" role="tablist">
        <button
          role="tab"
          :aria-selected="activeTab === 'login'"
          :class="['tab-btn', { 'tab-btn--active': activeTab === 'login' }]"
          @click="switchTab('login')"
        >
          Entrar
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'register'"
          :class="['tab-btn', { 'tab-btn--active': activeTab === 'register' }]"
          @click="switchTab('register')"
        >
          Cadastrar
        </button>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
        <!-- Nome — apenas no cadastro -->
        <div v-if="activeTab === 'register'" class="auth-form__field">
          <label class="auth-form__label" for="name">Nome completo</label>
          <div class="auth-form__input-wrapper">
            <svg viewBox="0 0 20 20" class="field-icon"><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 17c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="auth-form__input"
              placeholder="Seu nome"
              autocomplete="name"
              required
            />
          </div>
        </div>

        <!-- E-mail -->
        <div class="auth-form__field">
          <label class="auth-form__label" for="email">E-mail</label>
          <div class="auth-form__input-wrapper">
            <svg viewBox="0 0 20 20" class="field-icon"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><polyline points="2,4 10,11 18,4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="auth-form__input"
              placeholder="seu@email.com"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <!-- Senha -->
        <div class="auth-form__field">
          <label class="auth-form__label" for="password">Senha</label>
          <div class="auth-form__input-wrapper">
            <svg viewBox="0 0 20 20" class="field-icon"><rect x="3" y="9" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="auth-form__input"
              placeholder="Sua senha"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="auth-form__eye"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" viewBox="0 0 20 20"><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
              <svg v-else viewBox="0 0 20 20"><path d="M3 3l14 14M8.9 4.2A8.5 8.5 0 0 1 10 4c6 0 9 6 9 6a17 17 0 0 1-2.4 3.1M5.5 5.5A17 17 0 0 0 1 10s3 6 9 6a8.4 8.4 0 0 0 4.6-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="auth-form__error" role="alert">
          <svg viewBox="0 0 16 16" class="error-icon"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="8" y1="5" x2="8" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.5" r="0.75" fill="currentColor"/></svg>
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="auth-form__success" role="status">
          {{ successMessage }}
        </p>

        <button class="auth-form__submit" type="submit" :disabled="isLoading">
          <span v-if="isLoading" class="btn-spinner" />
          <span v-else>{{ activeTab === 'login' ? 'Entrar' : 'Criar conta' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

type Tab = 'login' | 'register'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref<Tab>('login')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({ name: '', email: '', password: '' })

function switchTab(tab: Tab) {
  activeTab.value = tab
  errorMessage.value = ''
  successMessage.value = ''
  form.name = ''
  form.email = ''
  form.password = ''
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.email.trim() || !form.password.trim()) {
    errorMessage.value = 'Preencha e-mail e senha.'
    return
  }

  if (activeTab.value === 'register' && !form.name.trim()) {
    errorMessage.value = 'Preencha seu nome.'
    return
  }

  isLoading.value = true
  try {
    if (activeTab.value === 'login') {
      await authStore.login({ email: form.email, password: form.password })
      router.push('/')
    } else {
      await authStore.register({ name: form.name, email: form.email, password: form.password })
      successMessage.value = 'Conta criada! Faça login para continuar.'
      switchTab('login')
    }
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, #0f172a, #1e3a5f, #0d3b6e);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  padding: 40px 36px;
  color: white;
}

.auth-card__brand {
  text-align: center;
  margin-bottom: 32px;
}

.auth-card__logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
}

.auth-card__title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.auth-card__subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.auth-card__tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 28px;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.tab-btn--active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-form__label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.auth-form__input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 0 14px;
  gap: 10px;
  transition: border-color 0.2s;
}

.auth-form__input-wrapper:focus-within {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.12);
}

.field-icon {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
}

.auth-form__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 0.95rem;
  padding: 14px 0;
}

.auth-form__input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.auth-form__eye {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.45);
  padding: 4px;
  display: flex;
  align-items: center;
}

.auth-form__eye svg {
  width: 18px;
  height: 18px;
}

.auth-form__error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #fca5a5;
  font-size: 0.88rem;
  margin: 0;
}

.error-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.auth-form__success {
  padding: 12px 14px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 10px;
  color: #86efac;
  font-size: 0.88rem;
  margin: 0;
}

.auth-form__submit {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition:
    opacity 0.2s,
    transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.auth-form__submit:hover:not(:disabled) {
  opacity: 0.9;
}

.auth-form__submit:active:not(:disabled) {
  transform: scale(0.98);
}

.auth-form__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
