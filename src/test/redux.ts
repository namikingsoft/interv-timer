import { State } from '../renderer/modules/type'
import { rootReducer } from '../renderer/reducers'

export const initialState: State = (() => {
  // @ts-expect-error derive redux initialState for test
  return rootReducer(undefined, {})
})()
