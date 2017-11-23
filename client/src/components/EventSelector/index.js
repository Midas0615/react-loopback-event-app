import React from 'react'
import withInvite from 'containers/withInvite'
import { withProps, compose } from 'recompose'
import Button from 'components/Styled/Button'


const Selector = ({ invite, fetchEvent, event, clearState }) =>
<span>
  <Button
    mr={0.5}
    success
    onClick={() => fetchEvent(event.id)}
    primary={invite.event.id === event.id}
    >
    {
      invite.event.id === event.id
      ? 'Inviting'
      : 'Invite Contacts'
    }
  </Button>
  {
    invite.event.id === event.id &&
    <Button danger onClick={() =>clearState()}>Cancel</Button>
  }
</span>



export default withInvite(Selector)
