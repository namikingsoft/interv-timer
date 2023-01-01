import React from 'react'
import { styled } from '@mui/material/styles'
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

const ContainerDiv = styled('div')(() => ({
  userSelect: 'none',
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
      sx={disabled && { opacity: 0.25 }}
      data-testid={testId}
    >
      <TimerLabel isActive={isActive} data-testid={`${testId}Label`}>
        {label}
      </TimerLabel>
      <HurryAnimationText
        hurry={isActive && remainSecond > 10 && remainSecond < 30}
        hurryUp={isActive && remainSecond >= 0 && remainSecond <= 10}
      >
        <TimerValue
          remainSecond={remainSecond}
          data-testid={`${testId}Value`}
        />
      </HurryAnimationText>
    </ContainerDiv>
  )
}
