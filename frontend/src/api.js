import { MOCK_COUNTRIES, MOCK_ERAS, MOCK_MEALS } from './mockMeals'

const BASE = import.meta.env.VITE_API_URL ?? '/api'

// Flips to true the first time a request fails, so we stop hammering a backend
// that isn't running and stay in mock mode for the rest of the session.
let offline = false

export function isOffline() {
  return offline
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

// Try the real API; fall back to mock data if the backend isn't up yet.
async function withFallback(request, fallback) {
  if (offline) return fallback()
  try {
    return await request()
  } catch {
    offline = true
    return fallback()
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// The contract says a single meal object, but tolerate an array so integration
// doesn't block on which shape the backend lands on.
function asMeal(payload) {
  if (Array.isArray(payload)) {
    if (payload.length === 0) return null
    return pickRandom(payload)
  }
  return payload ?? null
}

export function fetchCountries() {
  return withFallback(() => get('/countries'), () => MOCK_COUNTRIES)
}

export function fetchEras() {
  return withFallback(() => get('/eras'), () => MOCK_ERAS)
}

/**
 * GET /api/meals?country=&era=  — filtered
 * GET /api/meals/random         — no filters
 */
export function fetchMeal({ country, era } = {}) {
  const params = new URLSearchParams()
  if (country) params.set('country', country)
  if (era) params.set('era', era)
  const path = params.toString() ? `/meals?${params}` : '/meals/random'

  return withFallback(
    async () => asMeal(await get(path)),
    () => {
      const matches = MOCK_MEALS.filter(
        (meal) =>
          (!country || meal.country.toLowerCase() === country.toLowerCase()) &&
          (!era || meal.era === era),
      )
      return matches.length ? pickRandom(matches) : null
    },
  )
}
