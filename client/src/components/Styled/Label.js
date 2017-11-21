import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.label`
  padding: 0.35rem 1.25rem;
  max-width: fit-content;
  color: ${theme.base};
  border-radius: 7px;
  font-size: ${theme.fontLabel};
  background-color: ${props => props.success ?  props.theme.success : null};
  background-color: ${props => props.warning ?  props.theme.warning : null};
  background-color: ${props => props.gray ?  props.theme.gray : null};
`
