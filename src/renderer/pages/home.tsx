import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import RestoreIcon from '@material-ui/icons/Restore'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector, useDispatch } from '../hooks/redux'
import { AppLayout } from '../components/atoms/AppLayout'
import { AgendaSkinList } from '../components/molecules/AgendaSkinList'
import { AgendaSkinCircle } from '../components/molecules/AgendaSkinCircle'
import { TimerInfo } from '../components/molecules/TimerInfo'
import { useTranslationWithKey } from '../hooks/useTranslationWithKey'

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
)

const Home: React.FC = () => {
  const classes = useStyles({})
  const history = useHistory()
  const { t, k } = useTranslationWithKey()

  const {
    agendaList,
    lapRemains,
    lapSeconds,
    totalRemainSecond,
    idealLapRemainSecond,
  } = useSelector(({ timer }) => timer)

  const avoidFinished = useSelector(({ setting }) => setting.avoidFinished)
  const skinMode = useSelector(({ setting }) => setting.skinMode)

  const dispatch = useDispatch()

  const isPlay = useSelector((state) => state.timer.isPlay)

  const togglePlay = React.useCallback(() => {
    if (isPlay) dispatch({ type: 'timer/stop' })
    else dispatch({ type: 'timer/start' })
  }, [isPlay])

  const dispatchLap = React.useCallback(() => dispatch({ type: 'timer/lap' }), [
    dispatch,
  ])

  const dispatchUndo = React.useCallback(
    () => dispatch({ type: 'timer/undo' }),
    [dispatch],
  )

  const dispatchReset = React.useCallback(() => {
    dispatch({ type: 'timer/reset' })
  }, [dispatch])

  const goToSetting = React.useCallback(() => history.push('/settings'), [
    history,
  ])

  const finishedAll = lapRemains.length <= lapSeconds.length

  React.useEffect(() => {
    if (finishedAll) dispatch({ type: 'timer/stop' })
  }, [finishedAll])

  return (
    <AppLayout
      className={classes.root}
      nav={
        <>
          <IconButton color="inherit" onClick={togglePlay}>
            {isPlay ? (
              <PauseIcon data-testid="PauseIcon" />
            ) : (
              <PlayArrowIcon data-testid="PlayIcon" />
            )}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={dispatchReset}
            data-testid="ResetIcon"
          >
            <RestoreIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={dispatchUndo}
            data-testid="UndoIcon"
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={dispatchLap}
            data-testid="LapIcon"
          >
            <ArrowDownwardIcon />
          </IconButton>
        </>
      }
      navRight={
        <IconButton
          color="inherit"
          onClick={goToSetting}
          data-testid="SettingIcon"
        >
          <SettingsIcon />
        </IconButton>
      }
      body={
        skinMode === 'circle' ? (
          <AgendaSkinCircle
            agendaList={agendaList}
            lapRemains={lapRemains}
            lapSeconds={lapSeconds}
          />
        ) : (
          <AgendaSkinList
            lapRemains={lapRemains}
            lapSeconds={lapSeconds}
            avoidFinished={avoidFinished}
          />
        )
      }
      footer={
        <Grid container spacing={2}>
          <Grid item xs>
            <TimerInfo
              label={t(k.total)}
              remainSecond={totalRemainSecond}
              data-testid="TotalTimer"
            />
          </Grid>
          <Grid item xs>
            <TimerInfo
              label={t(k.margin)}
              remainSecond={idealLapRemainSecond}
              data-testid="IdealTimer"
            />
          </Grid>
        </Grid>
      }
    />
  )
}

export default Home
