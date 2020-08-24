import { Action as IpcAction } from './ipc/type'
import { State as TimerState, Action as TimerAction } from './timer/type'
import { State as SettingState, Action as SettingAction } from './setting/type'
import { State as UpdaterState, Action as UpdaterAction } from './updater/type'

export interface State {
  timer: TimerState
  setting: SettingState
  updater: UpdaterState
}

export interface AppInitAction {
  type: 'app/init'
}

export interface NoopAction {
  type: 'noop'
}

export type Action =
  | AppInitAction
  | NoopAction
  | IpcAction
  | TimerAction
  | SettingAction
  | UpdaterAction
