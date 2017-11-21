import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : null};
  justify-content: ${props => props.space ? 'space-between' : null};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.mt && `margin-top: ${props.mt}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};
`
