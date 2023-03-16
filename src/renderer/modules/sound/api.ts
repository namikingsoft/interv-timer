import timeupSound from './assets/timeup.mp3'
import hurrySound from './assets/hurry.mp3'

// create audio on root for preload
const timeupAudio = new Audio(timeupSound)
const hurryAudio = new Audio(hurrySound)

const cloneAudio = (audio: HTMLAudioElement) =>
  audio.cloneNode() as HTMLAudioElement

export const playTimeup = async (): Promise<void> =>
  cloneAudio(timeupAudio).play()

export const playHurry = async (): Promise<void> => {
  const audio = cloneAudio(hurryAudio)
  await audio.play()
  await new Promise((resolve) => setTimeout(resolve, 2500))
  await audio.pause()
}
