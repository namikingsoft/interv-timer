import { applyMiddleware, createStore, compose, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { State, Action } from './modules/type'
import { rootReducer } from './reducers'
import { rootEpic } from './epics'

declare global {
  interface Window {
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (
      ...arg: unknown[]
    ) => unknown
  }
}

// TODO: runtime errors on extension, but no effects on app
const composeEnhancers =
  (typeof window !== 'undefined' && // for ssr
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export const createReduxStore = (): Store<State, Action> => {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  )
  epicMiddleware.run(rootEpic)
  return store
}
