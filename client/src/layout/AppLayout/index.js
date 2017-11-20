import React from 'react'
import Header from 'components/Header'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 960px;
  margin: auto;
  box-sizing: border-box;
`

export default ({ children }) => (
  <div>
    <Header />
    <Container>
      {children}
    </Container>
  </div>
)
