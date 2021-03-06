import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import { Flex } from 'components/Styled/Flex'
import { Row, Col } from 'react-styled-flexboxgrid'

import { FormGroup } from 'components/Styled/Form'
import Input from 'components/Form/Input'
import Address from 'components/Form/Address'
import Calendar from 'components/Form/Calendar'
import Textarea from 'components/Form/Textarea'
import Select from 'components/Form/Select'
import AsyncSelect from 'components/Form/AsyncSelect'

import API from 'services/api'
import _ from 'lodash'

const getTitles = async(input) => {
  // from contact table, fetch all titles match with inputed text.
  const filter = JSON.stringify({ where: {title: {ilike: `%${input}%`} }})
  const allOptions = await API().get('/contacts', {params: {filter}})
  // remove duplicated titles using lodash.
  let options = _.uniqBy(allOptions, 'title');
  // const options = _.take(_.uniqBy(allOptions, 'title'), 7);
  if (options.length === 0) {
    // if there is no title match with inputed text, allow user to register the title.
    options = [{ name: input }];
  } else {
    options = options.map(option => {
      return {name: option.title}
    });
  }

  return {options}
}

const getOptions = async(input) => {
  const filter = JSON.stringify({ where: {name: {ilike: `%${input}%`} }, limit: 7 })
  const options = await API().get('/contact-groups', {params: {filter}})
  return {options}
}

const Form = ({ handleSubmit, close, isSaving, isError, onDelete, data })  =>
<form onSubmit={handleSubmit}>
<Modal md title='Contact Editor'>
    <ModalBody>
      <FormGroup>
        <Row>
          <Col sm={2}>
            <Field
              name="title"
              type="text"
              label="Title:"
              loadOptions={getTitles}
              component={AsyncSelect}
              labelKey='name'
            />
          </Col>
          <Col sm={5}>
            <Field
              name="firstName"
              type="text"
              label="First Name:"
              component={Input}
              // required
            />
          </Col>
          <Col sm={5}>
            <Field
              name="lastName"
              type="text"
              label="Last Name:"
              component={Input}
              required
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={4}>
            <Field
              name="email"
              type="email"
              label="Email:"
              component={Input}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="organization"
              type="text"
              label="Organization:"
              component={Input}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="contactGroup"
              type="text"
              label="Contact Group:"
              loadOptions={getOptions}
              component={AsyncSelect}
              labelKey='name'
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={4}>
            <Field
              name="address1"
              type="text"
              label="Address #1:"
              component={Address}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="address2"
              type="text"
              label="Address #2:"
              component={Address}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="address3"
              type="text"
              label="Address #3:"
              component={Address}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={4}>
            <Field
              name="zip"
              type="text"
              label="Postal Code:"
              component={Input}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="city"
              type="text"
              label="City:"
              component={Address}
            />
          </Col>
          <Col sm={4}>
            <Field
              name="phone"
              type="text"
              label="Phone:"
              component={Input}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Field
          name="comment"
          type="text"
          label="Notes:"
          component={Textarea}
        />
    </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Flex space>
        <div>
          {
            isSaving
            ? <Button mr={0.5} primary disabled>Saving...</Button>
            : <Button mr={0.5} primary>Save</Button>
          }
          <Button type="button" blank onClick={close}>Cancel</Button>
        </div>
        {data.id && <Button danger type="button" onClick={onDelete}>Delete</Button>}

      </Flex>
    </ModalFooter>
  </Modal>
</form>

export default Form
