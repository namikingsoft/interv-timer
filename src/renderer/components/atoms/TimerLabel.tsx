import React from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import classnames from 'classnames'

interface Props {
  className?: string
  children: React.ReactNode
  'data-testid'?: string
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: 13,
      marginBottom: -5,
    },
  }),
)

export const TimerLabel: React.FC<Props> = ({
  className,
  children,
  'data-testid': testId,
}) => {
  const classes = useStyles({})

  return (
    <div className={classnames(className, classes.root)} data-testid={testId}>
      {children}
    </div>
  )
}
