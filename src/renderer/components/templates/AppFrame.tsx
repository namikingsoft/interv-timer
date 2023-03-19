import React from 'react'
import { styled } from '@mui/material/styles'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CloseIcon from '@mui/icons-material/Close'
import { UpdaterSnackbar } from '../organisms/UpdaterSnackbar'
import { useSelector, useDispatch } from '../../hooks/redux'

interface Props {
  className?: string
  children: React.ReactNode
}

const radiusSize = 10

const ContainerDiv = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  borderRadius: `${radiusSize}px`,
}))

const HeaderDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 30,
  color: 'white',
  paddingTop: 5,
  paddingLeft: 4,
  paddingRight: 6,
  backgroundColor: '#262626',
  borderTop: '1px solid #555',
}))

const DragAreaDiv = styled('div')(() => ({
  flex: '1 0 auto',
  userSelect: 'none',
  // TODO: no effect on windows, because do not receive mouse events
  // refs. https://stackoverflow.com/questions/56338939/hover-in-css-is-not-working-with-electron
  cursor: 'move',
}))

const CloseAreaDiv = styled('div')(() => ({
  width: 20,
  '&:hover': {
    color: '#c33',
  },
}))

interface MainDivProps {
  backgroundAlphaRate: number
  showHeader: boolean
}

const MainDiv = styled('div')<MainDivProps>(
  ({ backgroundAlphaRate, showHeader }) => ({
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${backgroundAlphaRate || 0})`,
    borderRadius: showHeader
      ? undefined
      : `${radiusSize}px ${radiusSize}px 0 0`,
  }),
)

const MainRelativeDiv = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}))

export const AppFrame: React.FC<Props> = ({ className, children }) => {
  const backgroundAlphaRate = useSelector(
    ({ setting }) => setting.backgroundAlphaRate,
  )

  const updaterNewVersion = useSelector(({ updater }) => updater.newVersion)
  const updaterPercent = useSelector(({ updater }) => updater.percent)

  const dispatch = useDispatch()

  const [isOpenUpdater, setIsOpenUpdater] = React.useState(false)

  const [isHover, setIsHover] = React.useState(false)

  React.useEffect(() => {
    setIsOpenUpdater(!!updaterNewVersion)
  }, [updaterNewVersion])

  const onCloseUpdater = React.useCallback(() => {
    setIsOpenUpdater(false)
  }, [])

  const onRestart = React.useCallback(() => {
    dispatch({ type: 'ipc/updaterQuitAndInstall' })
  }, [dispatch])

  const onCloseApp = React.useCallback(() => {
    dispatch({ type: 'ipc/quit' })
  }, [dispatch])

  const showHeader = isHover

  return (
    <ContainerDiv
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {showHeader && (
        <HeaderDiv>
          <DragAreaDiv>
            <DragIndicatorIcon
              sx={{
                color: '#666',
              }}
            />
          </DragAreaDiv>
          <CloseAreaDiv>
            <CloseIcon
              sx={{
                cursor: 'pointer',
              }}
              onClick={onCloseApp}
              data-testid="CloseIcon"
            />
          </CloseAreaDiv>
        </HeaderDiv>
      )}
      <MainDiv
        backgroundAlphaRate={backgroundAlphaRate}
        showHeader={showHeader}
      >
        <MainRelativeDiv>{children}</MainRelativeDiv>
      </MainDiv>

      <UpdaterSnackbar
        open={isOpenUpdater}
        onClose={onCloseUpdater}
        onRestart={onRestart}
        version={updaterNewVersion}
        percent={updaterPercent}
      />
    </ContainerDiv>
  )
}
