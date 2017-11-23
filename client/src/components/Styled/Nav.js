import styled from 'styled-components'
import theme from 'styles/theme'

export const Nav = styled.div`
  border-bottom: 1px solid ${theme.border};
  background: #212025;
  display: flex;
  align-items: center;
  justify-content: space-between;
  * {
    text-decoration: none;
  }
`
