import React from 'react'
import Header from 'components/Header'
import Container from 'components/Styled/Container'
import styled from 'styled-components'

export default ({ children }) => (
  <div>
    <Header />
    <Container>
      {children}
    </Container>
  </div>
)
