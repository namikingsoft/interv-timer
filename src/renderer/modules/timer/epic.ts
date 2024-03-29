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
  LapAction,
  UndoAction,
} from './type'
import { parseTextToAgendaList } from './util'
import { renderIntervalMsec } from './const'
import {
  ShortcutLapAction,
  ShortcutToggleAction,
  ShortcutUndoAction,
} from '../ipc/type'

export const calcBaseTime: Epic<Action, SetBaseTimeAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, 'timer/start', StartAction>('timer/start'),
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
    ofType<Action, 'timer/stop', StopAction>('timer/stop'),
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
    ofType<
      StopAction | InitAction | ResetAction,
      'timer/stop' | 'timer/init' | 'timer/reset'
    >('timer/stop', 'timer/init', 'timer/reset'),
    first(),
  )
  const interval$ = () =>
    timer(
      renderIntervalMsec -
        ((Date.now() - state$.value.timer.baseTime) % renderIntervalMsec),
      renderIntervalMsec,
    ).pipe(takeUntil(finish$))

  return action$.pipe(
    ofType<Action, 'timer/start', StartAction>('timer/start'),
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
    ofType<
      Action,
      'setting/saveSuccess' | 'setting/loadSuccess',
      SaveSuccessAction | LoadSuccessAction
    >('setting/saveSuccess', 'setting/loadSuccess'),
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

export const shortcutToggle: Epic<Action, StartAction | StopAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, 'ipc/shortcutToggle', ShortcutToggleAction>(
      'ipc/shortcutToggle',
    ),
    map(() => ({
      type: state$.value.timer.isPlay ? 'timer/stop' : 'timer/start',
    })),
  )

export const shortcutLap: Epic<Action, LapAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'ipc/shortcutLap', ShortcutLapAction>('ipc/shortcutLap'),
    map(() => ({
      type: 'timer/lap',
    })),
  )

export const shortcutUndo: Epic<Action, UndoAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'ipc/shortcutUndo', ShortcutUndoAction>('ipc/shortcutUndo'),
    map(() => ({
      type: 'timer/undo',
    })),
  )
