import React from 'react'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from '../../hooks/redux'

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
      paddingRight: 6,
      backgroundColor: '#262626',
      borderTop: '1px solid #555',
      borderRadius: '2px 2px 0 0',
      // cannot drag by visibility or display
      opacity: 0,
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
      // @ts-expect-error define props type
      backgroundColor: ({ backgroundAlphaRate }) =>
        `rgba(0, 0, 0, ${backgroundAlphaRate || 0})`,
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
        '&:hover $header': {
          opacity: 1,
        },
      },
      '::-webkit-scrollbar': {
        width: 10,
      },
      '::-webkit-scrollbar-track': {
        // NOTE: scrollbar background style
        // WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      },
      '::-webkit-scrollbar-thumb:window-inactive, ::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,0.4)',
        border: '2px solid rgba(0, 0, 0, 0)',
        backgroundClip: 'padding-box',
        borderRadius: 25,
      },
    },
  }),
)

export const AppFrame: React.FC<Props> = ({
  className,
  onClickClose,
  children,
}) => {
  const backgroundAlphaRate = useSelector(
    ({ setting }) => setting.backgroundAlphaRate,
  )
  const classes = useStyles({ backgroundAlphaRate })

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
