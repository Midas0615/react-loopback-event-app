import React from 'react'
import withPaginate from 'containers/withPaginate'
import withCrud from 'containers/withCrud'
import DataTable from 'components/DataTable'
import AppLayout from 'layout/AppLayout'
import API from 'services/api'
import SendEmail from 'components/SendEmail'
import moment from 'moment'
import styled from 'styled-components'
import theme from 'styles/theme'
import ContactEditor from 'components/ContactEditor'


import Fa from 'components/Fa'
import { compose, withProps, pure, lifecycle, withHandlers, withState } from 'recompose'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { Flex } from 'components/Styled/Flex'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Button } from 'components/Styled'
import Text from 'components/Styled/Text'
import Label from 'components/Styled/Label'
import { Link } from 'react-router-dom'


export const FormatStatus = ({status, eventDate}) => {
  const statusTense = moment().diff(eventDate, 'minutes') > 0 ? 'Attended' : 'Attending'
  return (
    <Flex itemsCenter>
      <Label
        mr={0.5}
        gray={status === 'unconfirmed'}
        success={status === 'attending'}
        warning={status === 'not-attending'}
        >
          { status === 'unconfirmed' && 'Unconfirmed' }
          { status === 'attending' && `${statusTense}` }
          { status === 'not-attending' && `Not ${statusTense}` }
      </Label> {' '}
    </Flex>
  )
}

export const Actions = ({ invite, changeStatus, eventDate }) => {
  const statusTense = moment().diff(eventDate, 'minutes') > 0 ? 'Attended' : 'Attending'
  return (
    <td>
      {invite.contact && <SendEmail inviteId={invite.id} contactId={invite.contactId} eventId={invite.eventId} disabled={!invite.contact.email} />}
      { invite.status === 'unconfirmed' &&
      <span>
        <Button sm ml={0.3} onClick={() => changeStatus('attending', invite.id)}>Set {statusTense}</Button>
        <Button sm ml={0.3} onClick={() => changeStatus('not-attending', invite.id)}>Set Not {statusTense}</Button>
      </span>
       }
      { invite.status ==='not-attending' && <Button sm ml={0.3} onClick={() => changeStatus('attending', invite.id)}>Set {statusTense}</Button> }
      { invite.status ==='attending' && <Button sm ml={0.3} onClick={() => changeStatus('not-attending', invite.id)}>Set Not {statusTense}</Button> }
    </td>
  )
}

const DataRow = ({ resource: invite, index, changeStatus }) => {
  const event = invite.event || {};
  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        <Link to={`/events/${event.id}`}>{event.name}</Link>  <br/>
        <small>{event.organization}</small>
      </td>
      <td>
        <FormatStatus status={invite.status} eventDate={event.eventDate} changeStatus={changeStatus} />
      </td>
      <Actions invite={invite} eventDate={invite.event.eventDate} changeStatus={changeStatus} />
    </tr>
  )
}


// refetchContact
const Contact = (props) => {
  if (!props.contact) return null;
  const contact = props.contact;
  return (
    <AppLayout>
      <Panel my={2}>
        <PanelHeading primary>
          <h3>{contact.firstName} {contact.lastName}</h3>
          <div>
            {/* Contacts Modal */}
            <Button sm mr={0.5} onClick={() => props.toggleModal(props.contact)}><Fa icon='ion-edit'/> Edit Contact</Button>
            <SendEmail contactId={contact.id} caption={`Send email to ${contact.firstName}`} />
            {  props.modal &&
              <ContactEditor
                data={props.modal}
                fetch={props.refetchContact}
                refetch={props.refetchContact}
                close={() => props.toggleModal(null)}
              /> }
          </div>
        </PanelHeading>
        <PanelBody>
          <Row>
            <Col sm={6}>
              <h5>Basic</h5>
              <Fa mr={0.5} icon="ion-person" /> {contact.title} {contact.firstName} {contact.lastName}
              <Fa ml={2} mr={0.5} icon="ion-ios-email-outline" />{contact.email || 'No Email'} <br/>
              <Fa mr={0.5} icon="ion-briefcase" /> {contact.organization || 'N/A'} <br/>
              <Fa mr={0.5} icon="ion-ios-telephone-outline" /> {contact.phone || 'N/A'} <br/>
            </Col>
            <Col sm={4}>
              <h5>Address</h5>
              <Fa mr={0.5} icon="ion-ios-location" />{contact.address1 || 'N/A'} <br/>
              <Fa mr={0.5} icon="ion-ios-location" />{contact.address2 || 'N/A'} <br/>
              <Fa mr={0.5} icon="ion-ios-location" />{contact.address3 || 'N/A'} <br/>
            </Col>
            <Col sm={2}>
              <h5>City/State</h5>
              <Fa mr={0.5} icon="ion-map" />{contact.city || 'N/A'} <br/>
              <Fa mr={0.5} icon="ion-pound" />{contact.zip || 'N/A'} <br/>
            </Col>
          </Row>
          <br/>
          <h5>Comment</h5>
          {contact.comment || 'N/A'}

        </PanelBody>
        <DataTable
          {...props}
          noDataCaption={`${contact.firstName} did not attend any event.`}
          Component={DataRow}
          heading={['', 'Name', 'Status', {width: 22, title: ''}]}
         />
      </Panel>
    </AppLayout>
  )
}



export default compose(
  lifecycle({
    async componentWillMount() {
      this.fetch()
      this.setState({ refetchContact: this.fetch.bind(this) })
    },
    async fetch() {
      const contact = await API().get(`/contacts/${this.props.match.params.contactId}`)
      this.setState({ contact })
    }
  }),
  withState('modal', 'toggleModal', null),
  withCrud,
  withProps(({ match, contact, fetch }) => {
    return {
      resource: 'invites',
      contact,
      params: {
        limit: 10,
        where: { contactId: match.params.contactId },
        include: 'event'
      },
    }
  }),
  withPaginate,
  withHandlers({
    changeStatus:  ({ refetch, upsert }) => async (status, id) => {
      await upsert('invites', { status }, id)
      await refetch()
    }
  })
)(Contact)
