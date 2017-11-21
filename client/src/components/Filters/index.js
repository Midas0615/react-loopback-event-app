import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Input, DatefieldWrapper, Datefield, DropdownWrapper, Dropdown } from 'components/Styled/Input'

const FilterWrapper = styled.form `
  margin: 1.5rem 0rem;
`

export default () =>
<FilterWrapper>
  <Input type="text" placeholder="Event" />
  <DatefieldWrapper>
    <Datefield type="text" placeholder="Begining Date" />
    <Fa icon='calendar' date />
  </DatefieldWrapper>
  <DatefieldWrapper>
    <Datefield type="text" placeholder="Ending Date" />
    <Fa icon='calendar' danger date />
  </DatefieldWrapper>
  <DropdownWrapper>
    <Dropdown type="text" placeholder="Selecta" />
    <Fa icon='angle-down' dropdown />
  </DropdownWrapper>
</FilterWrapper>
