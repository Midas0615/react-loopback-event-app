import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Input, InputWrapper, Datefield } from 'components/Styled/Input'
import { Dropdown } from 'components/Styled/Dropdown'

const FilterWrapper = styled.form `
  margin: 1.25rem 0rem;
  background: #fff;
  padding: 1rem 1rem;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.74);
`

export default () =>
<FilterWrapper>
  <InputWrapper>
    <Input type="text" placeholder="Event" />
  </InputWrapper>
  <InputWrapper>
    <Datefield type="text" placeholder="Begining Date" />
    <Fa icon='calendar' gray date />
  </InputWrapper>
  <InputWrapper>
    <Datefield type="text" placeholder="Ending Date" />
    <Fa icon='calendar' gray date />
  </InputWrapper>
  <InputWrapper>
    <Dropdown type="text" placeholder="Selecta" />
    <Fa icon='angle-down' gray dropdown />
  </InputWrapper>
</FilterWrapper>
