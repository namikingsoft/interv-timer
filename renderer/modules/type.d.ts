import { State as TimerState, Action as TimerAction } from './timer/type'

export interface State {
  timer: TimerState
}

export type Action = TimerAction
