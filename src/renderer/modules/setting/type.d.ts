// TODO: avoid undefined after impl skin mode select
type SkinMode = undefined | 'circle'

export interface State {
  settingVersion: number
  agendaListText: string
  avoidFinished: boolean
  backgroundAlphaRate: number
  visibleOnAllWorkspaces: boolean
  skinMode: SkinMode
}

export interface SetAgendaListText {
  type: 'setting/setAgendaListText'
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

export interface SetVisibleOnAllWorkspaces {
  type: 'setting/setVisibleOnAllWorkspaces'
  payload: boolean
}

export interface SetSkinMode {
  type: 'setting/setSkinMode'
  payload: SkinMode
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
  | SetAgendaListText
  | SetAvoidFinished
  | SetBackgroundAlphaRate
  | SetVisibleOnAllWorkspaces
  | SetSkinMode
  | SaveRequestAction
  | SaveSuccessAction
  | LoadRequestAction
  | LoadSuccessAction
