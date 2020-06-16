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

interface InitAction {
  type: 'timer/init'
  payload: {
    lapInfoList: LapInfo[]
  }
}

interface ResetAction {
  type: 'timer/reset'
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

export type Action =
  | InitAction
  | ResetAction
  | ElapsedAction
  | LapAction
  | UndoAction
