// The API returns eras unordered (alphabetically, as it happens). The UI needs
// them chronologically, and calls "Modern" by its friendlier label.
export const ERA_ORDER = ['Ancient', 'Medieval', '1500s', '1700s', '1800s', 'Modern']

export const ERA_LABELS = { Modern: 'Today' }

export function eraLabel(era) {
  return ERA_LABELS[era] ?? era
}

export function sortEras(eras) {
  return [...eras].sort((a, b) => {
    const ai = ERA_ORDER.indexOf(a)
    const bi = ERA_ORDER.indexOf(b)
    // Anything the frontend doesn't know about goes last, alphabetically.
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}
