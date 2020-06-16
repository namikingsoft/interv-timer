export interface State {
  lapInfoListText: string
}

export interface SetLapInfoListText {
  type: 'setting/setLapInfoListText'
  payload: string
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
  | SaveRequestAction
  | SaveSuccessAction
  | LoadRequestAction
  | LoadSuccessAction
