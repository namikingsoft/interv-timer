import React from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'

const textBorderColor = '#333'

interface IsDragRegionProps {
  isDragRegion?: boolean
}

const ContainerDiv = styled('div')<IsDragRegionProps>(({ isDragRegion }) => ({
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  height: '100%',
  color: 'white',
  textShadow: `${textBorderColor} 1px 1px 0, ${textBorderColor} -1px -1px 0, ${textBorderColor} -1px 1px 0, ${textBorderColor} 1px -1px 0, ${textBorderColor} 0px 1px 0, ${textBorderColor}  0 -1px 0, ${textBorderColor} -1px 0 0, ${textBorderColor} 1px 0 0`,
  WebkitAppRegion: isDragRegion ? 'drag' : undefined,
}))

const Nav = styled('nav')(() => ({
  flex: '0 1 50px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  WebkitAppRegion: 'drag',
  '& button': {
    WebkitAppRegion: 'no-drag',
  },
  // Icon
  '& svg': {
    filter: 'drop-shadow(0px 0px 1.5px black);',
  },
}))

const NavLeftDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const NavRightDiv = NavLeftDiv

const BodyDiv = styled('div')(() => ({
  flex: '1 1 auto',
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '15px 0',
  borderTop: '1px solid rgba(255,255,255,0.05)',
}))

const FooterDiv = styled('div')(() => ({
  flex: '0 1 auto',
  paddingTop: '12px',
  paddingBottom: '7px',
  borderTop: '1px solid rgba(255,255,255,0.05)',
}))

interface Props {
  className?: string
  nav: React.ReactNode
  navRight?: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
  onDoubleClick?: () => void
  isDragRegion?: boolean
}

export const AppLayout: React.FC<Props> = ({
  className,
  nav,
  navRight,
  body,
  footer,
  onDoubleClick,
  isDragRegion,
}) => {
  return (
    <ContainerDiv
      className={className}
      onDoubleClick={onDoubleClick}
      isDragRegion={isDragRegion}
    >
      <Nav>
        <NavLeftDiv>{nav}</NavLeftDiv>
        <NavRightDiv>{navRight}</NavRightDiv>
      </Nav>
      <BodyDiv>
        <Container>{body}</Container>
      </BodyDiv>
      {footer && (
        <FooterDiv>
          <Container>{footer}</Container>
        </FooterDiv>
      )}
    </ContainerDiv>
  )
}
