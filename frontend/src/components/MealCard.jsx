const ERA_LABELS = { Modern: 'Today' }

export default function MealCard({ meal, onSpinAgain, busy }) {
  const { country, era, dishName, emoji, description, keyIngredients, funFact } = meal

  return (
    <section className="meal-card">
      <p className="meal-eyebrow">
        {country} · {ERA_LABELS[era] ?? era}
      </p>
      <h2 className="meal-title">{dishName}</h2>
      {emoji && (
        <p className="meal-emoji" aria-hidden="true">
          {emoji}
        </p>
      )}

      <p className="meal-description">{description}</p>

      {keyIngredients?.length > 0 && (
        <>
          <hr className="meal-rule" />
          <ul className="ingredients">
            {keyIngredients.map((ingredient) => (
              <li key={ingredient} className="ingredient">
                {ingredient}
              </li>
            ))}
          </ul>
        </>
      )}

      {funFact && <blockquote className="fun-fact">{funFact}</blockquote>}

      <p className="meal-source">
        <span className="dot" aria-hidden="true" />
        Reconstructed from sources
      </p>

      <button
        type="button"
        className="btn btn--dark"
        onClick={onSpinAgain}
        disabled={busy}
      >
        Spin again
      </button>
    </section>
  )
}
