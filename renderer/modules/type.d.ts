import { State as TimerState, Action as TimerAction } from './timer/type'
import { State as SettingState, Action as SettingAction } from './setting/type'

export interface State {
  timer: TimerState
  setting: SettingState
}

export interface InitializeAction {
  type: 'initialize'
}

export type Action = InitializeAction | TimerAction | SettingAction
