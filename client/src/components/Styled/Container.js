import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.div`
  max-width: 1200px;
  ${props => props.width && `max-width: ${props.width}px`};
  margin: auto;
  box-sizing: border-box;
`
