// https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_modals.scss
import styled, { keyframes } from 'styled-components'
import theme from 'styles/theme'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
`

export const Modal = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;

`

export const Content = styled.div`
  position: relative;
  background-clip: padding-box;
  outline: 0;
  z-index: 10;
  overflow-y: auto;
  height: 100%;
  padding: 1rem;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  animation: ${fadeIn} 0.2s ease-in-out;
  background-color: rgba(0,0,0,0.7);
`

export const Dialog = styled.div`
  margin: auto;
  box-sizing: border-box;
  max-width: 640px;
  ${props => props.lg && `max-width: 1200px;`};
  ${props => props.md && `max-width: 960px;`};
  ${props => props.width && `max-width: ${props.width}`};
  background: #FFF;
  box-shadow: 0 3px 9px rgba(0,0,0,.2);
  border-bottom: 1px solid ${theme.border};
  border-radius: ${theme.borderRadius};
  margin-top: 3rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`

export const ModalBody = styled.div`
  max-height: 70vh;
  box-sizing: border-box;
  padding: 1rem;
  overflow-y: auto;
`

export const ModalHeading = styled.div`
  border-bottom: 1px solid ${theme.border};
  padding: 1rem;
  background: ${theme.light.darken(0.05)};
  padding: 1.5rem 1rem;
  border-top-left-radius: ${theme.borderRadius};
  border-top-right-radius: ${theme.borderRadius};
`

export const ModalFooter = styled.div`
  border-top: 1px solid ${theme.border.lighten(0.1)};
  padding: 1rem;
  background: ${theme.light.lighten(0.05)};
  padding: 1.5rem 1rem;
  border-bottom-left-radius: ${theme.borderRadius};
  border-bottom-right-radius: ${theme.borderRadius};
`
