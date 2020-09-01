import { Epic, ofType } from 'redux-observable'
import { Subject, Observable } from 'rxjs'
import { tap, map, mapTo } from 'rxjs/operators'
import { Action, AppInitAction, NoopAction } from '../type'
import {
  SetVisibleOnAllWorkspaces,
  SaveSuccessAction,
  LoadSuccessAction,
} from '../setting/type'
import {
  RequestAction,
  UpdaterCheckForUpdatesAction,
  SetVisibleOnAllWorkSpacesAction,
} from './type'
import * as api from './api'

const recieveSubject = new Subject()

export const initialize: Epic<Action, UpdaterCheckForUpdatesAction> = (
  action$,
) =>
  action$.pipe(
    ofType<Action, AppInitAction>('app/init'),
    tap(() => api.on((_, action) => recieveSubject.next(action))),
    mapTo({ type: 'ipc/updaterCheckForUpdates' }),
  )

export const send: Epic<Action, NoopAction> = (action$) =>
  action$.pipe(
    ofType<Action, RequestAction>(
      'ipc/quit',
      'ipc/setVisibleOnAllWorkspaces',
      'ipc/updaterCheckForUpdates',
      'ipc/updaterQuitAndInstall',
    ),
    tap((action) => api.send(action)),
    mapTo({ type: 'noop' }),
  )

export const recieve: () => Observable<unknown> = () =>
  recieveSubject.asObservable()

export const setVisibleOnAllWorkspaces: Epic<
  Action,
  SetVisibleOnAllWorkSpacesAction
> = (action$) =>
  action$.pipe(
    ofType<Action, SetVisibleOnAllWorkspaces>(
      'setting/setVisibleOnAllWorkspaces',
    ),
    map(({ payload }) => ({ type: 'ipc/setVisibleOnAllWorkspaces', payload })),
  )

export const localStorageToVisibleOnAllWorkspaces: Epic<
  Action,
  SetVisibleOnAllWorkSpacesAction
> = (action$) =>
  action$.pipe(
    ofType<Action, SaveSuccessAction | LoadSuccessAction>(
      'setting/saveSuccess',
      'setting/loadSuccess',
    ),
    map(({ payload }) => ({
      type: 'ipc/setVisibleOnAllWorkspaces',
      payload: payload.visibleOnAllWorkspaces,
    })),
  )
