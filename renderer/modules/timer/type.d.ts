export interface LapInfo {
  label: string
  second: number
}

interface LapRemain {
  label: string
  second: number
}

export interface State {
  lapInfoList: LapInfo[]
  lapRemains: LapRemain[]
  lapSeconds: number[]
  elapsedSecond: number
  idealLapRemainSecond: number
  totalRemainSecond: number
}

interface ResetAction {
  type: 'timer/reset'
  payload: {
    lapInfoList: LapInfo[]
  }
}

interface ElapsedAction {
  type: 'timer/elapsed'
  payload: {
    second: number
  }
}

interface LapAction {
  type: 'timer/lap'
}

interface UndoAction {
  type: 'timer/undo'
}

export type Action = ResetAction | ElapsedAction | LapAction | UndoAction
