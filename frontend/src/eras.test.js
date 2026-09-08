import { describe, it, expect } from 'vitest'
import { eraLabel, sortEras, ERA_ORDER } from './eras'

describe('eraLabel', () => {
  it('renames Modern to Today', () => {
    expect(eraLabel('Modern')).toBe('Today')
  })

  it('passes through eras with no custom label', () => {
    expect(eraLabel('1500s')).toBe('1500s')
    expect(eraLabel('Ancient')).toBe('Ancient')
  })
})

describe('sortEras', () => {
  it('orders known eras chronologically regardless of input order', () => {
    const input = ['Modern', 'Ancient', '1700s', 'Medieval', '1500s', '1800s']
    expect(sortEras(input)).toEqual(ERA_ORDER)
  })

  it('does not mutate the input array', () => {
    const input = ['Modern', 'Ancient']
    sortEras(input)
    expect(input).toEqual(['Modern', 'Ancient'])
  })

  it('puts unknown eras last, sorted alphabetically among themselves', () => {
    expect(sortEras(['Zephyr', 'Ancient', 'Byzantine'])).toEqual([
      'Ancient',
      'Byzantine',
      'Zephyr',
    ])
  })
})
