import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { calcTimerLabelFromRemainSecond } from '../../modules/timer/util'

interface Props {
  className?: string
  remainSecond: number
  'data-testid'?: string
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-block',
    },
  }),
)

export const TimerLabel: React.FC<Props> = ({
  className,
  remainSecond,
  'data-testid': dataTestId,
}) => {
  const classes = useStyles({})
  const { hour, minute, second } = calcTimerLabelFromRemainSecond(remainSecond)

  return (
    <div
      className={classnames(classes.root, className)}
      data-testid={dataTestId}
    >{`${hour}:${minute}:${second}`}</div>
  )
}
