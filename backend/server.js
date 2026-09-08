import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEALS_PATH = path.join(__dirname, "meals.json");

const app = express();
app.use(cors());

function loadMeals() {
  if (!fs.existsSync(MEALS_PATH)) return [];
  return JSON.parse(fs.readFileSync(MEALS_PATH, "utf-8"));
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

app.get("/api/meals", (req, res) => {
  const { country, era } = req.query;
  let meals = loadMeals();

  if (country) {
    meals = meals.filter(
      (m) => m.country.toLowerCase() === String(country).toLowerCase()
    );
  }
  if (era) {
    meals = meals.filter(
      (m) => m.era.toLowerCase() === String(era).toLowerCase()
    );
  }

  if (meals.length === 0) {
    return res.status(404).json({ error: "No meals found for that filter" });
  }

  res.json(pickRandom(meals));
});

app.get("/api/meals/random", (_req, res) => {
  const meals = loadMeals();
  if (meals.length === 0) {
    return res.status(404).json({ error: "No meals available" });
  }
  res.json(pickRandom(meals));
});

app.get("/api/countries", (_req, res) => {
  const meals = loadMeals();
  res.json([...new Set(meals.map((m) => m.country))].sort());
});

app.get("/api/eras", (_req, res) => {
  const meals = loadMeals();
  res.json([...new Set(meals.map((m) => m.era))].sort());
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mealsLoaded: loadMeals().length });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Meal Roulette API running on http://localhost:${PORT}`);
});
