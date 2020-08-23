export interface Agenda {
  label: string
  second: number
}

interface LapRemain {
  label: string
  second: number
}

export interface State {
  agendaList: Agenda[]
  lapRemains: LapRemain[]
  lapSeconds: number[]
  elapsedSecond: number
  idealLapRemainSecond: number
  totalRemainSecond: number
}

interface InitAction {
  type: 'timer/init'
  payload: {
    agendaList: Agenda[]
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
