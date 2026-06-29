const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080') + '/api'

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function handleUnauthorized(): never {
  localStorage.removeItem('auth_token')
  window.location.href = '/login'
  throw new Error('Sessão expirada. Faça login novamente.')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(options.headers as Record<string, string>),
    },
  })

  if (response.status === 401) {
    return handleUnauthorized()
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    let message = `Erro ${response.status}`
    if (errorText) {
      try {
        const body = JSON.parse(errorText)
        message = body.detail ?? body.message ?? message
      } catch {
        message = errorText
      }
    }
    throw new Error(message)
  }

  const text = await response.text()
  return text ? (JSON.parse(text) as T) : ({} as T)
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}
