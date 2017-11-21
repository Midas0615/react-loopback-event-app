import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import Input from 'components/Form/Input'
import { FormGroup } from 'components/Styled/Form'


const Form = ({ handleSubmit })  =>
<form onSubmit={handleSubmit}>
<Modal lg title='Contact Editor'>
    <ModalBody>
      <FormGroup>
        <Field
          name="email"
          type="text"
          label="email:"
          component={Input}
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
  reduxForm({ form: 'contact' }),
)(Form)
