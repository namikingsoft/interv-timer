import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Store,
} from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { timer } from './modules/timer/reducer'
import { setting } from './modules/setting/reducer'
import { updater } from './modules/updater/reducer'
import * as ipcEpics from './modules/ipc/epic'
import * as timerEpics from './modules/timer/epic'
import * as settingEpics from './modules/setting/epic'
import * as updaterEpics from './modules/updater/epic'
import { State, Action } from './modules/type'

const rootEpic = combineEpics(
  ...Object.values(ipcEpics),
  ...Object.values(timerEpics),
  ...Object.values(settingEpics),
  ...Object.values(updaterEpics),
)

declare global {
  interface Window {
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (
      ...arg: unknown[]
    ) => unknown
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && // for ssr
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export const createReduxStore = (): Store<State, Action> => {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(
    combineReducers({ timer, setting, updater }),
    composeEnhancers(applyMiddleware(epicMiddleware)),
  )
  epicMiddleware.run(rootEpic)
  return store
}
