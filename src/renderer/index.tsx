import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppGlobalStyle } from './components/atoms/AppGlobalStyle'
import { createReduxStore } from './store'
import { routes } from './routes'
import { theme } from './theme'
import { i18n } from './i18n'

import 'typeface-roboto'

// set browser language
const browserLanguage =
  (window.navigator.languages && window.navigator.languages[0]) ||
  window.navigator.language ||
  // @ts-expect-error for legacy browser
  window.navigator.userLanguage ||
  // @ts-expect-error for legacy browser
  window.navigator.browserLanguage
i18n.changeLanguage(browserLanguage)

const store = createReduxStore()
store.dispatch({ type: 'app/init' })

const app = document.createElement('div')
app.setAttribute('id', 'app')

document.body.appendChild(app)

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppGlobalStyle />
        {routes}
      </ThemeProvider>
    </Provider>
  </I18nextProvider>,
  app,
)
