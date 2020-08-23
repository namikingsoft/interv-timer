import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import classnames from 'classnames'

interface Props {
  hurry?: boolean
  hurryUp?: boolean
  children: React.ReactNode
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-block',
    },
    hurry: {
      animation: '$hurry 1s ease-in-out 0s infinite normal',
      transformOrigin: 'center',
    },
    hurryUp: {
      animation: '$hurryUp 1s ease-in-out 0s infinite normal',
      transformOrigin: 'center',
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

export const HurryAnimationText: React.FC<Props> = ({
  hurry,
  hurryUp,
  children,
}) => {
  const classes = useStyles({})

  return (
    <span
      className={classnames(
        classes.root,
        hurry && classes.hurry,
        hurryUp && classes.hurryUp,
      )}
    >
      {children}
    </span>
  )
}
