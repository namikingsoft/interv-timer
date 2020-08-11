import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { LapRemain } from '../../modules/timer/type'
import { TimerInfo } from './TimerInfo'

interface Props {
  lapRemains: LapRemain[]
  lapSeconds: number[]
  avoidFinished: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
)

export const ListSkin: React.FC<Props> = ({
  lapRemains,
  lapSeconds,
  avoidFinished,
}) => {
  const classes = useStyles({})

  const finishedAll = lapRemains.length <= lapSeconds.length

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {lapRemains.map((remain, i) => {
          const isActive = i === lapSeconds.length
          const finished = i < lapSeconds.length
          return avoidFinished && finished && !finishedAll ? null : (
            <Grid key={remain.label} item xs={12}>
              <TimerInfo
                label={remain.label}
                remainSecond={remain.second}
                isActive={isActive}
                disabled={!isActive}
                data-testid={`AgendaTimer${i}`}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
