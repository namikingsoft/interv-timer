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
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      // Icon
      '& svg': {
        filter: 'drop-shadow(0px 0px 1.5px black);',
      },
      zIndex: 1234,
      cursor: 'grab',
      WebkitAppRegion: 'drag',
    },
    main: {
      position: 'fixed',
      overflowY: 'scroll',
      overflowX: 'hidden',
      top: 50,
      left: 0,
      width: '100%',
      bottom: 0,
      zIndex: 1234,
      cursor: 'grab',
      WebkitAppRegion: 'drag',
    },
    form: {
      marginLeft: 14,
    },
    laps: {
      width: '100%',
      WebkitAppRegion: 'no-drag',
    },
    floatRight: {
      float: 'right',
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
        <div className={classes.header}>
          <IconButton
            color="inherit"
            onClick={saveAndGotoHome}
            className={classes.floatRight}
          >
            <SaveIcon />
          </IconButton>
        </div>
        <div className={classes.main}>
          <TextareaAutosize
            className={classes.laps}
            rowsMin={10}
            rowsMax={20}
            placeholder={placeholder}
            value={lapsText}
            onChange={onChangeLapsText}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
