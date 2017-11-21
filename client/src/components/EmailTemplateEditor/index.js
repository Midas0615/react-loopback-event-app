import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import { Row, Col } from 'react-styled-flexboxgrid'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import HtmlEditor from 'components/Form/HtmlEditor'

import { FormGroup } from 'components/Styled/Form'


var options = [
  { name: 'common' },
  { name: 'event' }
];

const Form = ({ handleSubmit })  =>
<form onSubmit={handleSubmit}>
  <Modal md title='Edit Email Template'>
    <ModalBody>
      <FormGroup>
        <Row>
          <Col sm={8}>
            <Field
              name="email"
              type="text"
              label="Template Name:"
              component={Input}
              required
            />
          </Col>
          <Col sm={4}>
            <Field
              name="type"
              type="text"
              label="Template Type:"
              component={Select}
              options={options}
              required
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Field
          name="subject"
          type="text"
          label="Email Subject:"
          component={Input}
          required
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="html"
          type="text"
          label="Email Content:"
          component={HtmlEditor}
          required
        />
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button primary>Save</Button> <Button blank>Cancel</Button>
    </ModalFooter>
  </Modal>
</form>


export default compose(
  withProps(({ dispatch }) => ({
    onSubmit: (data) => console.log(data)
  })),
  reduxForm({ form: 'email-template' }),
)(Form)
