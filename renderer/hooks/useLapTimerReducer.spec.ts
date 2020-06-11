import { renderHook, act } from '@testing-library/react-hooks'
import { useLapTimerReducer } from './useLapTimerReducer'

describe('useLapTimerReducer', () => {
  const lapInfoList = [
    { label: 'agenda1', second: 60 },
    { label: 'agenda2', second: 30 },
    { label: 'agenda3', second: 40 },
  ]

  it('should behave lap timer', () => {
    const { result } = renderHook(() => useLapTimerReducer())

    expect(result.current.state).toEqual({
      lapInfoList: [],
      lapSeconds: [],
      lapRemains: [],
      elapsedSecond: 0,
      idealLapRemainSecond: 0,
      totalRemainSecond: 0,
    })

    act(() => {
      result.current.dispatch({ type: 'reset', payload: { lapInfoList } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 60 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 0,
      idealLapRemainSecond: 60,
      totalRemainSecond: 130,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 1 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 59 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 1,
      idealLapRemainSecond: 59,
      totalRemainSecond: 129,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 1 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 2,
      idealLapRemainSecond: 58,
      totalRemainSecond: 128,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 30 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 2,
      idealLapRemainSecond: 88,
      totalRemainSecond: 128,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 4,
      idealLapRemainSecond: 86,
      totalRemainSecond: 126,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 4,
      idealLapRemainSecond: 126,
      totalRemainSecond: 126,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 6 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      elapsedSecond: 10,
      idealLapRemainSecond: 120,
      totalRemainSecond: 120,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      elapsedSecond: 10,
      idealLapRemainSecond: 120,
      totalRemainSecond: 120,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      elapsedSecond: 12,
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'lap' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4, 10],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 34 },
      ],
      elapsedSecond: 12,
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'undo' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 32 },
      ],
      elapsedSecond: 12,
      idealLapRemainSecond: 118,
      totalRemainSecond: 118,
    })

    act(() => {
      result.current.dispatch({ type: 'elapsed', payload: { second: 2 } })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2, 4],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 28 },
        { label: 'agenda3', second: 30 },
      ],
      elapsedSecond: 14,
      idealLapRemainSecond: 116,
      totalRemainSecond: 116,
    })

    act(() => {
      result.current.dispatch({ type: 'undo' })
    })
    expect(result.current.state).toEqual({
      lapInfoList,
      lapSeconds: [2],
      lapRemains: [
        { label: 'agenda1', second: 58 },
        { label: 'agenda2', second: 18 },
        { label: 'agenda3', second: 40 },
      ],
      elapsedSecond: 14,
      idealLapRemainSecond: 76,
      totalRemainSecond: 116,
    })
  })
})
