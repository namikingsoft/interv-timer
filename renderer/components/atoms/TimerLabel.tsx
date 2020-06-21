import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface Props {
  className?: string
  remainSecond: number
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-block',
    },
  }),
)

const zeroPad2 = (x: number) => String(x).padStart(2, '0')

export const TimerLabel: React.FC<Props> = ({ className, remainSecond }) => {
  const classes = useStyles({})
  const remainSecondAbs = Math.abs(remainSecond)
  const remainMinute = remainSecondAbs / 60
  const remainHour = remainMinute / 60
  const second = zeroPad2(Math.round(remainSecondAbs % 60)) // NOTE: 58.999 => 59 not 58
  const minute = zeroPad2(Math.floor(remainMinute % 60))
  const hour = zeroPad2(Math.floor(remainHour))

  return (
    <div
      className={classnames(classes.root, className)}
    >{`${hour}:${minute}:${second}`}</div>
  )
}
