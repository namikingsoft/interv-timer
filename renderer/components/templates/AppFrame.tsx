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
    root: {},
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 30,
      color: 'white',
      cursor: 'move',
      padding: 3,
      backgroundColor: '#000',
      WebkitAppRegion: 'drag',
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
    dragIcon: {
      color: '#666',
    },
    closeButton: {
      cursor: 'pointer',
      float: 'right',
      WebkitAppRegion: 'no-drag',
    },
    none: {
      display: 'none',
    },
    '@global': {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.75)',
        },
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

  const [isHover, setIsHover] = React.useState(false)
  const onMouseEnter = React.useCallback(() => setIsHover(true), [])
  const onMouseLeave = React.useCallback(() => setIsHover(false), [])
  // TODO: avoid document
  React.useEffect(() => {
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  })

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classnames(classes.header, !isHover && classes.none)}>
        <DragIndicatorIcon className={classes.dragIcon} />
        <CloseIcon className={classes.closeButton} onClick={onClickClose} />
      </div>
      <div className={classes.main}>
        <div className={classes.mainRelative}>{children}</div>
      </div>
    </div>
  )
}
