// can have contactId, eventId
import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter, ModalHeading } from 'components/Styled/Modal'
import Button from 'components/Styled/Button'
import { Flex } from 'components/Styled/Flex'
import { compose, withProps, lifecycle, withState } from 'recompose'
import Select from 'react-select'
import Input from 'components/Form/Input'
import API from 'services/api'


const SendEmail = ({ options, handleChange, emailTemplate, eventId, contactId, modal, toggleModal, handleSendClick, caption, isSending })  => {
  if (!modal) return <Button onClick={() => toggleModal(true)} primary sm>{caption || 'Send Email'}</Button>
  return (
    <Modal title="Send Email">
      <ModalBody>
        <p>Select Email Template:</p>
        <Select
          options={options}
          labelKey='name'
          value={emailTemplate}
          placeholder='Select Email'
          onChange={handleChange}
       />
       {
        eventId && !contactId &&
        <p>You are about to send emails to <strong>ALL</strong> contacts who are attending this event.</p>
       }
      </ModalBody>
      <ModalFooter>
        <Flex space>
          <div>
            {
              isSending
              ? <Button primary disabled>Sending...</Button>
              : <Button primary onClick={handleSendClick} disabled={!emailTemplate}>Send</Button>
            }

            <Button type="button" blank onClick={() => toggleModal(false)}>Cancel</Button>
          </div>
        </Flex>
      </ModalFooter>
    </Modal>
  )
}

export default compose (
  lifecycle({
    async componentDidMount() {
      const eventId = this.props.eventId;
      const contactId = this.props.contactId;
      console.warn(eventId, contactId)
      // Set Proper Filter
      let filter;
      if (eventId) filter = JSON.stringify({});
      if (!eventId) filter = JSON.stringify({where: {type: 'common'}});
      const options = await API().get('/email-templates', {params: {filter}});
      this.setState({ options })
    }
  }),
  withState('modal','toggleModal', false),
  withState('emailTemplate', 'setTemplate', null),
  withState('isSending', 'setSending', false),
  withProps(({ options, setTemplate, emailTemplate, setSending, eventId, contactId, toggleModal }) => ({
    options,
    handleChange: (selectedTemplate) => {
      setTemplate(selectedTemplate)
    },
    handleSendClick: async () => {
      setSending(true)
      if (eventId && !contactId) {
        await API().post(`/events/${eventId}/contacts/send-emails`, { emailTemplateId: emailTemplate.id})
        setSending(false)
        toggleModal(false)
      }
      if (contactId && !eventId) {
        await API().post(`/contacts/${contactId}/send-email`, { emailTemplateId: emailTemplate.id})
        setSending(false)
        toggleModal(false)
      }
      if (contactId && eventId) {
        await API().post(`/events/${eventId}/contacts/${contactId}/send-email`, { emailTemplateId: emailTemplate.id})
        setSending(false)
        toggleModal(false)
      }
    },
  })),
)(SendEmail)
