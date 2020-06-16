import { Epic, ofType } from 'redux-observable'
import { tap, map } from 'rxjs/operators'
import {
  SaveRequestAction,
  SaveSuccessAction,
  LoadRequestAction,
  LoadSuccessAction,
} from './type'
import { Action } from '../type'
import * as api from './api'

export const save: Epic<Action, SaveSuccessAction> = (action$) =>
  action$.pipe(
    ofType<Action, SaveRequestAction>('setting/saveRequest'),
    tap(({ payload }) => api.save(payload)),
    map(({ payload }) => ({
      type: 'setting/saveSuccess',
      payload,
    })),
  )

export const load: Epic<Action, LoadSuccessAction> = (action$) =>
  action$.pipe(
    ofType<Action, LoadRequestAction>('setting/loadRequest'),
    map(() => ({
      type: 'setting/loadSuccess',
      payload: api.load(),
    })),
  )
