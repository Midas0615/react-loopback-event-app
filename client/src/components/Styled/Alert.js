import styled, { css, keyframes } from 'styled-components'
import theme from 'styles/theme'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
`


export default styled.div`
  padding: .75rem;
  border-radius: ${theme.borderRadius};
  animation: ${fadeIn} 0.4s ease-in;
  ${p => p.success && css`
    border: 1px solid ${theme.success.lighten(0.3)};
    background: ${theme.success.lighten(0.5)};
    color: ${theme.success.darken(0.5)};
  `};
  ${p => p.warning && css`
    border: 1px solid ${theme.warning.lighten(0.3)};
    background: ${theme.warning.lighten(0.5)};
    color: ${theme.warning.darken(0.5)};

  `};
  ${p => p.error && css`
    border: 1px solid ${theme.danger.lighten(0.3)};
    background: ${theme.danger.lighten(0.5)};
    color: ${theme.danger.darken(0.5)};

  `};
  ${p => p.info && css`
    border: 1px solid ${theme.primary.lighten(0.3)};
    background: ${theme.primary.lighten(0.5)};
    color: ${theme.primary.darken(0.5)};
  `};

  p {
    margin: 0;
  }

`
