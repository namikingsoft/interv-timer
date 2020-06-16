import { Reducer } from 'redux'
import { State, Action } from './type'

const initialState: State = {
  lapInfoListText: '',
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
    default:
      return state
  }
}
