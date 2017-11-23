import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.label`
  padding: 0.35rem 1.25rem;
  display: flex;
  align-items: center;
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
  -webkit-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
  box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);

${'' /* Type */}
${props => props.blank && css`
  border-bottom: 1px solid ${theme.dark};
  color: ${theme.dark}
`};

`
