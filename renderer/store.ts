import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { timer } from './modules/timer/reducer'
import { setting } from './modules/setting/reducer'
import * as settingEpics from './modules/setting/epic'
import { State, Action } from './modules/type'

const rootEpic = combineEpics(...Object.values(settingEpics))

export const createReduxStore = (): Store<State, Action> => {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(
    combineReducers({ timer, setting }),
    applyMiddleware(epicMiddleware),
  )
  epicMiddleware.run(rootEpic)
  return store
}
