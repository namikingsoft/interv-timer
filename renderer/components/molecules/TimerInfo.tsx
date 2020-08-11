import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { TimerLabel } from '../atoms/TimerLabel'
import { TimerValue } from '../atoms/TimerValue'
import { HurryAnimationText } from '../atoms/HurryAnimationText'

interface Props {
  label: string
  remainSecond: number
  isActive?: boolean
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

const textBorderColorActive = '#36f'
const textBorderColorExpired = '#f00'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 14,
      userSelect: 'none',
    },
    active: {
      textShadow: `${textBorderColorActive} 1px 1px 0, ${textBorderColorActive} -1px -1px 0, ${textBorderColorActive} -1px 1px 0, ${textBorderColorActive} 1px -1px 0, ${textBorderColorActive} 0px 1px 0, ${textBorderColorActive}  0 -1px 0, ${textBorderColorActive} -1px 0 0, ${textBorderColorActive} 1px 0 0`,
    },
    expired: {
      color: '#000',
      textShadow: `${textBorderColorExpired} 1px 1px 0, ${textBorderColorExpired} -1px -1px 0, ${textBorderColorExpired} -1px 1px 0, ${textBorderColorExpired} 1px -1px 0, ${textBorderColorExpired} 0px 1px 0, ${textBorderColorExpired}  0 -1px 0, ${textBorderColorExpired} -1px 0 0, ${textBorderColorExpired} 1px 0 0`,
    },
    disabled: {
      opacity: 0.25,
    },
  }),
)

export const TimerInfo: React.FC<Props> = ({
  label,
  remainSecond,
  isActive,
  disabled,
  className,
  'data-testid': testId,
}) => {
  const classes = useStyles({})

  return (
    <div
      className={classnames(
        className,
        classes.root,
        disabled && classes.disabled,
      )}
      data-testid={testId}
    >
      <TimerLabel
        className={classnames(isActive && classes.active, 'label')}
        data-testid={`${testId}Label`}
      >
        {label}
      </TimerLabel>
      <HurryAnimationText
        hurry={isActive && remainSecond > 10 && remainSecond < 30}
        hurryUp={isActive && remainSecond >= 0 && remainSecond <= 10}
      >
        <TimerValue
          remainSecond={remainSecond}
          className={classnames(remainSecond < 0 && classes.expired, 'value')}
          data-testid={`${testId}Value`}
        />
      </HurryAnimationText>
    </div>
  )
}
