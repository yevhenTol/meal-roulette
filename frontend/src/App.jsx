import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import LoadingCard from './components/LoadingCard'
import MealCard from './components/MealCard'
import { fetchCountries, fetchEras, fetchMeal } from './api'
import { MOCK_ERAS } from './mockMeals'

// Keep the spin visible even when the API answers instantly.
const MIN_SPIN_MS = 1500

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
  const [country, setCountry] = useState('')
  const [era, setEra] = useState('1500s')
  const [eras, setEras] = useState(MOCK_ERAS)
  const [countries, setCountries] = useState([])

  const [status, setStatus] = useState('idle') // idle | loading | done | empty | error
  const [meal, setMeal] = useState(null)
  const [pending, setPending] = useState(null) // filters shown on the loading card

  // Ignore results from a spin the user has already superseded.
  const spinId = useRef(0)

  useEffect(() => {
    fetchEras().then((list) => {
      if (Array.isArray(list) && list.length) setEras(list)
    })
    fetchCountries().then((list) => {
      if (Array.isArray(list)) setCountries(list)
    })
  }, [])

  async function spin(filters) {
    const id = ++spinId.current
    setPending(filters)
    setStatus('loading')

    try {
      const [result] = await Promise.all([fetchMeal(filters), wait(MIN_SPIN_MS)])
      if (id !== spinId.current) return
      if (result) {
        setMeal(result)
        setStatus('done')
      } else {
        setMeal(null)
        setStatus('empty')
      }
    } catch {
      if (id !== spinId.current) return
      setStatus('error')
    }
  }

  const busy = status === 'loading'

  return (
    <div className="page">
      <main className="shell">
        <Header />

        <Controls
          country={country}
          onCountryChange={setCountry}
          era={era}
          onEraChange={setEra}
          eras={eras}
          busy={busy}
          onSpin={() => spin({ country: country.trim(), era })}
          onSurprise={() => spin({})}
        />

        <datalist id="country-suggestions">
          {countries.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>

        {status === 'loading' && (
          <LoadingCard country={pending?.country} era={pending?.era} />
        )}

        {status === 'done' && meal && (
          <MealCard
            meal={meal}
            busy={busy}
            onSpinAgain={() => spin(pending ?? {})}
          />
        )}

        {status === 'empty' && (
          <section className="notice">
            <p>
              Nothing in the archive for that pairing yet. Try another country or
              era — or hit <strong>Surprise me</strong>.
            </p>
          </section>
        )}

        {status === 'error' && (
          <section className="notice">
            <p>Something went wrong reaching the kitchen. Give it another spin.</p>
          </section>
        )}
      </main>
    </div>
  )
}
