# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Meal Roulette: pick a country and/or historical era, hit "Surprise Me", and get a randomly generated meal from a curated dataset (no LLM calls at runtime).

## Status

This repo is currently just a scaffold (`README.md`, empty `frontend/` and `backend/` directories) — no build tooling, dependencies, or source files exist yet. There are no build/lint/test commands to run until a `package.json` is added to `frontend/` and `backend/`.

## Intended architecture

- `backend/` — Node + Express API that filters/randomizes entries from `backend/meals.json` (a static dataset, no database)
- `frontend/` — React (Vite) or vanilla HTML/JS/CSS UI that calls the backend API

### API contract (see README.md for full details)

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

When generating `backend/meals.json`, preserve historical accuracy for era-country pairings (e.g. no potatoes/tomatoes in pre-1500s European dishes — they arrived in Europe after the Columbian exchange).

## Ownership split (hackathon team of 4)

| Area | Owns |
|---|---|
| Frontend shell | Selectors, "Surprise Me" button, page layout — build against mock JSON before the backend exists |
| Dataset + API | `backend/meals.json` and the Express routes above |
| Result UI | Result card + reveal animation (spin/flip) — build against a hardcoded sample meal object |
| Integration | Meal-history log, map/flag visual, then wiring frontend to the real backend API and deploying |

Keep the frontend and dataset/API work decoupled: the frontend should be able to run against a hardcoded/mock meal object without the backend running.
