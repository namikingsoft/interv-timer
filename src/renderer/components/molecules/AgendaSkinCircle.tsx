import React, { CSSProperties } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import { styled } from '@mui/material/styles'
import { Agenda, LapRemain } from '../../modules/timer/type'
import { TimerInfo } from './TimerInfo'

interface Props {
  agendaList: Agenda[]
  lapRemains: LapRemain[]
  lapSeconds: number[]
}

const ContainerDiv = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
}))

const CenteringDiv = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
}))

const styleTimer = {
  width: '90%',
  textAlign: 'center',
} as const

const styleShadowBlack = {
  filter: 'drop-shadow(1px 1px 0px #000a)',
} as const

interface CircleProps {
  size: number
  color: string
  thickness: number
  percent: number
  rotateDegree?: number
  style?: CSSProperties
}

const Circle = ({
  size,
  color,
  thickness,
  percent,
  rotateDegree,
  style,
}: CircleProps) => (
  <CenteringDiv style={style}>
    <div
      style={{
        transform: rotateDegree && `rotate(${rotateDegree}deg)`,
        width: size,
        height: size,
        color,
      }}
    >
      <CircularProgress
        variant="determinate"
        color="inherit"
        size={size}
        thickness={thickness}
        value={percent}
      />
    </div>
  </CenteringDiv>
)

const circleWholeSizeRate = 0.9
const circleWholeThickness = 1.75
const circleCurrentSizeRate = 0.75
const circleCurrentThickness = 5.75
const circleColorPrimary = '#556cd6'
const circleColorSecondary = '#090'
// material-ui like
// const circleColorSecondary = '#19857b'

export const AgendaSkinCircle: React.FC<Props> = ({
  agendaList,
  lapRemains,
  lapSeconds,
}) => {
  const finishedAll = lapRemains.length <= lapSeconds.length

  const index = lapSeconds.length
  const remainLabel = lapRemains[index]?.label
  const remainSecond = lapRemains[index]?.second
  const agendaSecond = agendaList[index]?.second
  const currentPercent = Math.min(
    100,
    100 - (remainSecond / agendaSecond) * 100,
  )

  const totalSecond = React.useMemo(
    () => agendaList.reduce((acc, x) => acc + x.second, 0),
    [agendaList],
  )
  const progressSeconds = React.useMemo(
    () =>
      agendaList.reduce((acc, x, i) => {
        if (i === 0) return [x.second]
        return [...acc, acc[i - 1] + x.second]
      }, []),
    [agendaList],
  )
  const progressDegrees = React.useMemo(
    () => progressSeconds.map((x) => Math.round((x / totalSecond) * 360)),
    [agendaList],
  )

  const nextProgressSecond = progressSeconds[index]
  const nextProgressPercent = (nextProgressSecond / totalSecond) * 100

  const pastSecond =
    (index > 0 ? lapSeconds[index - 1] : 0) + agendaSecond - remainSecond
  const pastPercent = (pastSecond / totalSecond) * 100
  const pastDeadLinePercent = Math.min(pastPercent, nextProgressPercent)

  const curentLatePercent =
    index <= 0
      ? 0
      : Math.min(
          100,
          (Math.max(0, lapSeconds[index - 1] - progressSeconds[index - 1]) /
            agendaSecond) *
            100,
        )

  const refRoot = React.useRef<HTMLDivElement>(null)
  const [shortSideSize, setShortSideSize] = React.useState(0)

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setShortSideSize(Math.min(width, height))
      }
    })
    if (refRoot.current) {
      resizeObserver.observe(refRoot.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [refRoot.current])

  return (
    <ContainerDiv ref={refRoot}>
      <Circle
        // whole frame
        size={shortSideSize * circleWholeSizeRate}
        color="#fff2"
        thickness={circleWholeThickness}
        percent={100}
      />
      <Circle
        // whole past percent
        size={shortSideSize * circleWholeSizeRate}
        color="#fff3"
        thickness={circleWholeThickness}
        percent={nextProgressPercent}
      />
      {progressDegrees.map((x) => (
        <Circle
          // whole agenda scale
          key={x}
          style={styleShadowBlack}
          size={shortSideSize * circleWholeSizeRate}
          color="#fff6"
          thickness={circleWholeThickness}
          percent={0.15}
          rotateDegree={x}
        />
      ))}
      <Circle
        // whole past percent
        color="#a00"
        size={shortSideSize * circleWholeSizeRate}
        thickness={circleWholeThickness}
        percent={pastPercent}
      />
      <Circle
        // whole past deadline percent
        color={circleColorSecondary}
        size={shortSideSize * circleWholeSizeRate}
        thickness={circleWholeThickness}
        percent={pastDeadLinePercent}
      />
      <Circle
        // current progress frame
        color="#fff2"
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={100}
      />
      <Circle
        // current late percent
        color="#0006"
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={-curentLatePercent}
      />
      <Circle
        // current progress percent
        color={circleColorPrimary}
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={currentPercent}
      />
      <CenteringDiv style={styleTimer}>
        {finishedAll ? (
          <DoneOutlineIcon fontSize="large" data-testid="FinishedIcon" />
        ) : (
          <TimerInfo
            label={remainLabel}
            remainSecond={remainSecond}
            isActive
            data-testid="AgendaTimer"
          />
        )}
      </CenteringDiv>
    </ContainerDiv>
  )
}
