import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@mui/styles'
import { calcTimerLabelFromRemainSecond } from '../../modules/timer/util'

interface Props {
  className?: string
  remainSecond: number
  'data-testid'?: string
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: 24,
    },
  }),
)

export const TimerValue: React.FC<Props> = ({
  className,
  remainSecond,
  'data-testid': testId,
}) => {
  const classes = useStyles({})
  const { hour, minute, second } = calcTimerLabelFromRemainSecond(remainSecond)

  return (
    <div
      className={classnames(classes.root, className)}
      data-testid={testId}
    >{`${hour}:${minute}:${second}`}</div>
  )
}
