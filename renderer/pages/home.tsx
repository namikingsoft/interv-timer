import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import RestoreIcon from '@material-ui/icons/Restore'
import SettingsIcon from '@material-ui/icons/Settings'
import classnames from 'classnames'
import { TimerLabel } from '../components/atoms/TimerLabel'
import { useLapTimerReducer } from '../hooks/useLapTimerReducer'
import { useLapInfoRepository } from '../hooks/useLapInfoRepository'
import { useIntervalByAudioContext } from '../hooks/useIntervalByAudioContext'

const textBorderColor = '#333'
const textBorderColorActive = '#36f'
const textBorderColorExpired = '#f00'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      color: 'white !important',
      fontSize: 24,
      textShadow: `${textBorderColor} 1px 1px 0, ${textBorderColor} -1px -1px 0, ${textBorderColor} -1px 1px 0, ${textBorderColor} 1px -1px 0, ${textBorderColor} 0px 1px 0, ${textBorderColor}  0 -1px 0, ${textBorderColor} -1px 0 0, ${textBorderColor} 1px 0 0`,
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
      cursor: 'grab',
    },
    main: {
      position: 'absolute',
      overflowY: 'scroll',
      overflowX: 'hidden',
      top: 50,
      left: 0,
      width: '100%',
      bottom: 65,
      borderTop: '1px solid rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      zIndex: 1234,
      cursor: 'grab',
      paddingTop: 15,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 70,
      zIndex: 1234,
      cursor: 'grab',
      paddingTop: 15,
    },
    lap: {
      marginLeft: 14,
      userSelect: 'none',
    },
    label: {
      fontSize: 12,
      marginBottom: -5,
    },
    active: {
      textShadow: `${textBorderColorActive} 1px 1px 0, ${textBorderColorActive} -1px -1px 0, ${textBorderColorActive} -1px 1px 0, ${textBorderColorActive} 1px -1px 0, ${textBorderColorActive} 0px 1px 0, ${textBorderColorActive}  0 -1px 0, ${textBorderColorActive} -1px 0 0, ${textBorderColorActive} 1px 0 0`,
    },
    expired: {
      color: '#000',
      textShadow: `${textBorderColorExpired} 1px 1px 0, ${textBorderColorExpired} -1px -1px 0, ${textBorderColorExpired} -1px 1px 0, ${textBorderColorExpired} 1px -1px 0, ${textBorderColorExpired} 0px 1px 0, ${textBorderColorExpired}  0 -1px 0, ${textBorderColorExpired} -1px 0 0, ${textBorderColorExpired} 1px 0 0`,
    },
    hurry: {
      animation: '$hurry 1s ease-in-out 0s infinite normal',
      transformOrigin: 'center',
    },
    hurryUp: {
      animation: '$hurryUp 1s ease-in-out 0s infinite normal',
      transformOrigin: 'center',
    },
    nonActive: {
      opacity: 0.25,
    },
    floatRight: {
      float: 'right',
    },
    '@keyframes hurry': {
      '0%': {
        transform: 'scale(1, 1)',
      },
      '20%': {
        transform: 'scale(1.2, 1.2)',
      },
    },
    '@keyframes hurryUp': {
      '0%': {
        transform: 'scale(1, 1)',
      },
      '20%': {
        transform: 'scale(1.3, 1.3)',
        color: '#f33',
      },
    },
  }),
)

const Home: React.FC = () => {
  const classes = useStyles({})
  const router = useRouter()

  const {
    state: { lapRemains, lapSeconds, totalRemainSecond, idealLapRemainSecond },
    dispatch,
  } = useLapTimerReducer()

  const { loadLapInfoList } = useLapInfoRepository()

  const [isPlay, setIsPlay] = React.useState(false)

  const togglePlay = React.useCallback(() => {
    setIsPlay(!isPlay)
  }, [isPlay])

  const dispatchLap = React.useCallback(() => dispatch({ type: 'lap' }), [
    dispatch,
  ])

  const dispatchUndo = React.useCallback(() => dispatch({ type: 'undo' }), [
    dispatch,
  ])

  const dispatchReset = React.useCallback(() => {
    setIsPlay(false)
    dispatch({ type: 'reset', payload: { lapInfoList: loadLapInfoList() } })
  }, [dispatch])

  const goToSetting = React.useCallback(() => router.push('/settings'), [
    router,
  ])

  const intervalCallback = React.useCallback(() => {
    if (isPlay) dispatch({ type: 'elapsed', payload: { second: 1 } })
  }, [isPlay])

  useIntervalByAudioContext(1, intervalCallback)

  React.useEffect(() => dispatchReset(), [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>

      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton color="inherit" onClick={togglePlay}>
            {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={dispatchReset}>
            <RestoreIcon />
          </IconButton>
          <IconButton color="inherit" onClick={dispatchUndo}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton color="inherit" onClick={dispatchLap}>
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={goToSetting}
            className={classes.floatRight}
          >
            <SettingsIcon />
          </IconButton>
        </div>
        <div className={classes.main}>
          <Grid container spacing={2}>
            {lapRemains.map((remain, i) => {
              const isActive = i === lapSeconds.length
              return (
                <Grid
                  key={remain.label}
                  item
                  xs={12}
                  className={classnames(
                    classes.lap,
                    !isActive && classes.nonActive,
                  )}
                >
                  <div
                    className={classnames(
                      classes.label,
                      isActive && classes.active,
                    )}
                  >
                    {remain.label}
                  </div>
                  <TimerLabel
                    remainSecond={remain.second}
                    className={classnames(
                      remain.second < 0 && classes.expired,
                      isActive &&
                        remain.second > 10 &&
                        remain.second < 30 &&
                        classes.hurry,
                      isActive &&
                        remain.second >= 0 &&
                        remain.second <= 10 &&
                        classes.hurryUp,
                    )}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
        <div className={classes.footer}>
          <Grid container spacing={2}>
            <Grid item xs className={classes.lap}>
              <div className={classes.label}>Total</div>
              <TimerLabel
                remainSecond={totalRemainSecond}
                className={classnames(totalRemainSecond < 0 && classes.expired)}
              />
            </Grid>
            <Grid item xs className={classes.lap}>
              <div className={classes.label}>Margin</div>
              <TimerLabel
                remainSecond={idealLapRemainSecond}
                className={classnames(
                  idealLapRemainSecond < 0 && classes.expired,
                )}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
