cat > CLAUDE.md << 'EOF'

# pulgatti-weather-front

Frontend Vue 3 para o projeto pulgatti-weather.

## Stack

- Vue 3 + Composition API
- Vite
- Vue Router
- Pinia (state management)

## Backend API

- Base URL: `http://localhost:8080` (dev) / variável `VITE_API_BASE_URL` (prod)
- Auth: JWT Bearer token no header `Authorization: Bearer <token>`

## Endpoints

### Auth

- `POST /auth/register` — cadastro de usuário
  - Body: `{ "username": string, "password": string }`
- `POST /auth/login` — login
  - Body: `{ "username": string, "password": string }`
  - Response: `{ "token": string }`

### Weather

- `GET /weather?city={city}` — busca previsão do tempo por cidade
  - Header: Authorization obrigatório
  - Response: dados de previsão do Open-Meteo

### Cities

- `GET /cities?name={name}` — busca coordenadas de cidades

### History

- `GET /history` — histórico de buscas do usuário autenticado
  - Header: Authorization obrigatório

## Observações

- Token JWT expira em 60 minutos
- Histórico de buscas é registrado via Kafka de forma assíncrona
- Cache de previsão do tempo dura 24h (Redis)
- Todas as rotas exceto `/auth/**` exigem autenticação
  EOF
