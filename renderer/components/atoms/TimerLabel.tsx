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
  const remainMinute = Math.floor(remainSecondAbs / 60)
  const remainHour = Math.floor(remainMinute / 60)
  const second = zeroPad2(remainSecondAbs % 60)
  const minute = zeroPad2(remainMinute % 60)
  const hour = zeroPad2(remainHour)

  return (
    <div
      className={classnames(classes.root, className)}
    >{`${hour}:${minute}:${second}`}</div>
  )
}
