import React from 'react'

export const useIntervalByAudioContext = (
  intervalSecond: number,
  callback: (elapsedSecond: number) => void,
): void => {
  React.useEffect(() => {
    let prevElapsedSecond = 0
    let animationId: number
    // @ts-expect-error webkitAudioContext not defined
    const AppAudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AppAudioContext()
    const step = () => {
      if (
        audioContext.currentTime % intervalSecond <
        prevElapsedSecond % intervalSecond
      ) {
        callback(audioContext.currentTime)
      }
      prevElapsedSecond = audioContext.currentTime
      animationId = window.requestAnimationFrame(step)
    }
    animationId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationId)
  }, [intervalSecond, callback])
}
