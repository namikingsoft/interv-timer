import { Dispatch } from 'redux'
import {
  useDispatch as useDispatchOriginal,
  useSelector as useSelectorOriginal,
} from 'react-redux'
import { State, Action } from '../modules/type'

export const useDispatch: () => Dispatch<Action> = useDispatchOriginal

export const useSelector: <T>(
  selector: (state: State) => T,
  equalityFn?: (left: T, right: T) => boolean,
) => T = useSelectorOriginal
