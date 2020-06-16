import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useSelector, useDispatch } from '../hooks/redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      color: 'white',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      // Icon
      '& svg': {
        filter: 'drop-shadow(0px 0px 1.5px black);',
      },
      zIndex: 1234,
    },
    main: {
      position: 'absolute',
      overflowY: 'scroll',
      overflowX: 'hidden',
      top: 50,
      left: 0,
      width: '100%',
      bottom: 0,
      zIndex: 1234,
    },
    form: {
      marginLeft: 14,
    },
    laps: {
      width: '100%',
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

  const setting = useSelector(({ setting }) => setting)

  const dispatch = useDispatch()

  const onChangeLapsText = React.useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      dispatch({
        type: 'setting/setLapInfoListText',
        payload: event.currentTarget.value,
      })
    },
    [dispatch],
  )

  const saveAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/saveRequest', payload: setting })
    router.push('/home')
  }, [dispatch, router, setting])

  React.useEffect(() => {
    dispatch({ type: 'setting/loadRequest' })
  }, [dispatch])

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
            value={setting.lapInfoListText}
            onChange={onChangeLapsText}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
