import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

const Form = ({ handleSubmit })  =>
<Modal lg title='Event Editor'>
  <ModalBody>
    <form onSubmit={handleSubmit}>
      Some Content
    </form>
  </ModalBody>
  <ModalFooter>
    <Button primary>Save</Button> <Button blank>Cancel</Button>
  </ModalFooter>
</Modal>


export default compose(
  withProps(({ dispatch }) => ({
    onSubmit: (data) => console.log(data)
  })),
  reduxForm({ form: 'event' }),
)(Form)
