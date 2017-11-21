import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Input, InputGroup } from 'components/Styled/Input'
import { Dropdown } from 'components/Styled/Dropdown'
import Select from 'react-select'

const FilterWrapper = styled.form `
  margin: 1.25rem 0rem;
  background: #fff;
  padding: 1rem 1rem;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.74);
`

const FILTER_MARGIN = 0.75;

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

export default () =>
<div>
  <InputGroup mr={FILTER_MARGIN}>
    <Input type="text" placeholder="Event" />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN}>
    <Input type="text" placeholder="Begining Date" />
    <Fa icon='calendar' gray input />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN}>
    <Input type="text" placeholder="Ending Date" />
    <Fa icon='calendar' gray input />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN} width={10}>
    <Select options={options} />
  </InputGroup>
</div>
