import { Epic, ofType } from 'redux-observable'
import { Subject, Observable } from 'rxjs'
import { tap, mapTo } from 'rxjs/operators'
import { Action, AppInitAction, NoopAction } from '../type'
import { RequestAction } from './type'
import * as api from './api'

const recieveSubject = new Subject()

export const initialize: Epic<Action, NoopAction> = (action$) =>
  action$.pipe(
    ofType<Action, AppInitAction>('app/init'),
    tap(() => api.on((_, action) => recieveSubject.next(action))),
    mapTo({ type: 'noop' }),
  )

export const send: Epic<Action, NoopAction> = (action$) =>
  action$.pipe(
    ofType<Action, RequestAction>('ipc/quit', 'ipc/updaterQuitAndInstall'),
    tap((action) => api.send(action)),
    mapTo({ type: 'noop' }),
  )

export const recieve: () => Observable<unknown> = () =>
  recieveSubject.asObservable()
