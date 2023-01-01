import React from 'react'
import { styled } from '@mui/material/styles'

interface Props {
  className?: string
  children: React.ReactNode
  isActive?: boolean
  'data-testid'?: string
}

const textBorderColorActive = '#36f'

const ContainerDiv = styled('div')(() => ({
  fontSize: 13,
  marginBottom: -5,
}))

export const TimerLabel: React.FC<Props> = ({
  className,
  isActive,
  children,
  'data-testid': testId,
}) => {
  return (
    <ContainerDiv
      className={className}
      sx={
        isActive && {
          textShadow: `${textBorderColorActive} 1px 1px 0, ${textBorderColorActive} -1px -1px 0, ${textBorderColorActive} -1px 1px 0, ${textBorderColorActive} 1px -1px 0, ${textBorderColorActive} 0px 1px 0, ${textBorderColorActive}  0 -1px 0, ${textBorderColorActive} -1px 0 0, ${textBorderColorActive} 1px 0 0`,
        }
      }
      data-testid={testId}
    >
      {children}
    </ContainerDiv>
  )
}
