import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { remote } from 'electron'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '../lib/theme'
import { AppFrame } from '../components/templates/AppFrame'

const onClickClose = () => remote.getCurrentWindow().close()

export default class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jssStyles.parentNode!.removeChild(jssStyles)
    }
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
          <AppFrame onClickClose={onClickClose}>
            <Component {...pageProps} />
          </AppFrame>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
