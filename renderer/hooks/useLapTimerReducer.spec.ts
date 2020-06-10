import { renderHook, act } from '@testing-library/react-hooks'
import { useLapTimerReducer } from './useLapTimerReducer'

describe('useLapTimerReducer', () => {
  const lapInfos = [
    { label: 'agenda1', second: 60 },
    { label: 'agenda2', second: 30 },
    { label: 'agenda3', second: 40 },
  ]

  it('should behave lap timer', () => {
    const { result } = renderHook(() => useLapTimerReducer(lapInfos))

    expect(result.current.state).toEqual({
      elapsedSecond: 0,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 60 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 60,
      totalRemainSecond: 130,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 1 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 1,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 59 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 59,
      totalRemainSecond: 129,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 1 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 2,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 58,
      totalRemainSecond: 128,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 2,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 88,
      totalRemainSecond: 128,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 4,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 86,
      totalRemainSecond: 126,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 4,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 126,
      totalRemainSecond: 126,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 6 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 10,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      idealLapRemainSecond: 120,
      totalRemainSecond: 120,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 10,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      idealLapRemainSecond: 120,
      totalRemainSecond: 120,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 12,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 12,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'undo' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 12,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 32 },
      ],
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 14,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 30 },
      ],
      idealLapRemainSecond: 116,
      totalRemainSecond: 116,
    })

    act(() => {
      result.current.dispatch({ type: 'undo' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 14,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 18 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 76,
      totalRemainSecond: 116,
    })

    act(() => {
      result.current.dispatch({ type: 'reset' })
    })
    expect(result.current.state).toEqual({
      elapsedSecond: 0,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 60 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      idealLapRemainSecond: 60,
      totalRemainSecond: 130,
    })
  })
})
