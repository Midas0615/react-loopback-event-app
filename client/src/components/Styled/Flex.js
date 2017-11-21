import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : null}
`
