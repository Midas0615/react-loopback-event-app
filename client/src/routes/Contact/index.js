import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import withCrud from 'containers/withCrud'
import { compose, withProps, pure, lifecycle, withHandlers } from 'recompose'
import DataTable from 'components/DataTable'
import AppLayout from 'layout/AppLayout'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import API from 'services/api'
import Label from 'components/Styled/Label'
import SendEmail from 'components/SendEmail'

const Row = ({ resource: invite, index, changeStatus }) => {
  const event = invite.event || {};
  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        {event.name}  <br/>
        <small>{event.organization}</small>
      </td>
      <td>
        <Label
          gray={invite.status === 'unconfirmed'}
          success={invite.status === 'attending'}
          warning={invite.status === 'not-attending'}
          >{invite.status}
        </Label> {' '}
        {
          invite.status ==='unconfirmed' &&
          <div>
            <small onClick={() => changeStatus('attending', invite.id)}>Set Attending</small> | <small onClick={() => changeStatus('not-attending', invite.id)}>Set Not Attending</small>
          </div>
        }
        {
          invite.status === 'attending' &&
          <small onClick={() => changeStatus('not-attending', invite.id)}>Set Not Attending</small>
        }
        {
          invite.status === 'not-attending' &&
          <small onClick={() => changeStatus('attending', invite.id)}>Set Attending</small>
        }
      </td>
      <td><SendEmail contactId={invite.contactId} eventId={invite.eventId} /></td>
    </tr>
  )
}

const Contact = (props) => {
  if (!props.contact) return null;

  const contact = props.contact;
  return (
    <AppLayout>
      <Panel my={2}>
        <PanelHeading primary>
          <Flex center space>
            <strong>{contact.firstName} {contact.lastName}</strong>
          </Flex>
        </PanelHeading>
        <PanelBody>
          Contact Details Here
          <br/>
          <br/>
          <SendEmail contactId={contact.id} caption={`Send email to ${contact.firstName}`} />
        </PanelBody>
        <h2>{contact.firstName}'s Events</h2>
        <hr/>
        <DataTable
          {...props}
           Component={Row}
           heading={['', 'Name', 'Status', 'Actions']}
         />
      </Panel>
    </AppLayout>
  )
}



export default compose(
  lifecycle({
    async componentWillMount() {
      const contact = await API().get(`/contacts/${this.props.match.params.contactId}`)
      this.setState({ contact })
    }
  }),
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
      console.log(status)
      await refetch()
    }
  })
)(Contact)
