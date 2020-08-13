import React from 'react'
import classnames from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Agenda, LapRemain } from '../../modules/timer/type'
import { TimerInfo } from './TimerInfo'

interface Props {
  agendaList: Agenda[]
  lapRemains: LapRemain[]
  lapSeconds: number[]
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    centering: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
    },
    timer: {
      width: '90%',
      textAlign: 'center',
    },
    shadowWhite: {
      filter: 'drop-shadow(2px 2px 0px #fffa)',
    },
    shadowBlack: {
      filter: 'drop-shadow(1px 1px 0px #000a)',
    },
  }),
)

interface CircleProps {
  size: number
  color: string
  thickness: number
  percent: number
  rotateDegree?: number
  className?: string
}

const Circle = ({
  size,
  color,
  thickness,
  percent,
  rotateDegree,
  className,
}: CircleProps) => (
  <div className={className}>
    <div
      style={{
        transform: rotateDegree && `rotate(${rotateDegree}deg)`,
        width: size,
        height: size,
        color,
      }}
    >
      <CircularProgress
        variant="static"
        color="inherit"
        size={size}
        thickness={thickness}
        value={percent}
      />
    </div>
  </div>
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
  const classes = useStyles({})

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

  const curentLatePercent = Math.min(
    100,
    (Math.max(0, lapSeconds[index - 1] - progressSeconds[index - 1]) /
      agendaSecond) *
      100,
  )

  const refRoot = React.useRef<HTMLDivElement>(null)
  const [shortSideSize, setShortSideSize] = React.useState(0)

  React.useEffect(() => {
    // @ts-expect-error ResizeObserver undefined
    // https://github.com/Microsoft/TypeScript/issues/28502
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
    <div className={classes.root} ref={refRoot}>
      <Circle
        // whole frame
        className={classnames(classes.centering)}
        size={shortSideSize * circleWholeSizeRate}
        color="#fff2"
        thickness={circleWholeThickness}
        percent={100}
      />
      <Circle
        // whole past percent
        className={classnames(classes.centering)}
        size={shortSideSize * circleWholeSizeRate}
        color="#fff3"
        thickness={circleWholeThickness}
        percent={nextProgressPercent}
      />
      {progressDegrees.map((x) => (
        <Circle
          // whole agenda scale
          className={classnames(classes.centering, classes.shadowBlack)}
          key={x}
          size={shortSideSize * circleWholeSizeRate}
          color="#fff6"
          thickness={circleWholeThickness}
          percent={0.15}
          rotateDegree={x}
        />
      ))}
      <Circle
        // whole past percent
        className={classnames(classes.centering)}
        color="#a00"
        size={shortSideSize * circleWholeSizeRate}
        thickness={circleWholeThickness}
        percent={pastPercent}
      />
      <Circle
        // whole past deadline percent
        className={classnames(classes.centering)}
        color={circleColorSecondary}
        size={shortSideSize * circleWholeSizeRate}
        thickness={circleWholeThickness}
        percent={pastDeadLinePercent}
      />
      <Circle
        // current progress frame
        className={classnames(classes.centering)}
        color="#fff2"
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={100}
      />
      <Circle
        // current late percent
        className={classnames(classes.centering)}
        color="#0006"
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={-curentLatePercent}
      />
      <Circle
        // current progress percent
        className={classnames(classes.centering)}
        color={circleColorPrimary}
        size={shortSideSize * circleCurrentSizeRate}
        thickness={circleCurrentThickness}
        percent={currentPercent}
      />
      <div className={classnames(classes.centering, classes.timer)}>
        <TimerInfo
          label={remainLabel}
          remainSecond={remainSecond}
          isActive
          data-testid="AgendaTimer"
        />
      </div>
    </div>
  )
}
