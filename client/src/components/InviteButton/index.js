import React from 'react'
import withInvite from 'containers/withInvite'
import Button from 'components/Styled/Button'
import Fa from 'components/Fa'

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
        <Button buttonIcon success onClick={() => addCandidate(contact)}><Fa lg base icon='ion-android-person-add'/></Button>
      }
      {
        !hasSubscription && candidate &&
        <Button buttonIcon danger onClick={() => removeCandidate(contact.id)}><Fa lg base icon='ion-android-cancel'/></Button>
      }
    </div>
  )
}


export default withInvite(InviteButton)
