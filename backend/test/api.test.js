import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.MEALS_PATH = path.join(__dirname, "fixture-meals.json");

const { app } = await import("../server.js");

let base;
let server;

test.before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://localhost:${server.address().port}`;
});

test.after(() => server.close());

const FIXTURE_IDS = ["france-pot-au-feu", "france-galette", "egypt-emmer-bread"];

test("GET /api/health reports the loaded meal count", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, mealsLoaded: 3 });
});

test("GET /api/countries returns a sorted, de-duplicated list", async () => {
  const res = await fetch(`${base}/api/countries`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), ["Egypt", "France"]);
});

test("GET /api/eras returns a sorted, de-duplicated list", async () => {
  const res = await fetch(`${base}/api/eras`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), ["1700s", "Ancient", "Medieval"]);
});

test("GET /api/meals/random returns one meal from the dataset", async () => {
  const res = await fetch(`${base}/api/meals/random`);
  assert.equal(res.status, 200);
  const meal = await res.json();
  assert.ok(FIXTURE_IDS.includes(meal.id));
});

test("GET /api/meals filters by country (case-insensitive)", async () => {
  const res = await fetch(`${base}/api/meals?country=france`);
  assert.equal(res.status, 200);
  const meal = await res.json();
  assert.equal(meal.country, "France");
});

test("GET /api/meals filters by country and era together", async () => {
  const res = await fetch(`${base}/api/meals?country=France&era=1700s`);
  assert.equal(res.status, 200);
  const meal = await res.json();
  assert.equal(meal.id, "france-pot-au-feu");
});

test("GET /api/meals returns 404 when no meal matches the filter", async () => {
  const res = await fetch(`${base}/api/meals?country=France&era=Ancient`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "No meals found for that filter" });
});

test("GET /api/meals returns 404 for an unknown country", async () => {
  const res = await fetch(`${base}/api/meals?country=Atlantis`);
  assert.equal(res.status, 404);
});
