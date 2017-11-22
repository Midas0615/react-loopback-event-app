import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { InputGroup } from 'components/Styled/Input'
import { compose, withHandlers, withProps } from 'recompose'

import Button from 'components/Styled/Button'

import { Field, reduxForm } from 'redux-form'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Calendar from 'components/Form/Calendar'
import moment from 'moment'


const FilterWrapper = styled.form `
  margin: 1.25rem 0rem;
  background: #fff;
  padding: 1rem 1rem;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.74);
`

const FILTER_MARGIN = 0.75;

var orderBy = [
  { value: 'eventDate ASC', name: 'Event Date, ASC' },
  { value: 'eventDate DESC', name: 'Event Date, DESC' },
  { value: 'name ASC', name: 'Event Name, ASC' },
  { value: 'name DESC', name: 'Event Name, DESC' },
];

const Filter =  ({ fetch, handleSubmit }) =>
<form onSubmit={handleSubmit}>
  <InputGroup mr={FILTER_MARGIN}>
    <Field
      name="name"
      placeholder='event name'
      component={Input}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN}>
    <Field
      name="from_date"
      placeholder='from date'
      allDates
      component={Calendar}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN}>
    <Field
      name="to_date"
      placeholder='to date'
      allDates
      component={Calendar}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN} width={10}>
    <Field
      name="orderBy"
      placeholder='Order By'
      component={Select}
      options={orderBy}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN} width={10}>
    <Field
      name="limit"
      placeholder='Results Per Page'
      component={Input}
    />
  </InputGroup>

  <button>Apply Filter</button>
</form>

export default compose(
  withHandlers({
    onSubmit: ({ fetch }) => filter => {
      const where = {};
      let order = 'eventDate DESC'
      // Name
      if (filter.name) where.name = {ilike: `%${filter.name}%`}
      // Date
      if (filter.from_date) where.eventDate = {gte: moment(filter.from_date).format() }
      if (filter.to_date) where.eventDate = {lte: moment(filter.to_date).format() }
      if (filter.from_date && filter.to_date) where.eventDate = {between: [moment(filter.from_date).format(), moment(filter.to_date).format()]}
      if (filter.orderBy) order = filter.orderBy.value
      const params = { limit: parseInt(filter.limit) || 10, order: order, where }
      fetch('events', params)
    }
  }),
  reduxForm({ form: 'filters' }),
)(Filter)
