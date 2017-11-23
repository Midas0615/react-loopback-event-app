import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : null};
  justify-content: ${props => props.space ? 'space-between' : null};
  align-items: ${props => props.itemsCenter ? 'center' : null};
  align-items: ${props => props.itemsEnd ? 'flex-end' : null};
  align-items: ${props => props.itemsStart ? 'flex-start' : null};
  flex-direction: ${props => props.column ? 'column' : null};
  flex-grow: ${props => props.grow ? '1' : null};

  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.mt && `margin-top: ${props.mt}rem`};
  ${props => props.mb && `margin-bottom: ${props.mb}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};
`
