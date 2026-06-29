<template>
  <header class="app-header">
    <div class="app-header__content">
      <RouterLink to="/" class="app-header__brand">
        <span class="app-header__logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="13" cy="13" r="6" fill="white" opacity="0.9" />
            <g stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.9">
              <line x1="13" y1="3" x2="13" y2="6" />
              <line x1="13" y1="20" x2="13" y2="23" />
              <line x1="3" y1="13" x2="6" y2="13" />
              <line x1="20" y1="13" x2="23" y2="13" />
              <line x1="5.9" y1="5.9" x2="8" y2="8" />
              <line x1="18" y1="18" x2="20.1" y2="20.1" />
              <line x1="20.1" y1="5.9" x2="18" y2="8" />
              <line x1="8" y1="18" x2="5.9" y2="20.1" />
            </g>
            <g fill="white">
              <circle cx="14" cy="22" r="5" />
              <circle cx="20" cy="20" r="6" />
              <circle cx="26" cy="22" r="4.5" />
              <rect x="9" y="22" width="21" height="7" />
            </g>
          </svg>
        </span>
        <span class="app-header__name">Pulgatti Weather</span>
      </RouterLink>

      <nav class="app-header__nav" aria-label="Navegação principal">
        <RouterLink to="/" class="app-header__nav-link" active-class="app-header__nav-link--active">
          <svg viewBox="0 0 20 20" class="nav-icon"><path d="M10 2L2 8v10h6v-5h4v5h6V8L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>
          Previsão
        </RouterLink>
        <RouterLink
          to="/history"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          <svg viewBox="0 0 20 20" class="nav-icon"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/><polyline points="10,6 10,10 13,13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
          Histórico
        </RouterLink>
      </nav>

      <button class="app-header__logout" @click="handleLogout" aria-label="Sair da conta">
        <svg viewBox="0 0 20 20" class="nav-icon"><path d="M13 3H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><polyline points="16,7 19,10 16,13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><line x1="9" y1="10" x2="19" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Sair
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.app-header__content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  flex-shrink: 0;
}

.app-header__logo {
  width: 32px;
  height: 32px;
  display: block;
}

.app-header__name {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.app-header__nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background 0.2s,
    color 0.2s;
}

.app-header__nav-link:hover,
.app-header__nav-link--active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-icon {
  width: 16px;
  height: 16px;
}

.app-header__logout {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.app-header__logout:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

@media (max-width: 520px) {
  .app-header__name {
    display: none;
  }

  .app-header__nav-link span {
    display: none;
  }
}
</style>
