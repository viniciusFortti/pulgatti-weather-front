import { api } from './api'
import type { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '@/types'

export const authService = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthUser>('/auth/register', data),
}
