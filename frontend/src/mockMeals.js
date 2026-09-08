// Mock dataset so the frontend runs before backend/meals.json exists.
// Same shape as the API contract in README.md.
export const MOCK_ERAS = ['Ancient', 'Medieval', '1500s', '1800s', 'Modern']

export const MOCK_COUNTRIES = [
  'France',
  'Georgia',
  'Peru',
  'Japan',
  'Egypt',
  'Mexico',
  'Italy',
]

export const MOCK_MEALS = [
  {
    id: 'france-1500s-potage-leeks-rye',
    country: 'France',
    era: '1500s',
    dishName: 'Potage of leeks and rye bread',
    description:
      'A thick, dark porridge-soup made by simmering leeks and whatever scraps were available — pork rind, dried peas, a bone — then thickening with stale rye bread torn directly into the pot. This was the daily anchor meal for French peasants and urban laborers, eaten morning and evening from a shared wooden bowl. The bread did double duty as thickener and calorie source, since rye kept longer than wheat and cost less.',
    keyIngredients: ['leeks', 'stale rye bread', 'dried peas', 'pork rind or bone', 'water or thin broth'],
    funFact:
      'In 16th-century France, peasants commonly ate between 1.5 and 2 kilograms of bread per day, meaning potage like this was less a soup and more a vehicle for consuming vast quantities of starch needed to sustain hard physical labor.',
    emoji: '🥣',
  },
  {
    id: 'georgia-medieval-shkmeruli',
    country: 'Georgia',
    era: 'Medieval',
    dishName: 'Chicken in walnut and garlic sauce',
    description:
      'Roasted fowl drowned in a pounded walnut sauce sharpened with garlic, vinegar and blue fenugreek. Served at feast tables where a toastmaster governed the order of drinking and eating.',
    keyIngredients: ['walnuts', 'garlic', 'fenugreek', 'chicken', 'wine vinegar'],
    funFact:
      'Georgian cooks used walnuts the way French cooks later used butter — as the default fat and thickener for almost every sauce.',
    emoji: '🍗',
  },
  {
    id: 'peru-1500s-chuno-stew',
    country: 'Peru',
    era: '1500s',
    dishName: 'Chuño stew with dried llama',
    description:
      'Freeze-dried potatoes rehydrated in a broth of dried llama meat, chili and Andean herbs. A staple of highland households and Inca state storehouses.',
    keyIngredients: ['chuño', 'dried llama meat', 'ají chili', 'quinoa'],
    funFact:
      'Chuño is made by leaving potatoes out to freeze at night and be trampled and sun-dried by day — the result keeps for over a decade.',
    emoji: '🥔',
  },
  {
    id: 'japan-1800s-nigiri-yatai',
    country: 'Japan',
    era: '1800s',
    dishName: 'Edo-style nigiri from a street stall',
    description:
      'Palm-pressed rice topped with fish cured in vinegar or soy, sold two or three pieces at a time from a wooden cart. Closer to a fast snack than a restaurant meal.',
    keyIngredients: ['vinegared rice', 'cured fish', 'soy sauce', 'wasabi'],
    funFact:
      'Early nigiri were roughly three times the size of a modern piece — one was a meal, not a bite.',
    emoji: '🍣',
  },
  {
    id: 'egypt-ancient-bread-beer',
    country: 'Egypt',
    era: 'Ancient',
    dishName: 'Emmer bread with thick barley beer',
    description:
      'Dense flatbread baked in conical clay moulds, eaten with a porridge-like beer strained through reeds. Rations for pyramid workers were issued in exactly these two units.',
    keyIngredients: ['emmer wheat', 'barley', 'dates', 'onions'],
    funFact:
      'Egyptian beer was thick enough to count as food, and workers were often paid in daily jugs of it.',
    emoji: '🍞',
  },
  {
    id: 'mexico-ancient-tamales-nixtamal',
    country: 'Mexico',
    era: 'Ancient',
    dishName: 'Tamales of nixtamalized maize',
    description:
      'Maize soaked in lime water, ground to masa, filled with beans or turkey and steamed in husks. Portable food for markets, temples and long journeys.',
    keyIngredients: ['maize', 'lime (cal)', 'beans', 'turkey', 'chili'],
    funFact:
      'Nixtamalization unlocks niacin in maize — without it, maize-heavy diets cause pellagra, which is exactly what happened in Europe when maize was adopted without the technique.',
    emoji: '🫔',
  },
  {
    id: 'italy-medieval-farro-porridge',
    country: 'Italy',
    era: 'Medieval',
    dishName: 'Farro porridge with salt pork',
    description:
      'Cracked farro simmered slowly with salt pork, cabbage and herbs until it collapsed into a spoonable mass. The everyday meal of Tuscan farming households.',
    keyIngredients: ['farro', 'salt pork', 'cabbage', 'sage'],
    funFact:
      'Roman soldiers had eaten a nearly identical dish a thousand years earlier — the recipe outlived the empire that spread it.',
    emoji: '🍲',
  },
]
