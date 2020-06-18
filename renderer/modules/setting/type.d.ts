export interface State {
  settingVersion: number
  lapInfoListText: string
  avoidFinished: boolean
  backgroundAlphaRate: number
}

export interface SetLapInfoListText {
  type: 'setting/setLapInfoListText'
  payload: string
}

export interface SetAvoidFinished {
  type: 'setting/setAvoidFinished'
  payload: boolean
}

export interface SetBackgroundAlphaRate {
  type: 'setting/setBackgroundAlphaRate'
  payload: number
}

export interface SaveRequestAction {
  type: 'setting/saveRequest'
  payload: State
}

export interface SaveSuccessAction {
  type: 'setting/saveSuccess'
  payload: State
}

export interface LoadRequestAction {
  type: 'setting/loadRequest'
}

export interface LoadSuccessAction {
  type: 'setting/loadSuccess'
  payload: State
}

export type Action =
  | SetLapInfoListText
  | SetAvoidFinished
  | SetBackgroundAlphaRate
  | SaveRequestAction
  | SaveSuccessAction
  | LoadRequestAction
  | LoadSuccessAction
