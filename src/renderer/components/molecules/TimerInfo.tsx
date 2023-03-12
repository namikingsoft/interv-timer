import React from 'react'
import { styled } from '@mui/material/styles'
import { TimerLabel } from '../atoms/TimerLabel'
import { TimerValue } from '../atoms/TimerValue'
import { HurryAnimationText } from '../atoms/HurryAnimationText'
import { hurrySecond, hurryUpSecond } from '../../modules/timer/const'

interface Props {
  label: string
  remainSecond: number
  isActive?: boolean
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

const ContainerDiv = styled('div')<Pick<Props, 'disabled'>>(({ disabled }) => ({
  userSelect: 'none',
  opacity: disabled ? 0.25 : undefined,
}))

export const TimerInfo: React.FC<Props> = ({
  label,
  remainSecond,
  isActive,
  disabled,
  className,
  'data-testid': testId,
}) => {
  return (
    <ContainerDiv
      className={className}
      data-testid={testId}
      disabled={disabled}
    >
      <TimerLabel isActive={isActive} data-testid={`${testId}Label`}>
        {label}
      </TimerLabel>
      <HurryAnimationText
        hurry={
          isActive && remainSecond > hurryUpSecond && remainSecond < hurrySecond
        }
        hurryUp={isActive && remainSecond >= 0 && remainSecond <= hurryUpSecond}
      >
        <TimerValue
          remainSecond={remainSecond}
          data-testid={`${testId}Value`}
        />
      </HurryAnimationText>
    </ContainerDiv>
  )
}
