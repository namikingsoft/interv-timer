import React from 'react'
import { styled } from '@mui/material/styles'

interface Props {
  hurry?: boolean
  hurryUp?: boolean
  children: React.ReactNode
}

const ContainerSpan = styled('span')<Props>(({ hurry, hurryUp }) => ({
  display: 'inline-block',
  transformOrigin: 'center',
  animation: hurryUp
    ? 'hurryUp 1s ease-in-out 0s infinite normal'
    : hurry
    ? 'hurry 1s ease-in-out 0s infinite normal'
    : '',
  '@keyframes hurry': {
    '0%': {
      transform: 'scale(1, 1)',
    },
    '20%': {
      transform: 'scale(1.2, 1.2)',
    },
  },
  '@keyframes hurryUp': {
    '0%': {
      transform: 'scale(1, 1)',
    },
    '20%': {
      transform: 'scale(1.3, 1.3)',
      color: '#f33',
    },
  },
}))

export const HurryAnimationText: React.FC<Props> = ({
  hurry,
  hurryUp,
  children,
}) => {
  return (
    <ContainerSpan hurry={hurry} hurryUp={hurryUp}>
      {children}
    </ContainerSpan>
  )
}
