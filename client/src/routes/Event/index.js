import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, withHandlers, pure, lifecycle } from 'recompose'
import DataTable from 'components/DataTable'
import SendEmail from 'components/SendEmail'
import AppLayout from 'layout/AppLayout'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import API from 'services/api'
import Label from 'components/Styled/Label'
import withCrud from 'containers/withCrud'

const Row = ({ resource: invite,index, changeStatus }) => {
  console.log(invite)
  const contact = invite.contact || {};

  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        {contact.firstName} {contact.lastName} <br/>
        <small>{contact.organization}</small>
      </td>
      <td>
        <Label
          gray={invite.status === 'unconfirmed'}
          success={invite.status === 'attending'}
          warning={invite.status === 'not-attending'}
          >{invite.status}</Label>
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

const Event = (props) => {
  if (!props.event) return null
  const event = props.event;
  return (
    <AppLayout>
      <Panel my={2}>
        <PanelHeading primary>
          <Flex center space>
            <strong>{event.name}</strong>

          </Flex>
        </PanelHeading>
        <PanelBody>
          Event Details Here
          {/* event.location itd  */}
          <br/><br/>
          <SendEmail eventId={event.id} caption="Send Email to all atendees" />

        </PanelBody>
        <h2>{event.name} Atendees</h2>

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
      const event = await API().get(`/events/${this.props.match.params.eventId}`)
      this.setState({ event })
    }
  }),
  withProps(({ match, event }) => {
    return {
      event,
      resource: 'invites',
      params: {
        limit: 10,
        where: { eventId: match.params.eventId },
        include: 'contact'
      },
    }
  }),
  withPaginate,
  withCrud,
  withHandlers({
    changeStatus:  ({ refetch, upsert }) => async (status, id) => {
      await upsert('invites', { status }, id)
      await refetch()
    }
  }),
  pure
)(Event)
