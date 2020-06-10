import React from 'react'

interface LapInfo {
  label: string
  second: number
}

interface LapRemain {
  label: string
  second: number
}

interface State {
  lapRemains: LapRemain[]
  lapSeconds: number[]
  elapsedSecond: number
  idealLapRemainSecond: number
  totalRemainSecond: number
}

interface ElapsedAction {
  type: 'elapsed'
  payload: {
    second: number
  }
}

interface LapAction {
  type: 'lap'
}

interface UndoAction {
  type: 'undo'
}

interface ResetAction {
  type: 'reset'
}

type Action = ElapsedAction | LapAction | UndoAction | ResetAction

const initialState: State = {
  lapRemains: [],
  lapSeconds: [],
  elapsedSecond: 0,
  idealLapRemainSecond: 0,
  totalRemainSecond: 0,
}

interface HookReturnType {
  state: State
  dispatch: React.Dispatch<Action>
}

export const useLapTimerReducer = (lapInfos: LapInfo[]): HookReturnType => {
  const totalLapSecond = lapInfos.reduce((acc, x) => acc + x.second, 0)

  const initialCalculatedState = {
    ...initialState,
    lapRemains: lapInfos.map(({ label, second }) => ({
      label,
      second,
    })),
    idealLapRemainSecond: lapInfos[0].second,
    totalRemainSecond: totalLapSecond,
  }

  const calcState = React.useCallback(
    (state: State): State => {
      const { elapsedSecond } = state
      const previosLapSecond =
        state.lapSeconds.length > 0
          ? state.lapSeconds[state.lapSeconds.length - 1]
          : 0
      const idealLapSecond = state.lapSeconds.reduce(
        (acc, _, i) => acc + lapInfos[i].second,
        0,
      )
      return {
        ...state,
        elapsedSecond,
        lapRemains: lapInfos.map(({ label, second }, i) => ({
          label,
          second: (() => {
            if (i > state.lapSeconds.length) return second
            if (i < state.lapSeconds.length) return state.lapRemains[i].second
            return second - (elapsedSecond - previosLapSecond)
          })(),
        })),
        idealLapRemainSecond:
          state.lapSeconds.length < lapInfos.length
            ? lapInfos[state.lapSeconds.length].second -
              (elapsedSecond - idealLapSecond)
            : idealLapSecond - elapsedSecond,
        totalRemainSecond: totalLapSecond - elapsedSecond,
      }
    },
    [lapInfos],
  )

  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'elapsed':
        return calcState({
          ...state,
          elapsedSecond: state.elapsedSecond + action.payload.second,
        })
      case 'lap':
        if (state.lapSeconds.length >= lapInfos.length) return state
        return calcState({
          ...state,
          lapSeconds: [...state.lapSeconds, state.elapsedSecond],
        })
      case 'undo':
        if (lapInfos.length <= 0) return state
        return calcState({
          ...state,
          lapSeconds: state.lapSeconds.slice(0, -1),
        })
      case 'reset':
        return initialCalculatedState
      default:
        return state
    }
  }, initialCalculatedState)

  return { state, dispatch }
}
