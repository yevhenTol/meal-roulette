// The API uses "Modern"; the UI calls it "Today".
const ERA_LABELS = { Modern: 'Today' }

export default function Controls({
  country,
  onCountryChange,
  era,
  onEraChange,
  eras,
  busy,
  onSpin,
  onSurprise,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSpin()
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="country">
        Country or region
      </label>
      <input
        id="country"
        className="text-input"
        type="text"
        value={country}
        onChange={(event) => onCountryChange(event.target.value)}
        placeholder="Georgia, Peru, anywhere…"
        autoComplete="off"
        list="country-suggestions"
      />

      <div className="era-row" role="group" aria-label="Era">
        {eras.map((value) => (
          <button
            key={value}
            type="button"
            className={`pill${value === era ? ' pill--active' : ''}`}
            aria-pressed={value === era}
            onClick={() => onEraChange(value === era ? '' : value)}
          >
            {ERA_LABELS[value] ?? value}
          </button>
        ))}
      </div>

      <div className="action-row">
        <button type="submit" className="btn btn--primary" disabled={busy}>
          Spin
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onSurprise}
          disabled={busy}
        >
          Surprise me
        </button>
      </div>
    </form>
  )
}
