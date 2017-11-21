import React from 'react'
import { Modal, Content, Dialog, Overlay, ModalBody, ModalHeading, ModalFooter } from 'components/Styled/Modal'


export default ({ children, md, lg, width, title }) =>
<Modal>
  <Content>
    <Dialog md={md} lg={lg} width={width}>
      <ModalHeading>{title}</ModalHeading>
      {children}
    </Dialog>
  </Content>
  <Overlay />
</Modal>
