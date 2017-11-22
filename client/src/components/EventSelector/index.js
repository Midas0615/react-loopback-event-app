import React from 'react'
import withInvite from 'containers/withInvite'
import { withProps, compose } from 'recompose'
import Button from 'components/Styled/Button'


const Selector = ({ invite, fetchEvent, event, clearState }) =>
<span>
  <Button
    ml={0.1}
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
    <Button blank onClick={() =>clearState()}>Cancel</Button>
  }
</span>



export default withInvite(Selector)
