import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.span`
  font-size: ${props => props.tiny ?  props.theme.fontSmall : null};
  font-size: ${props => props.giant ?  props.theme.fontGiant : null};
  font-size: ${props => props.large ?  props.theme.fontLarge : null};
  color: ${props => props.success ?  props.theme.success : null};
  color: ${props => props.warning ?  props.theme.warning : null};
  color: ${props => props.gray ?  props.theme.gray : null};
  color: ${props => props.danger ?  props.theme.danger : null};
  font-weight: ${props => props.bold ?  '500': null};
  ${props => props.weight && `font-weight: ${props.weight}`};
  text-transform: ${props => props.uppercase ?  'uppercase': null};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};
  cursor: ${props => props.pointer ?  'pointer' : null};
`
