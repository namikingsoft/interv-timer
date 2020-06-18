import { Reducer } from 'redux'
import { State, Action } from './type'

const initialState: State = {
  settingVersion: 0,
  lapInfoListText: '',
  avoidFinished: false,
  backgroundAlphaRate: 0,
}

export const setting: Reducer<State, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'setting/loadSuccess':
    case 'setting/saveSuccess':
      return { ...action.payload }
    case 'setting/setLapInfoListText':
      return { ...state, lapInfoListText: action.payload }
    case 'setting/setAvoidFinished':
      return { ...state, avoidFinished: action.payload }
    case 'setting/setBackgroundAlphaRate':
      return { ...state, backgroundAlphaRate: action.payload }
    default:
      return state
  }
}
