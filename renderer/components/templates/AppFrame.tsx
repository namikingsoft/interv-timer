import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import CloseIcon from '@material-ui/icons/Close'

interface Props {
  className?: string
  onClickClose: () => void
  children: React.ReactNode
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 30,
      color: 'white',
      paddingTop: 4,
      paddingLeft: 4,
      paddingRight: 5,
      backgroundColor: '#111',
    },
    dragArea: {
      flex: '1 0 auto',
      cursor: 'move', // TODO: no effect on windows
      WebkitAppRegion: 'drag',
    },
    closeArea: {
      width: 20,
      '&:hover': {
        color: '#c33',
      },
    },
    dragIcon: {
      color: '#666',
    },
    closeButton: {
      cursor: 'pointer',
    },
    headerNonActive: {
      opacity: 0.1,
    },
    main: {
      position: 'absolute',
      top: 30,
      left: 0,
      right: 0,
      bottom: 0,
    },
    mainRelative: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    '@global': {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.75)',
      },
    },
  }),
)

export const AppFrame: React.FC<Props> = ({
  className,
  onClickClose,
  children,
}) => {
  const classes = useStyles({})

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.header}>
        <div className={classes.dragArea}>
          <DragIndicatorIcon className={classes.dragIcon} />
        </div>
        <div className={classes.closeArea}>
          <CloseIcon className={classes.closeButton} onClick={onClickClose} />
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.mainRelative}>{children}</div>
      </div>
    </div>
  )
}
