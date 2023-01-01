import React from 'react'
import { styled } from '@mui/material/styles'
import { calcTimerLabelFromRemainSecond } from '../../modules/timer/util'

interface Props {
  className?: string
  remainSecond: number
  'data-testid'?: string
}
const textBorderColorExpired = '#f00'

const ContainerDiv = styled('div')(() => ({
  fontSize: 24,
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
      sx={
        remainSecond < 0 && {
          color: '#000',
          textShadow: `${textBorderColorExpired} 1px 1px 0, ${textBorderColorExpired} -1px -1px 0, ${textBorderColorExpired} -1px 1px 0, ${textBorderColorExpired} 1px -1px 0, ${textBorderColorExpired} 0px 1px 0, ${textBorderColorExpired}  0 -1px 0, ${textBorderColorExpired} -1px 0 0, ${textBorderColorExpired} 1px 0 0`,
        }
      }
      data-testid={testId}
    >{`${hour}:${minute}:${second}`}</ContainerDiv>
  )
}
