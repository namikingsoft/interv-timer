import React from 'react'
import { useDispatch } from './redux'

// refs. https://github.com/electron/electron/issues/1354#issuecomment-1066341381
export const useDragWindow = () => {
  const dispatch = useDispatch()

  const refMouseX = React.useRef(0)
  const refMouseY = React.useRef(0)
  const refAnimationId = React.useRef(0)

  const sendIpc = React.useCallback(() => {
    dispatch({
      type: 'ipc/dragWindow',
      payload: { startX: refMouseX.current, startY: refMouseY.current },
    })
    refAnimationId.current = requestAnimationFrame(sendIpc)
  }, [])

  const onMouseUp = React.useCallback(() => {
    document.removeEventListener('mouseup', onMouseUp)
    cancelAnimationFrame(refAnimationId.current)
  }, [])

  const onMouseDown = React.useCallback((e: MouseEvent) => {
    refMouseX.current = e.clientX
    refMouseY.current = e.clientY

    document.addEventListener('mouseup', onMouseUp)
    refAnimationId.current = requestAnimationFrame(sendIpc)
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [])
}
