import { Subject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { StateObservable } from 'redux-observable'
import { State } from '../type'
import { initialState } from '../../../test/redux'
import { mapToPlayOnElapsedSecond } from './epic'

describe('mapToPlayOnElapsedSecond', () => {
  it('should map to play timeup', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('--a', {
        a: { type: 'timer/elapsedSecond', payload: 1 } as const,
      })
      const state$ = new StateObservable<State>(new Subject(), {
        ...initialState,
        timer: {
          ...initialState.timer,
          lapSeconds: [],
          lapRemains: [
            {
              label: 'Agenda1',
              second: 0.1,
            },
          ],
        },
      })

      const output$ = mapToPlayOnElapsedSecond(action$, state$, {})

      expectObservable(output$).toBe('--a', {
        a: {
          type: 'sound/playTimeup',
        },
      })
    })
  })

  it('should map to play hurry', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('--a', {
        a: { type: 'timer/elapsedSecond', payload: 1 } as const,
      })
      const state$ = new StateObservable<State>(new Subject(), {
        ...initialState,
        timer: {
          ...initialState.timer,
          lapSeconds: [],
          lapRemains: [
            {
              label: 'Agenda1',
              second: 29.9,
            },
          ],
        },
      })

      const output$ = mapToPlayOnElapsedSecond(action$, state$, {})

      expectObservable(output$).toBe('--a--', {
        a: {
          type: 'sound/playHurry',
        },
      })
    })
  })

  it('should never map', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('--a--', {
        a: { type: 'timer/elapsedSecond', payload: 1 } as const,
      })
      const state$ = new StateObservable<State>(new Subject(), {
        ...initialState,
        timer: {
          ...initialState.timer,
          lapSeconds: [],
          lapRemains: [
            {
              label: 'Agenda1',
              second: 0.5,
            },
          ],
        },
      })

      const output$ = mapToPlayOnElapsedSecond(action$, state$, {})

      expectObservable(output$).toBe('-----')
    })
  })
})
