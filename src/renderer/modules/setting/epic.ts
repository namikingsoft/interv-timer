import { Epic, ofType } from 'redux-observable'
import { tap, map, mapTo } from 'rxjs/operators'
import { Action, AppInitAction } from '../type'
import {
  SaveRequestAction,
  SaveSuccessAction,
  LoadRequestAction,
  LoadSuccessAction,
} from './type'
import * as api from './api'

export const initialize: Epic<Action, LoadRequestAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'app/init', AppInitAction>('app/init'),
    mapTo({
      type: 'setting/loadRequest',
    }),
  )

export const save: Epic<Action, SaveSuccessAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'setting/saveRequest', SaveRequestAction>(
      'setting/saveRequest',
    ),
    tap(({ payload }) => api.save(payload)),
    map(({ payload }) => ({
      type: 'setting/saveSuccess',
      payload,
    })),
  )

export const load: Epic<Action, LoadSuccessAction> = (action$) =>
  action$.pipe(
    ofType<Action, 'setting/loadRequest', LoadRequestAction>(
      'setting/loadRequest',
    ),
    map(() => ({
      type: 'setting/loadSuccess',
      payload: api.load(),
    })),
  )
