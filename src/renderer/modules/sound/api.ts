import timeupSound from './assets/timeup.mp3'
import hurrySound from './assets/hurry.mp3'

const timeupAudio = new Audio(timeupSound)
const hurryAudio = new Audio(hurrySound)

const cloneAudio = (audio: HTMLAudioElement) =>
  audio.cloneNode() as HTMLAudioElement

export const playTimeup = async (): Promise<void> =>
  cloneAudio(timeupAudio).play()

export const playHurry = async (): Promise<void> => {
  await cloneAudio(hurryAudio).play()
  await new Promise((resolve) => setTimeout(resolve, 250))
  await cloneAudio(hurryAudio).play()
}
