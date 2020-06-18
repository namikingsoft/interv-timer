import { Reducer } from 'redux'
import { State, Action, Agenda } from './type'

const initialState: State = {
  agendaList: [],
  lapRemains: [],
  lapSeconds: [],
  elapsedSecond: 0,
  idealLapRemainSecond: 0,
  totalRemainSecond: 0,
}

const calcState = (state: State): State => {
  const { agendaList, lapRemains, lapSeconds, elapsedSecond } = state
  const totalLapSecond = agendaList.reduce((acc, x) => acc + x.second, 0)
  const previosLapSecond =
    lapSeconds.length > 0 ? lapSeconds[lapSeconds.length - 1] : 0
  const idealLapSecond = lapSeconds.reduce(
    (acc, _, i) => acc + agendaList[i].second,
    0,
  )
  return {
    ...state,
    elapsedSecond,
    lapRemains: agendaList.map(({ label, second }, i) => ({
      label,
      second: (() => {
        if (i > lapSeconds.length) return second
        if (i < lapSeconds.length) return lapRemains[i].second
        return second - (elapsedSecond - previosLapSecond)
      })(),
    })),
    idealLapRemainSecond:
      lapSeconds.length < agendaList.length
        ? agendaList[lapSeconds.length].second -
          (elapsedSecond - idealLapSecond)
        : idealLapSecond - elapsedSecond,
    totalRemainSecond: totalLapSecond - elapsedSecond,
  }
}

const initState = (agendaList: Agenda[]): State => {
  const totalLapSecond = agendaList.reduce((acc, x) => acc + x.second, 0)
  return {
    ...initialState,
    agendaList: agendaList,
    lapRemains: agendaList.map(({ label, second }) => ({
      label,
      second,
    })),
    idealLapRemainSecond: agendaList[0].second,
    totalRemainSecond: totalLapSecond,
  }
}

export const timer: Reducer<State, Action> = (state = initialState, action) => {
  const { agendaList, elapsedSecond, lapSeconds } = state
  switch (action.type) {
    case 'timer/elapsed':
      return calcState({
        ...state,
        elapsedSecond: elapsedSecond + action.payload.second,
      })
    case 'timer/lap':
      if (lapSeconds.length >= agendaList.length) return state
      return calcState({
        ...state,
        lapSeconds: [...lapSeconds, elapsedSecond],
      })
    case 'timer/undo':
      if (agendaList.length <= 0) return state
      return calcState({
        ...state,
        lapSeconds: lapSeconds.slice(0, -1),
      })
    case 'timer/reset':
      return initState(agendaList)
    case 'timer/init':
      return initState(action.payload.agendaList)
    default:
      return state
  }
}
