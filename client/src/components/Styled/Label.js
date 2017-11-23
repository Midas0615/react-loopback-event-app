import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.label`
  padding: 0.35rem 1rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-size: .7rem;
  font-weight: 500;
  letter-spacing: 1px;
  max-width: fit-content;
  color: ${theme.base};
  border-radius: ${theme.borderRadius};
  background-color: ${props => props.success ?  props.theme.success : null};
  background-color: ${props => props.warning ?  props.theme.warning : null};
  background-color: ${props => props.gray ?  props.theme.gray : null};
  background-color: ${props => props.danger ?  props.theme.danger : null};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.mb && `margin-bottom: ${props.mb}rem`};
  ${props => props.mt && `margin-top: ${props.mt}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};
${props => props.blank && css`
  border-bottom: 1px solid ${theme.dark};
  color: ${theme.dark}
`};

`
