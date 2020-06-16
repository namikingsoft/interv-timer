import { Epic, ofType } from 'redux-observable'
import { map, filter } from 'rxjs/operators'
import deepEqual from 'fast-deep-equal/react'
import { SaveSuccessAction, LoadSuccessAction } from '../setting/type'
import { Action, State } from '../type'
import { InitAction } from './type'
import { parseTextToLapInfoList } from './util'

export const initAfterChangeSetting: Epic<Action, InitAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, SaveSuccessAction | LoadSuccessAction>(
      'setting/saveSuccess',
      'setting/loadSuccess',
    ),
    map(({ payload: { lapInfoListText } }) =>
      parseTextToLapInfoList(lapInfoListText),
    ),
    filter(
      (lapInfoList) => !deepEqual(lapInfoList, state$.value.timer.lapInfoList),
    ),
    map((lapInfoList) => ({
      type: 'timer/init',
      payload: { lapInfoList },
    })),
  )
