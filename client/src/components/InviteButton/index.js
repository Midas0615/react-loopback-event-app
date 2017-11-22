import React from 'react'
import withInvite from 'containers/withInvite'
import Button from 'components/Styled/Button'

const InviteButton = ({ invite, contact, addCandidate, removeCandidate }) => {
  if (!invite.ready) return null;
  const hasSubscription = invite.invitees.indexOf(contact.id) !== -1
  const candidate = invite.candidates.indexOf(contact.id) !== -1
  return (
    <div>
      {
        hasSubscription &&
        <span>Already Subscribed</span>
      }
      {
        !hasSubscription && !candidate &&
        <Button onClick={() => addCandidate(contact)} primary>Add To Invite List</Button>
      }
      {
        !hasSubscription && candidate &&
        <Button warning onClick={() => removeCandidate(contact.id)}>Remove From Invite List</Button>
      }
    </div>
  )
}


export default withInvite(InviteButton)
