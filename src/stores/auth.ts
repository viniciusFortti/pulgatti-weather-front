import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import type { LoginRequest, RegisterRequest, AuthUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<AuthUser | null>(
    JSON.parse(localStorage.getItem('auth_user') ?? 'null'),
  )

  const isAuthenticated = computed(() => !!token.value)

  function setSession(newToken: string, newUser: AuthUser) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('auth_token', newToken)
    localStorage.setItem('auth_user', JSON.stringify(newUser))
  }

  function clearSession() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  async function login(credentials: LoginRequest) {
    const response = await authService.login(credentials)
    setSession(response.token, response.user)
  }

  async function register(data: RegisterRequest) {
    await authService.register(data)
  }

  function logout() {
    clearSession()
  }

  return { token, user, isAuthenticated, login, register, logout }
})
