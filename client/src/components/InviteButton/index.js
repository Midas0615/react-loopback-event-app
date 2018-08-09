import React from 'react'
import withInvite from 'containers/withInvite'
import Button from 'components/Styled/Button'
import Fa from 'components/Fa'

const InviteButton = ({ invite, contact, addCandidate, removeCandidate }) => {
  /* 
    Display 'Invite Button' or not.
    1. When click 'Invite Contacts' button on the Events page.
    2. When select 'Select Event to Invite Contacts' option on the Contacts page.
   */
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
        <Button   onClick={() => addCandidate(contact)}><Fa  icon='ion-person-add'/> Invite</Button>
      }
      {
        !hasSubscription && candidate &&
        <Button danger onClick={() => removeCandidate(contact.id)}><Fa icon='ion-backspace-outline'/> Remove</Button>
      }
    </div>
  )
}


export default withInvite(InviteButton)
