export interface Agenda {
  label: string
  second: number
}

interface LapRemain {
  label: string
  second: number
}

export interface State {
  isPlay: boolean
  baseTime: number
  stopTime: number
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

interface StartAction {
  type: 'timer/start'
}

interface StopAction {
  type: 'timer/stop'
}

interface SetBaseTimeAction {
  type: 'timer/setBaseTime'
  payload: number
}

interface SetStopTimeAction {
  type: 'timer/setStopTime'
  payload: number
}

interface ElapsedSecondAction {
  type: 'timer/elapsedSecond'
  payload: number
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
  | StartAction
  | StopAction
  | SetBaseTimeAction
  | SetStopTimeAction
  | ElapsedSecondAction
  | LapAction
  | UndoAction
