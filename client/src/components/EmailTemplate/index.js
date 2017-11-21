import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'

export default () =>
<Modal lg title='Sample Model'>
  <ModalBody>
    Some Content
  </ModalBody>
  <ModalFooter>
    <Button primary>Save</Button> <Button blank>Cancel</Button>
  </ModalFooter>
</Modal>
