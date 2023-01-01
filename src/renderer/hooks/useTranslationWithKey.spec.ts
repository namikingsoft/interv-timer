import { renderHook } from '@testing-library/react'
import { useTranslationWithKey } from './useTranslationWithKey'

describe('useLapTimerReducer', () => {
  it('should behave lap timer', () => {
    const {
      result: {
        current: { t, k },
      },
    } = renderHook(() => useTranslationWithKey())

    expect(k.total).toBe('total')
    expect(k.margin).toBe('margin')
    expect(t(k.total)).toBe('total') // TODO: Total in case of en
    expect(t(k.margin)).toBe('margin') // TODO: Margin in case of en
  })
})
