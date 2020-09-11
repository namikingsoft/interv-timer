import { Epic, ofType } from 'redux-observable'
import { timer } from 'rxjs'
import { map, filter, first, takeUntil, switchAll } from 'rxjs/operators'
import deepEqual from 'fast-deep-equal/react'
import { SaveSuccessAction, LoadSuccessAction } from '../setting/type'
import { Action, State } from '../type'
import {
  InitAction,
  StartAction,
  StopAction,
  ResetAction,
  SetBaseTimeAction,
  SetStopTimeAction,
  ElapsedSecondAction,
} from './type'
import { parseTextToAgendaList } from './util'

const renderIntervalMsec = 1000

export const calcBaseTime: Epic<Action, SetBaseTimeAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, StartAction>('timer/start'),
    map(() =>
      state$.value.timer.baseTime === 0
        ? Date.now()
        : state$.value.timer.baseTime +
          Date.now() -
          state$.value.timer.stopTime,
    ),
    map((payload) => ({
      type: 'timer/setBaseTime',
      payload,
    })),
  )

export const setStopTime: Epic<Action, SetStopTimeAction, State> = (action$) =>
  action$.pipe(
    ofType<Action, StopAction>('timer/stop'),
    map(() => ({
      type: 'timer/setStopTime',
      payload: Date.now(),
    })),
  )

export const toggleInterval: Epic<Action, ElapsedSecondAction, State> = (
  action$,
  state$,
) => {
  const finish$ = action$.pipe(
    ofType<StopAction | ResetAction>('timer/stop', 'timer/reset'),
    first(),
  )
  const interval$ = () =>
    timer(
      renderIntervalMsec -
        ((Date.now() - state$.value.timer.baseTime) % renderIntervalMsec),
      renderIntervalMsec,
    ).pipe(takeUntil(finish$))

  return action$.pipe(
    ofType<Action, StartAction>('timer/start'),
    map(interval$),
    switchAll(),
    map(() => ({
      type: 'timer/elapsedSecond',
      payload: (Date.now() - state$.value.timer.baseTime) / 1000,
    })),
  )
}

export const initAfterChangeSetting: Epic<Action, InitAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, SaveSuccessAction | LoadSuccessAction>(
      'setting/saveSuccess',
      'setting/loadSuccess',
    ),
    map(({ payload: { agendaListText } }) =>
      parseTextToAgendaList(agendaListText),
    ),
    filter(
      (agendaList) => !deepEqual(agendaList, state$.value.timer.agendaList),
    ),
    map((agendaList) => ({
      type: 'timer/init',
      payload: { agendaList },
    })),
  )
