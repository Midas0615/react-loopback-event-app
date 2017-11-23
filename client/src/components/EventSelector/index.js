import React from 'react'
import withInvite from 'containers/withInvite'
import { withProps, compose } from 'recompose'
import Button from 'components/Styled/Button'
import Fa from 'components/Fa'

const Selector = ({ invite, fetchEvent, event, clearState }) =>
<span>
  <Button
    mr={0.5}
    sm
    onClick={() => fetchEvent(event.id)}
    primary={invite.event.id === event.id}
    >
    {
      invite.event.id === event.id
      ? 'Inviting to this event'
      : <span><Fa  icon='ion-person-add'/> Invite Contacts</span>
    }
  </Button>
  {
    invite.event.id === event.id &&
    <Button sm blank onClick={() =>clearState()}>Cancel</Button>
  }
</span>



export default withInvite(Selector)
