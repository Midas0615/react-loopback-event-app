import React from 'react'
import qs from 'query-string'
import { Panel, PanelHeading, PanelBody} from 'components/Styled/Panel'
import Container from 'components/Styled/Container'
import Button from 'components/Styled/Button'
import { compose, lifecycle, withProps, withHandlers } from 'recompose'
import API from 'services/api'
import DataTable from 'components/DataTable'
import withPaginate from 'containers/withPaginate'
import withCrud from 'containers/withCrud'

const Row = ({ resource: invite, setAttending, setNotAttending, isFetching }) => {
  if (!invite.contact) return null
  const contact = invite.contact;
  return (
    <tr>
      <td>
      {contact.firstName} {contact.lastName}
      </td>
      <td>
        <Button sm mr={0.3} disabled={isFetching} success={invite.status === 'attending'} onClick={setAttending(invite.id)}>Attending</Button>
        <Button sm  disabled={isFetching} danger={invite.status === 'not-attending'} onClick={setNotAttending(invite.id)}>Not Attending</Button>
      </td>
    </tr>
  )
}

const Confirmation = (props) =>
<Container width={600}>
  <Panel my={3}>
    <PanelHeading primary noPadding>
      <img src="/genesis-90.png" alt=""/>
    </PanelHeading>
    <PanelBody>
      <center>
      <h2>Thank you!</h2>
      <p>Your attendance status is updated.
      You can safely close this window!</p>
      <br/>
      <p>
        <Button onClick={() => window.close()} primary>Close Window</Button>
      </p>
      </center>
      <br/>
      {
        props.data &&
        <div>
          <center>
          <h3>Other members</h3>
          <br/>
          If you have few minutes, please review and update status for other members:
          </center>
          <DataTable
            {...props}
            Component={Row}
            heading={['Name', {width: 13, title: ''}]}
          />
        </div>

    }
  </PanelBody>


  </Panel>
</Container>

export default compose(
  withProps({
    resource: 'invites',
    skip: true,
  }),
  withPaginate,
  withCrud,
  lifecycle({
    async componentWillMount() {
      const { fetch, upsert } = this.props;
      const {inviteId, status} = qs.parse(location.search);
      if (!inviteId) return;
      // 1. Update owner's attendance
      await API().patch(`/invites/${inviteId}`,{ status, emailConfirmation: false });
      // 2. Get contact Group Id
      const basic = await fetch(`invites`, {where: {id: inviteId}, include: 'contact' });
      const eventId = basic[0].eventId;
      const ownerContactGroupId = basic[0].contact.contactGroupId;
      if (!ownerContactGroupId) return;
      // 3. get contacts for this contact group
      const contactGroupMembers = await fetch('contacts', { fields: ['id'], where: { contactGroupId: ownerContactGroupId }})
      const contactGroupMemberIds = contactGroupMembers.map(member => member.id);
      // 4. fetch invitations
      const invite = await fetch(`invites`, {where: {eventId: eventId, contactId: {inq: contactGroupMemberIds }}, include: 'contact' });
    },
  }),
  withHandlers({
    setAttending: ({ refetch }) => inviteId => async() => {
      await API().patch(`/invites/${inviteId}`,{ status: 'attending', emailConfirmation: false });
      refetch();
    },
    setNotAttending: ({ refetch }) => inviteId => async() => {
      await API().patch(`/invites/${inviteId}`,{ status: 'not-attending', emailConfirmation: false });
      refetch();
    }

  })
)(Confirmation)
