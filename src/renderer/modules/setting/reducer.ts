import { Reducer } from 'redux'
import { State, Action } from './type'

const initialState: State = {
  settingVersion: 0,
  agendaListText: '',
  avoidFinished: false,
  backgroundAlphaRate: 0,
  visibleOnAllWorkspaces: false,
  skinMode: undefined,
  enabledAutoUpdater: false,
}

export const setting: Reducer<State, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'setting/loadSuccess':
    case 'setting/saveSuccess':
      return { ...action.payload }
    case 'setting/setAgendaListText':
      return { ...state, agendaListText: action.payload }
    case 'setting/setAvoidFinished':
      return { ...state, avoidFinished: action.payload }
    case 'setting/setBackgroundAlphaRate':
      return { ...state, backgroundAlphaRate: action.payload }
    case 'setting/setVisibleOnAllWorkspaces':
      return { ...state, visibleOnAllWorkspaces: action.payload }
    case 'setting/setSkinMode':
      return { ...state, skinMode: action.payload }
    case 'setting/setEnabledAutoUpdater':
      return { ...state, enabledAutoUpdater: action.payload }
    default:
      return state
  }
}
