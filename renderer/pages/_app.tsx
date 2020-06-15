import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ipcRenderer } from 'electron'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { I18nextProvider } from 'react-i18next'
import { AppFrame } from '../components/templates/AppFrame'
import { theme } from '../lib/theme'
import { i18n } from '../i18n'

const onClickClose = () => ipcRenderer.send('quit')

export default class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jssStyles.parentNode!.removeChild(jssStyles)
    }

    // set browser language
    const browserLanguage =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      // @ts-expect-error for legacy browser
      window.navigator.userLanguage ||
      // @ts-expect-error for legacy browser
      window.navigator.browserLanguage
    i18n.changeLanguage(browserLanguage)
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <Head>
          <title>with-typescript-material-ui</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <I18nextProvider i18n={i18n}>
            <AppFrame onClickClose={onClickClose}>
              <Component {...pageProps} />
            </AppFrame>
          </I18nextProvider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
