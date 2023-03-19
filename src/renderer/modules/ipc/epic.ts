import { Epic, ofType } from 'redux-observable'
import { Subject } from 'rxjs'
import { tap, map, ignoreElements } from 'rxjs/operators'
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

export const initialize: Epic<Action, NoopAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'app/init', AppInitAction>('app/init'),
    tap(() => api.on((_, action) => recieveSubject.next(action))),
    map(() => ({ type: 'noop' })),
  )

export const send: Epic<Action> = (action$) =>
  action$.pipe(
    ofType<
      Action,
      | 'ipc/quit'
      | 'ipc/setVisibleOnAllWorkspaces'
      | 'ipc/dragWindow'
      | 'ipc/updaterCheckForUpdates'
      | 'ipc/updaterQuitAndInstall'
    >(
      'ipc/quit',
      'ipc/setVisibleOnAllWorkspaces',
      'ipc/dragWindow',
      'ipc/updaterCheckForUpdates',
      'ipc/updaterQuitAndInstall',
    ),
    tap<RequestAction>((action) => api.send(action)),
    ignoreElements(),
  )

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Epic<unknown>
export const recieve: Epic<any> = () => recieveSubject.asObservable()

export const setVisibleOnAllWorkspaces: Epic<
  Action,
  SetVisibleOnAllWorkSpacesAction
> = (action$) =>
  action$.pipe(
    ofType<
      Action,
      'setting/setVisibleOnAllWorkspaces',
      SetVisibleOnAllWorkspaces
    >('setting/setVisibleOnAllWorkspaces'),
    map(({ payload }) => ({ type: 'ipc/setVisibleOnAllWorkspaces', payload })),
  )

export const localStorageToVisibleOnAllWorkspaces: Epic<
  Action,
  SetVisibleOnAllWorkSpacesAction
> = (action$) =>
  action$.pipe(
    ofType<
      Action,
      'setting/saveSuccess' | 'setting/loadSuccess',
      SaveSuccessAction | LoadSuccessAction
    >('setting/saveSuccess', 'setting/loadSuccess'),
    map(({ payload }) => ({
      type: 'ipc/setVisibleOnAllWorkspaces',
      payload: payload.visibleOnAllWorkspaces,
    })),
  )

export const localStorageToUpdaterCheckForUpdates: Epic<
  Action,
  UpdaterCheckForUpdatesAction | NoopAction
> = (action$) =>
  action$.pipe(
    ofType<
      Action,
      'setting/saveSuccess' | 'setting/loadSuccess',
      SaveSuccessAction | LoadSuccessAction
    >('setting/saveSuccess', 'setting/loadSuccess'),
    map(({ payload }) =>
      payload.enabledAutoUpdater
        ? {
            type: 'ipc/updaterCheckForUpdates',
          }
        : { type: 'noop' },
    ),
  )
