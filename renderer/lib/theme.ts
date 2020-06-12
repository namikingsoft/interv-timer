import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'transparent',
    },
  },
})

const styles = () => ({
  '@global': {
    body: {
      WebkitAppRegion: 'drag',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.75)',
      },
    },
  },
})

export const MyCssBaseline = withStyles(styles)(() => null)
