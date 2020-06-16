import { combineReducers, createStore, Store } from 'redux'
import { timer } from './modules/timer/reducer'
import { State, Action } from './modules/type'

export const createReduxStore = (): Store<State, Action> =>
  createStore(combineReducers({ timer }))
