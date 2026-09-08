import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MOCK_COUNTRIES, MOCK_ERAS, MOCK_MEALS } from './mockMeals'

// api.js keeps module-level `offline` state, so re-import a fresh copy per test.
async function freshApi() {
  vi.resetModules()
  return import('./api.js')
}

function jsonResponse(body, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => body }
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchCountries / fetchEras', () => {
  it('returns the backend payload when the request succeeds', async () => {
    fetch.mockResolvedValueOnce(jsonResponse(['Egypt', 'France']))
    const { fetchCountries } = await freshApi()
    expect(await fetchCountries()).toEqual(['Egypt', 'France'])
  })

  it('falls back to mock data when the backend is unreachable', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'))
    const { fetchEras, isOffline } = await freshApi()
    expect(await fetchEras()).toEqual(MOCK_ERAS)
    expect(isOffline()).toBe(true)
  })

  it('stays in mock mode for later calls once offline', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const { fetchCountries } = await freshApi()
    await fetchCountries()
    // No second rejection queued; if it hit the network this would throw.
    expect(await fetchCountries()).toEqual(MOCK_COUNTRIES)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

describe('fetchMeal', () => {
  it('hits /meals/random when no filters are given', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ id: 'x', country: 'France', era: 'Modern' }))
    const { fetchMeal } = await freshApi()
    const meal = await fetchMeal()
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/meals/random'))
    expect(meal.id).toBe('x')
  })

  it('encodes country and era as query params', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ id: 'y' }))
    const { fetchMeal } = await freshApi()
    await fetchMeal({ country: 'France', era: '1700s' })
    const url = fetch.mock.calls[0][0]
    expect(url).toContain('country=France')
    expect(url).toContain('era=1700s')
  })

  it('resolves to a random element when the backend returns an array', async () => {
    fetch.mockResolvedValueOnce(jsonResponse([{ id: 'a' }, { id: 'b' }]))
    const { fetchMeal } = await freshApi()
    const meal = await fetchMeal()
    expect(['a', 'b']).toContain(meal.id)
  })

  it('returns null on a 404 (no match) without throwing', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ error: 'nope' }, { ok: false, status: 404 }))
    const { fetchMeal } = await freshApi()
    expect(await fetchMeal({ country: 'Atlantis' })).toBeNull()
  })

  it('throws on a real server error (500)', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({}, { ok: false, status: 500 }))
    const { fetchMeal } = await freshApi()
    await expect(fetchMeal()).rejects.toThrow(/HTTP 500/)
  })

  it('an HTTP error does not flip the client into offline mode', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({}, { ok: false, status: 404 }))
    const { fetchMeal, isOffline } = await freshApi()
    await fetchMeal({ country: 'Atlantis' })
    expect(isOffline()).toBe(false)
  })

  it('filters the mock dataset when offline', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const { fetchMeal } = await freshApi()
    const meal = await fetchMeal({ country: 'France' })
    const expected = MOCK_MEALS.filter((m) => m.country === 'France')
    expect(expected.map((m) => m.id)).toContain(meal.id)
  })
})
