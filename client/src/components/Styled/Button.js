import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.button`
  border: 1px solid ${theme.border};
  color: ${theme.medium};
  padding: .5rem .75rem;
  outline: 0;
  cursor: pointer;
  font-size: 0.8rem;
  ${props => props.primary && css`
    background: ${theme.primary};
    color: ${theme.light};
    border: none;
  `};
`