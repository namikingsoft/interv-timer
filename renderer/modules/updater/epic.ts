import { Epic, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import { Action } from '../type'
import {
  UpdaterAvailableAction,
  UpdaterProgressAction,
  UpdaterDownloadedAction,
} from '../ipc/type'
import { AvailableAction, ProgressAction, DownloadedAction } from './type'

export const available: Epic<Action, AvailableAction> = (action$) =>
  action$.pipe(
    ofType<Action, UpdaterAvailableAction>('ipc/updaterAvailable'),
    map((action) => ({
      type: 'updater/available',
      payload: { newVersion: action.payload.version },
    })),
  )

export const progress: Epic<Action, ProgressAction> = (action$) =>
  action$.pipe(
    ofType<Action, UpdaterProgressAction>('ipc/updaterProgress'),
    map((action) => ({
      type: 'updater/progress',
      payload: { percent: action.payload.percent },
    })),
  )

export const downloaded: Epic<Action, DownloadedAction> = (action$) =>
  action$.pipe(
    ofType<Action, UpdaterDownloadedAction>('ipc/updaterDownloaded'),
    map(() => ({
      type: 'updater/downloaded',
    })),
  )
