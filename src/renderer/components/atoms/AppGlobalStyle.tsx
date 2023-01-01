import React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'

const styleGlobal = {
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
    // cannot drag by visibility or display
    '&:not(:hover) $header': {
      // TODO: -webkit-app-region: drag eats all click events on windows
      // https://github.com/electron/electron/issues/1354
      opacity: /^win/i.test(window.platform) ? 1 : 0,
    },
  },
  '::-webkit-scrollbar': {
    width: 10,
  },
  '::-webkit-scrollbar-track': {
    // NOTE: scrollbar background style
    // WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
  },
  '::-webkit-scrollbar-thumb:window-inactive, ::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255,0.4)',
    border: '2px solid rgba(0, 0, 0, 0)',
    backgroundClip: 'padding-box',
    borderRadius: 25,
  },
} as const

export const AppGlobalStyle = () => {
  return <GlobalStyles styles={styleGlobal} />
}
