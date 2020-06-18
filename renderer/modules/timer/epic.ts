import { Epic, ofType } from 'redux-observable'
import { map, filter, tap } from 'rxjs/operators'
import deepEqual from 'fast-deep-equal/react'
import { SaveSuccessAction, LoadSuccessAction } from '../setting/type'
import { Action, State } from '../type'
import { InitAction } from './type'
import { parseTextToAgendaList } from './util'

export const initAfterChangeSetting: Epic<Action, InitAction, State> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType<Action, SaveSuccessAction | LoadSuccessAction>(
      'setting/saveSuccess',
      'setting/loadSuccess',
    ),
    tap((x) => console.log(x)),
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
