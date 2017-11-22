import React from 'react'
import withInvite from 'containers/withInvite'

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
        <button onClick={() => addCandidate(contact)}>Add Candidate</button>
      }
      {
        !hasSubscription && candidate &&
        <button onClick={() => removeCandidate(contact.id)}>Remove Candidate</button>
      }
    </div>
  )
}


export default withInvite(InviteButton)
