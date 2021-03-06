import React from 'react'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import HtmlEditor from 'components/Form/HtmlEditor'
import { Row, Col } from 'react-styled-flexboxgrid'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { FormGroup } from 'components/Styled/Form'
import { Field } from 'redux-form'
import { Flex } from 'components/Styled/Flex'

var options = [
  { name: 'common' },
  { name: 'event' }
];

const Form = ({ handleSubmit, type, close, isSaving, isError, onDelete, data })  =>
<form onSubmit={handleSubmit}>
  <Field name="id" component="input" type='hidden' />
  <Modal md title={`${data.id ? 'Edit' : 'Create'} Email Template`} close={close}>
    <ModalBody>
      <FormGroup>
        <Row>
          <Col sm={8}>
            <Field
              name="name"
              type="text"
              label="Template Name:"
              component={Input}
              disabled={type && type.name === 'system'}
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
              disabled={type && type.name === 'system'}
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
          label="Email Content:"
          component={HtmlEditor}
          required
        />
      </FormGroup>
      <FormGroup>
        { type && type.name === 'common' &&
          <small>Available tags: <code>title, firstName, lastName</code></small>
        }
        { type && type.name === 'event' &&
          <small>Available tags: <code>title, firstName, lastName, eventName, eventDate, eventLocation</code></small>
        }
        { type && type.name === 'system' &&
          <small>Available tags: <code>title, firstName, lastName, eventName, eventDate, eventLocation, attendingUrl, notAttendingUrl.</code></small>
        }
      </FormGroup>
      {
        isError &&
        <div>
          Some Alert Here
        </div>
      }
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
        { type && type.name !== 'system' && <Button danger type="button" onClick={onDelete}>Delete</Button> }

      </Flex>
    </ModalFooter>
  </Modal>
</form>


export default Form
