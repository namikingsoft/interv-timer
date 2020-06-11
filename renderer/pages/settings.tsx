import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useLapInfoRepository } from '../hooks/useLapInfoRepository'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      color: 'white',
    },
    buttons: {
      // Icon
      '& svg': {
        filter: 'drop-shadow(0px 0px 1.5px black);',
      },
    },
    form: {
      marginLeft: 14,
    },
    laps: {
      width: 320,
      WebkitAppRegion: 'no-drag',
    },
  }),
)

const placeholder = `Please enter lap of label and second.

e.g.

label1,60
label2,180
`

const Home: React.FC = () => {
  const classes = useStyles({})
  const router = useRouter()
  const { save, load } = useLapInfoRepository()

  const [lapsText, setLapsText] = React.useState('')

  const onChangeLapsText = React.useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      setLapsText(event.currentTarget.value)
    },
    [],
  )

  const saveAndGotoHome = React.useCallback(() => {
    save(lapsText)
    router.push('/home')
  }, [lapsText, router])

  React.useEffect(() => {
    setLapsText(load())
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>

      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.buttons}>
            <IconButton color="inherit" onClick={saveAndGotoHome}>
              <SaveIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              className={classes.laps}
              rowsMin={10}
              rowsMax={20}
              placeholder={placeholder}
              value={lapsText}
              onChange={onChangeLapsText}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Home
