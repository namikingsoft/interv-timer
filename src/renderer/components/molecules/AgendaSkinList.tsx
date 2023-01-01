import React from 'react'
import Grid from '@mui/material/Grid'
import { LapRemain } from '../../modules/timer/type'
import { TimerInfo } from './TimerInfo'

interface Props {
  lapRemains: LapRemain[]
  lapSeconds: number[]
  avoidFinished: boolean
}

export const AgendaSkinList: React.FC<Props> = ({
  lapRemains,
  lapSeconds,
  avoidFinished,
}) => {
  const finishedAll = lapRemains.length <= lapSeconds.length

  return (
    <div>
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
