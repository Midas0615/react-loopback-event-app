import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { InputGroup } from 'components/Styled/Input'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import API from 'services/api'
import Button from 'components/Styled/Button'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Calendar from 'components/Form/Calendar'
import moment from 'moment'
import AsyncSelect from 'components/Form/AsyncSelect'


const FilterWrapper = styled.form `
  margin: 1.25rem 0rem;
  background: #fff;
  padding: 1rem 1rem;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.74);
`

const getOptions = async(input) => {
  const filter = JSON.stringify({ where: {name: {ilike: `%${input}%`}, deleted: false}, limit: 7 })
  const options = await API().get('/contact-groups', {params: {filter}})
  return {options}
}

const FILTER_MARGIN = 0.75;

var orderBy = [
  { value: 'firstName ASC', name: 'First Name, ASC' },
  { value: 'firstName DESC', name: 'First Name, DESC' },
  { value: 'lastName ASC', name: 'Last Name, ASC' },
  { value: 'lastName DESC', name: 'Last Name, DESC' },
  { value: 'organization ASC', name: 'Organization, ASC' },
  { value: 'organization DESC', name: 'Organization, DESC' },
  { value: 'zip ASC', name: 'Postal Code, ASC' },
  { value: 'zip DESC', name: 'Postal Code, DESC' },
  { value: 'email ASC', name: 'Email, ASC' },
  { value: 'email DESC', name: 'Email, DESC' },
  { value: 'phone ASC', name: 'Phone, ASC' },
  { value: 'phone DESC', name: 'Phone, DESC' },
  { value: 'city ASC', name: 'City, ASC' },
  { value: 'city DESC', name: 'City, DESC' },
];

var filterType = [
  { value: 'firstName', name: 'First Name' },
  { value: 'lastName', name: 'Last Name' },
  { value: 'organization', name: 'Organization' },
  { value: 'email', name: 'Email' },
  { value: 'zip', name: 'Postal Code' },
  { value: 'city', name: 'City' },
  { value: 'phone', name: 'Phone' }, 
  { value: 'event', name: 'Event' }  
];

const Filter =  ({ fetch, handleSubmit, type }) =>
<form onSubmit={handleSubmit}>
  <InputGroup mr={FILTER_MARGIN} width={10}>
    <Field
      name="filterType"
      placeholder='Filter Type'
      component={Select}
      options={filterType}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN}>
    <Field
      name="filterValue"
      placeholder=''
      component={Input}
      disabled={!type}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN} width={10}>
    <Field
      name="contactGroup"
      type="text"
      placeholder="Contact Group"
      loadOptions={getOptions}
      component={AsyncSelect}
      labelKey='name'
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
  <InputGroup mr={FILTER_MARGIN} width={5}>
    <Field
      name="limit"
      placeholder='Per Page'
      component={Input}
    />
  </InputGroup>
  <InputGroup mr={FILTER_MARGIN} width={11}>
    <Field
      name="deleted"
      placeholder='Deleted Contacts'
      component={Select}
      options={[{name: 'Show Deleted'}]}
    />
  </InputGroup>
  <Button primary sm>Apply Filter</Button>
</form>

const selector = formValueSelector('contactFilters')
export default compose(
  connect(state => ({
    type: selector(state, 'filterType')
  })),
  withHandlers({
    onSubmit: ({ fetch }) => filter => {
      const where = {};
      let order = 'lastName ASC'
      // Name
      if (filter.filterType && filter.filterValue) {
        if (filter.filterType.value === 'event')
          where['name'] = {ilike: `%${filter.filterValue}%`}
        else 
          where[filter.filterType.value] = {ilike: `%${filter.filterValue}%`}
      }
      
      if (filter.contactGroup) where.contactGroupId = filter.contactGroup.id
      where.deleted = filter.deleted ? true : false;
      if (filter.orderBy) order = filter.orderBy.value      
      
      if (filter.filterType && filter.filterType.value === 'event') {
        const params = { limit: parseInt(filter.limit) || 10, order: order, data: { where, include: {'contacts': 'contactGroup'}} }
        fetch('event-contacts', params)
      } else {
        const params = { limit: parseInt(filter.limit) || 10, order: order, where, include: 'contactGroup' }
        fetch('contacts', params)
      }
    }
  }),
  reduxForm({ form: 'contactFilters' }),
)(Filter)
