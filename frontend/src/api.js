import { MOCK_COUNTRIES, MOCK_ERAS, MOCK_MEALS } from './mockMeals'

const BASE = import.meta.env.VITE_API_URL ?? '/api'

// Flips to true only when the backend is unreachable, so we stop hammering a
// server that isn't running and stay in mock mode for the rest of the session.
let offline = false

export function isOffline() {
  return offline
}

class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`)
    this.status = status
  }
}

async function get(path) {
  let res
  try {
    res = await fetch(`${BASE}${path}`)
  } catch (cause) {
    // Network-level failure: the backend isn't up.
    throw new Error('unreachable', { cause })
  }
  // An HTTP error means the backend IS up and answered — never treat it as
  // offline, or one legitimate 404 would strand the app in mock mode.
  if (!res.ok) throw new HttpError(res.status)
  return res.json()
}

// Try the real API; fall back to mock data only if the backend is unreachable.
async function withFallback(request, fallback) {
  if (offline) return fallback()
  try {
    return await request()
  } catch (error) {
    if (error instanceof HttpError) throw error
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

export async function fetchCountries() {
  try {
    return await withFallback(() => get('/countries'), () => MOCK_COUNTRIES)
  } catch {
    return MOCK_COUNTRIES
  }
}

export async function fetchEras() {
  try {
    return await withFallback(() => get('/eras'), () => MOCK_ERAS)
  } catch {
    return MOCK_ERAS
  }
}

/**
 * GET /api/meals?country=&era=  — filtered
 * GET /api/meals/random         — no filters
 *
 * Resolves to null when nothing matches (the backend answers 404 for an empty
 * filter result); rejects only on a real server error.
 */
export async function fetchMeal({ country, era } = {}) {
  const params = new URLSearchParams()
  if (country) params.set('country', country)
  if (era) params.set('era', era)
  const path = params.toString() ? `/meals?${params}` : '/meals/random'

  try {
    return await withFallback(
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
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) return null
    throw error
  }
}
