import { Epic, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import { SaveSuccessAction, LoadSuccessAction } from '../setting/type'
import { Action } from '../type'
import { InitAction } from './type'
import { parseTextToLapInfoList } from './util'

export const initialize: Epic<Action, InitAction> = (action$) =>
  action$.pipe(
    ofType<Action, SaveSuccessAction | LoadSuccessAction>(
      'setting/saveSuccess',
      'setting/loadSuccess',
    ),
    map(({ payload: { lapInfoListText } }) => ({
      type: 'timer/init',
      payload: {
        lapInfoList: parseTextToLapInfoList(lapInfoListText),
      },
    })),
  )
