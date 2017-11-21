import React from 'react'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { Field } from 'redux-form'
import { Flex } from 'components/Styled/Flex'
import { FormGroup } from 'components/Styled/Form'

import Input from 'components/Form/Input'

const Form = ({ handleSubmit, close, isSaving, isError, onDelete, data })  =>
<form onSubmit={handleSubmit}>
  <ModalBody>
    <FormGroup>
      <Field
        name="name"
        type="text"
        label="Contact Group Name:"
        component={Input}
        required
      />
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Flex space>
      <div>
        {
          isSaving
          ? <Button primary disabled>Saving...</Button>
          : <Button primary>Save</Button>
        }
        <Button type="button" blank onClick={close}>Cancel</Button>
      </div>
      {data.id && <Button type="button" onClick={onDelete}>Delete</Button>}
    </Flex>
  </ModalFooter>
</form>

export default Form
