import { timer } from './reducer'

describe('modules/timer/reducer', () => {
  const agendaList = [
    { label: 'agenda1', second: 60 },
    { label: 'agenda2', second: 30 },
    { label: 'agenda3', second: 40 },
  ]

  it('should behave lap timer', () => {
    // @ts-expect-error for test
    let state = timer(undefined, {})
    expect(state).toEqual({
      agendaList: [],
      lapSeconds: [],
      lapRemains: [],
      elapsedSecond: 0,
      idealLapRemainSecond: 0,
      totalRemainSecond: 0,
    })

    state = timer(state, {
      type: 'timer/init',
      payload: { agendaList },
    })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, {
      type: 'timer/elapsed',
      payload: { second: 1 },
    })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/elapsed', payload: { second: 1 } })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/lap' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/elapsed', payload: { second: 2 } })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/lap' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/elapsed', payload: { second: 6 } })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/lap' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/elapsed', payload: { second: 2 } })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/lap' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/undo' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/elapsed', payload: { second: 2 } })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/undo' })
    expect(state).toEqual({
      agendaList,
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

    state = timer(state, { type: 'timer/reset' })
    expect(state).toEqual({
      agendaList,
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
  })
})
