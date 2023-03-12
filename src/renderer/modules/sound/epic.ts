import { Epic, ofType } from 'redux-observable'
import { tap, ignoreElements, mergeMap } from 'rxjs/operators'
import { Action, State } from '../type'
import * as api from './api'
import { roundSecond } from '../timer/util'
import { hurrySecond } from '../timer/const'
import { PlayHurryAction, PlayTimeupAction } from './type'
import { of, NEVER } from 'rxjs'

export const mapToPlayOnElapsedSecond: Epic<
  Action,
  PlayHurryAction | PlayTimeupAction,
  State
> = (action$, state$) =>
  action$.pipe(
    ofType<Action, 'timer/elapsedSecond'>('timer/elapsedSecond'),
    mergeMap(() => {
      const timerState = state$.value.timer
      const lapCount = timerState.lapSeconds.length
      const lapRemainSecond = roundSecond(
        timerState.lapRemains[lapCount].second,
      )
      if (lapRemainSecond === hurrySecond) {
        return of({ type: 'sound/playHurry' } as const)
      } else if (lapRemainSecond === 0) {
        return of({ type: 'sound/playTimeup' } as const)
      }
      return NEVER
    }),
  )

export const playHurry: Epic<Action> = (action$) =>
  action$.pipe(
    ofType<Action, 'sound/playHurry'>('sound/playHurry'),
    tap(() => api.playHurry()),
    ignoreElements(),
  )

export const playTimeup: Epic<Action> = (action$) =>
  action$.pipe(
    ofType<Action, 'sound/playTimeup'>('sound/playTimeup'),
    tap(() => api.playTimeup()),
    ignoreElements(),
  )
