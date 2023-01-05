import React from 'react'
import { styled } from '@mui/material/styles'

interface Props {
  className?: string
  children: React.ReactNode
  isActive?: boolean
  'data-testid'?: string
}

const textBorderColorActive = '#36f'

const ContainerDiv = styled('div')<Pick<Props, 'isActive'>>(({ isActive }) => ({
  fontSize: 13,
  marginBottom: -5,
  textShadow: isActive
    ? `${textBorderColorActive} 1px 1px 0, ${textBorderColorActive} -1px -1px 0, ${textBorderColorActive} -1px 1px 0, ${textBorderColorActive} 1px -1px 0, ${textBorderColorActive} 0px 1px 0, ${textBorderColorActive}  0 -1px 0, ${textBorderColorActive} -1px 0 0, ${textBorderColorActive} 1px 0 0`
    : undefined,
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
      data-testid={testId}
      isActive={isActive}
    >
      {children}
    </ContainerDiv>
  )
}
