import { createTheme } from '@mui/material/styles'
import red from '@mui/material/colors/red'

export const theme = createTheme({
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
      default: 'rgba(0,0,0,0)',
    },
  },
})
