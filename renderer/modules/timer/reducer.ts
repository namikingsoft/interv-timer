import { Reducer } from 'redux'
import { State, Action } from './type'

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
    case 'timer/reset': {
      const { lapInfoList: lapInfoNewList } = action.payload
      const totalLapSecond = lapInfoNewList.reduce(
        (acc, x) => acc + x.second,
        0,
      )
      return {
        ...initialState,
        lapInfoList: lapInfoNewList,
        lapRemains: lapInfoNewList.map(({ label, second }) => ({
          label,
          second,
        })),
        idealLapRemainSecond: lapInfoNewList[0].second,
        totalRemainSecond: totalLapSecond,
      }
    }
    default:
      return state
  }
}
