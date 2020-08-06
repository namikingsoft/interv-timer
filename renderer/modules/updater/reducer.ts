import { Reducer } from 'redux'
import { State, Action } from './type'

const initialState: State = {
  newVersion: '',
  downloaded: false,
  percent: 0,
}

export const updater: Reducer<State, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'updater/available':
      return { ...state, newVersion: action.payload.newVersion }
    case 'updater/progress':
      return { ...state, percent: action.payload.percent }
    case 'updater/downloaded':
      return { ...state, percent: 100, downloaded: true }
    default:
      return state
  }
}
