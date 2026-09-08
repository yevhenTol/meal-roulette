# Meal Roulette

Pick a country and/or era, hit "Surprise Me", and get a randomly generated historical/regional meal.

## Stack
- Frontend: `frontend/` — React (Vite) or vanilla HTML/JS+CSS
- Backend: `backend/` — Node + Express, serving `meals.json`
- Data: `backend/meals.json` — single source of truth, no database

## API contract

```
GET /api/meals?country=France&era=1500s   → single meal object
GET /api/meals/random                      → single meal object
GET /api/countries                         → list of available countries
GET /api/eras                              → list of available eras
```

Meal object shape:
```json
{
  "id": "kebab-case-unique-id",
  "country": "Country name",
  "era": "Ancient | Medieval | 1500s | 1700s | 1800s | Modern",
  "dishName": "Name of the dish",
  "description": "1-2 sentence description",
  "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"],
  "funFact": "One surprising historical/cultural fact",
  "emoji": "🥘"
}
```

## Team split

| Dev | Owns | Blocks on |
|---|---|---|
| A | Frontend shell — selectors, "Surprise Me" button, page layout | Nobody — build against mock JSON first |
| B | `meals.json` dataset + Express API routes | Nobody — start immediately |
| C | Result card + reveal animation (spin/flip) | Nobody — build against a hardcoded sample meal object |
| D | Meal-history log, map/flag visual, then final integration + deploy | Integrates A+B+C in the last 20-30 min |

## Timeline (60 min)
- 0-5 min: confirm API contract (this doc) — done
- 5-40 min: parallel build
- 40-50 min: Dev D integrates, swaps mocks for real API calls
- 50-60 min: bug bash, deploy, demo run-through

## Generating the dataset

Paste this into Claude Code in `backend/`:

> Create a file `meals.json` for a "Meal Roulette" hackathon website. It should contain
> an array of 30 meal objects covering a mix of countries and historical eras, so the
> site can filter/randomize by country and/or era.
>
> Each object must follow this exact shape:
> { "id": "kebab-case-unique-id", "country": "Country name", "era": "one of: Ancient, Medieval, 1500s, 1700s, 1800s, Modern", "dishName": "Name of the dish", "description": "1-2 sentence description of the dish and how it was/is eaten", "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"], "funFact": "One surprising or interesting historical/cultural fact about this dish", "emoji": "single emoji that best represents the dish" }
>
> Requirements:
> - Cover at least 10 different countries (mix of Europe, Asia, Africa, Americas, Middle East)
> - Cover all 6 eras listed above, with at least 3-4 dishes per era
> - Historical accuracy matters where possible — real dishes tied to real periods (e.g. potatoes/tomatoes should NOT appear in pre-1500s European dishes, since they weren't introduced to Europe until after the Columbian exchange)
> - Keep descriptions and fun facts punchy and demo-friendly
> - Ensure all "id" values are unique
> - Output ONLY valid JSON — a top-level array of these objects, no markdown fences, no commentary
> - Save it to meals.json in the project root
