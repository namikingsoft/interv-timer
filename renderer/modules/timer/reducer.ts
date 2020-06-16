import { Reducer } from 'redux'
import { State, Action, LapInfo } from './type'

const initialState: State = {
  lapInfoList: [],
  lapRemains: [],
  lapSeconds: [],
  elapsedSecond: 0,
  idealLapRemainSecond: 0,
  totalRemainSecond: 0,
}

const calcState = (state: State): State => {
  const { lapInfoList, lapRemains, lapSeconds, elapsedSecond } = state
  const totalLapSecond = lapInfoList.reduce((acc, x) => acc + x.second, 0)
  const previosLapSecond =
    lapSeconds.length > 0 ? lapSeconds[lapSeconds.length - 1] : 0
  const idealLapSecond = lapSeconds.reduce(
    (acc, _, i) => acc + lapInfoList[i].second,
    0,
  )
  return {
    ...state,
    elapsedSecond,
    lapRemains: lapInfoList.map(({ label, second }, i) => ({
      label,
      second: (() => {
        if (i > lapSeconds.length) return second
        if (i < lapSeconds.length) return lapRemains[i].second
        return second - (elapsedSecond - previosLapSecond)
      })(),
    })),
    idealLapRemainSecond:
      lapSeconds.length < lapInfoList.length
        ? lapInfoList[lapSeconds.length].second -
          (elapsedSecond - idealLapSecond)
        : idealLapSecond - elapsedSecond,
    totalRemainSecond: totalLapSecond - elapsedSecond,
  }
}

const initState = (lapInfoList: LapInfo[]): State => {
  const totalLapSecond = lapInfoList.reduce((acc, x) => acc + x.second, 0)
  return {
    ...initialState,
    lapInfoList: lapInfoList,
    lapRemains: lapInfoList.map(({ label, second }) => ({
      label,
      second,
    })),
    idealLapRemainSecond: lapInfoList[0].second,
    totalRemainSecond: totalLapSecond,
  }
}

export const timer: Reducer<State, Action> = (state = initialState, action) => {
  const { lapInfoList, elapsedSecond, lapSeconds } = state
  switch (action.type) {
    case 'timer/elapsed':
      return calcState({
        ...state,
        elapsedSecond: elapsedSecond + action.payload.second,
      })
    case 'timer/lap':
      if (lapSeconds.length >= lapInfoList.length) return state
      return calcState({
        ...state,
        lapSeconds: [...lapSeconds, elapsedSecond],
      })
    case 'timer/undo':
      if (lapInfoList.length <= 0) return state
      return calcState({
        ...state,
        lapSeconds: lapSeconds.slice(0, -1),
      })
    case 'timer/reset':
      return initState(lapInfoList)
    case 'timer/init':
      return initState(action.payload.lapInfoList)
    default:
      return state
  }
}
