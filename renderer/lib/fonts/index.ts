import * as FontFaceObserver from 'fontfaceobserver'

require('typeface-roboto')

export const initializeFonts = (): void => {
  const roboto = new FontFaceObserver('Roboto')

  // non-blocking loading fonts
  roboto.load().then(() => {
    document.documentElement.classList.add('roboto')
  })
}
