import React from 'react'
import { styled } from '@mui/material/styles'
import { calcTimerLabelFromRemainSecond } from '../../modules/timer/util'

interface Props {
  className?: string
  remainSecond: number
  'data-testid'?: string
}
const textBorderColorExpired = '#f00'

const ContainerDiv = styled('div')<{ isExpired: boolean }>(({ isExpired }) => ({
  fontSize: 24,
  color: isExpired ? '#000' : undefined,
  textShadow: isExpired
    ? `${textBorderColorExpired} 1px 1px 0, ${textBorderColorExpired} -1px -1px 0, ${textBorderColorExpired} -1px 1px 0, ${textBorderColorExpired} 1px -1px 0, ${textBorderColorExpired} 0px 1px 0, ${textBorderColorExpired}  0 -1px 0, ${textBorderColorExpired} -1px 0 0, ${textBorderColorExpired} 1px 0 0`
    : undefined,
}))

export const TimerValue: React.FC<Props> = ({
  className,
  remainSecond,
  'data-testid': testId,
}) => {
  const { hour, minute, second } = calcTimerLabelFromRemainSecond(remainSecond)

  return (
    <ContainerDiv
      className={className}
      data-testid={testId}
      isExpired={remainSecond < 0}
    >{`${hour}:${minute}:${second}`}</ContainerDiv>
  )
}
