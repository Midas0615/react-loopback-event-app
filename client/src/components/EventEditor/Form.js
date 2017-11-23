import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { Field } from 'redux-form'
import { Flex } from 'components/Styled/Flex'
import { Row, Col } from 'react-styled-flexboxgrid'
import { FormGroup } from 'components/Styled/Form'

import Input from 'components/Form/Input'
import Address from 'components/Form/Address'
import Calendar from 'components/Form/Calendar'
import Textarea from 'components/Form/Textarea'

const Form = ({ handleSubmit, close, isSaving, isError, onDelete })  =>
<form onSubmit={handleSubmit}>
<Modal sm title='Event Editor' close={close}>
  <ModalBody>
    <FormGroup>
      <Field
        name="name"
        type="text"
        label="Event Name:"
        component={Input}
        required
      />
    </FormGroup>
    <FormGroup>
      <Row>
        <Col sm={6}>
          <Field
            name="location"
            type="text"
            label="Event Location:"
            component={Address}
            required
          />
        </Col>
        <Col sm={6}>
          <Field
            name="eventDate"
            type="text"
            label="Event Date:"
            component={Calendar}
            required
          />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Field
        name="comment"
        type="text"
        label="Comment:"
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
      <Button danger type="button" onClick={onDelete}>Delete</Button>
    </Flex>
  </ModalFooter>
</Modal>
</form>

export default Form
