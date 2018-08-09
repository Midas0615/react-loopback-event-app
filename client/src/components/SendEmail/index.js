// can have contactId, eventId
import React from 'react'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter, ModalHeading } from 'components/Styled/Modal'
import { Table } from 'components/Styled/Table'
import Button from 'components/Styled/Button'
import { Flex } from 'components/Styled/Flex'
import { compose, withProps, lifecycle, withState } from 'recompose'
import Select from 'react-select'
import Input from 'components/Form/Input'
import API from 'services/api'
import moment from 'moment';

const SendEmail = ({ options, handleChange, emailTemplate, eventId, contacts, events, contactId, modal, toggleModal, handleBackClick, handleSendClick, handlePreviewClick, caption, isSending, isPreview, disabled })  => {
  if (!modal) return <Button onClick={() => toggleModal(true)} disabled={disabled} primary sm>{caption || 'Send Email'}</Button>
  if (!emailTemplate) {
    emailTemplate = {}
  }
  var {subject, html} = emailTemplate;
  var [contact] = contacts;
  var event = {};
  if (events.length > 0) {
    event = events[0]
  }
  var eventDate = moment(new Date(event.eventDate)).format('LLLL');
  if (subject) {
    subject = subject.replace(/{{title}}/g , contact.title);
    subject = subject.replace(/{{firstName}}/g , contact.firstName);
    subject = subject.replace(/{{lastName}}/g , contact.lastName);

    subject = subject.replace(/{{eventName}}/g , event.name);
    subject = subject.replace(/{{eventDate}}/g , eventDate);
    subject = subject.replace(/{{eventLocation}}/g , event.eventLocation);

    subject = subject.replace(/{{attendingUrl}}/g , '/');
    subject = subject.replace(/{{notAttendingUrl}}/g , '/');

    html = html.replace(/{{title}}/g , contact.title);
    html = html.replace(/{{firstName}}/g , contact.firstName);
    html = html.replace(/{{lastName}}/g , contact.lastName);

    html = html.replace(/{{eventName}}/g , event.name);
    html = html.replace(/{{eventDate}}/g , eventDate);
    html = html.replace(/{{eventLocation}}/g , event.eventLocation);

    html = html.replace(/{{attendingUrl}}/g , '/');
    html = html.replace(/{{notAttendingUrl}}/g , '/');

  }

  const title = isPreview ? subject : "Send Email";
  return (
    <Modal title={title}>
      <ModalBody>
        {
          isPreview
          ? <table style = {{
              width: '100%',
              height: 'auto',
              color: '#333',
              fontFamily: 'Arial, sans-serif',
              fontSize: 17,
              lineHeight: 1.6,
              border: '1px solid #CCC',
              borderCollapse: 'collapse'
            }}><tbody>
              <tr style={{background: '#212025'}} >
                <td style={{margin: 0, padding: 0, lineHeight: 0}}>
                  <img src="https://i.imgur.com/qj2eB2V.png" alt="" />
                </td>
              </tr>
              <tr>
                <td style={{padding: 20, paddingBottom: 40}}>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: 20,
                  background: '#EEE',
                  fontSize: 15,
                  borderTop: '1px solid #CCC',
                  borderBottom: '1px solid #CCC'
                }}>
                  <strong>Harriet Carpaldi</strong><br />
                  Genesis Foundation <br />
                  <a
                    href="mailto:harriet.capaldi@tgf.org.uk"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      borderBottom: '1px solid #CCC'}}>
                    harriet.capaldi@tgf.org.uk
                  </a><br />
                </td>
              </tr>
            </tbody></table>
          : <React.Fragment>
            <p>Select Email Template:</p>
            <Select
              options={options}
              labelKey='name'
              value={emailTemplate}
              placeholder='Select Email'
              onChange={handleChange}
            />
          </React.Fragment>
        }
        {
          eventId && !contactId &&
          <p>You are about to send emails to <strong>ALL</strong> contacts who are attending this event.</p>
        }
      </ModalBody>
      <ModalFooter>
        <Flex space>
          <div>
            {!isPreview &&
              <React.Fragment>
                <Button primary onClick={handlePreviewClick} disabled={!emailTemplate}>Preview</Button>
                <Button type="button" blank onClick={() => toggleModal(false)}>Cancel</Button>
              </React.Fragment>
            }
            {isPreview &&
              <React.Fragment>
                {
                  isSending
                  ? <Button primary disabled>Sending...</Button>
                  : <Button primary onClick={handleSendClick} disabled={!emailTemplate}>Send</Button>
                }
                <Button type="button" blank onClick={handleBackClick}>Back</Button>
              </React.Fragment>
            }
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
      const inviteId = this.props.inviteId;
      // Set Proper Filter
      let filter;
      if (eventId) filter = JSON.stringify({where: {type: {neq: 'system'}}});
      if (!eventId) filter = JSON.stringify({where: {type: 'common'}});
      if (contactId && inviteId ) filter = JSON.stringify({});
      const options = await API().get('/email-templates', {params: {filter}});
      this.setState({ options })
    }
  }),
  withState('modal','toggleModal', false),
  withState('emailTemplate', 'setTemplate', null),
  withState('isSending', 'setSending', false),
  withState('isPreview', 'setPreview', false),
  withProps(({ options, setTemplate, emailTemplate, setSending, setPreview, eventId, contactId, toggleModal, inviteId }) => ({
    options,
    handleChange: (selectedTemplate) => {
      setTemplate(selectedTemplate)
    },
    handlePreviewClick:() => {
      setPreview(true)
    },
    handleBackClick:() => {
      setPreview(false)
    },
    handleSendClick: async () => {
      setSending(true)
      if (eventId && !contactId) {
        await API().post(`/events/${eventId}/contacts/send-emails`, { emailTemplateId: emailTemplate.id, inviteId: inviteId })
        setSending(false)
        toggleModal(false)
      }
      if (contactId && !eventId) {
        await API().post(`/contacts/${contactId}/send-email`, { emailTemplateId: emailTemplate.id })
        setSending(false)
        toggleModal(false)
      }
      if (contactId && eventId) {
        await API().post(`/events/${eventId}/contacts/${contactId}/send-email`, { emailTemplateId: emailTemplate.id, inviteId: inviteId })
        setSending(false)
        toggleModal(false)
      }
    },
  })),
)(SendEmail)
