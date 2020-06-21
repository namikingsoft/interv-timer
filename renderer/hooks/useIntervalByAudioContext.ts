import React from 'react'

interface CallbackArg {
  elapsedSecond: number
  deltaSecond: number
}

export const useIntervalByAudioContext = (
  intervalSecond: number,
  intervalCallback: (arg: CallbackArg) => void,
): void => {
  React.useEffect(() => {
    let prevCallbackSecond = 0
    let animationId: number
    // @ts-expect-error webkitAudioContext not defined
    const AppAudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AppAudioContext()
    const step = () => {
      if (intervalSecond < audioContext.currentTime - prevCallbackSecond) {
        const currentTime = audioContext.currentTime
        intervalCallback({
          elapsedSecond: currentTime,
          deltaSecond: currentTime - prevCallbackSecond,
        })
        prevCallbackSecond = currentTime
      }
      animationId = window.requestAnimationFrame(step)
    }
    animationId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationId)
  }, [intervalSecond, intervalCallback])
}
