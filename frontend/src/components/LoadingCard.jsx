import { useEffect, useState } from 'react'

const SCENES = [
  'a street cart',
  'a farmhouse table',
  'a monastery kitchen',
  'a harbour tavern',
  'a market stall',
  'a shared wooden bowl',
]

export default function LoadingCard({ country, era }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => i + 1), 700)
    return () => clearInterval(timer)
  }, [])

  const scene = SCENES[index % SCENES.length]

  return (
    <section className="loading-card" aria-live="polite">
      <p className="loading-country">{country || 'Somewhere'}</p>
      <p className="loading-era">{era || 'Sometime'}</p>
      <p key={scene} className="loading-scene">
        {scene}
      </p>
      <p className="loading-status">Looking for dinner</p>
    </section>
  )
}
