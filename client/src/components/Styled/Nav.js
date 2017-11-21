import styled from 'styled-components'
import theme from 'styles/theme'

export const Nav = styled.div`
  padding: 0 1rem;
  border-bottom: 1px solid ${theme.border};
  background: ${theme.base};
  * {
    line-height: 60px;
    text-decoration: none;
  }
`
