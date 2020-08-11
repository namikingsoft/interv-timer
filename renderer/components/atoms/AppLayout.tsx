import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const textBorderColor = '#333'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      width: '100%',
      height: '100%',
      color: 'white',
      textShadow: `${textBorderColor} 1px 1px 0, ${textBorderColor} -1px -1px 0, ${textBorderColor} -1px 1px 0, ${textBorderColor} 1px -1px 0, ${textBorderColor} 0px 1px 0, ${textBorderColor}  0 -1px 0, ${textBorderColor} -1px 0 0, ${textBorderColor} 1px 0 0`,
    },
    nav: {
      flex: '0 1 50px',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      // Icon
      '& svg': {
        filter: 'drop-shadow(0px 0px 1.5px black);',
      },
    },
    body: {
      flex: '1 1 auto',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '15px 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    footer: {
      flex: '0 1 auto',
      padding: '15px 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
  }),
)

interface Props {
  className?: string
  nav: React.ReactNode
  navRight?: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
}

export const AppLayout: React.FC<Props> = ({
  className,
  nav,
  navRight,
  body,
  footer,
}) => {
  const classes = useStyles({})

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classnames(classes.nav)}>
        <div>{nav}</div>
        <div>{navRight}</div>
      </div>
      <div className={classes.body}>{body}</div>
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  )
}
