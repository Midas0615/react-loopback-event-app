import React from 'react'
import ContactEditor from 'components/ContactEditor'
import EventEditor from 'components/EventEditor'


// Toggle
const CONTACT_EDITOR = true
const EVENT_EDITOR = false

export default () =>
<div>
  {CONTACT_EDITOR && <ContactEditor />}
  {EVENT_EDITOR && <EventEditor />}
</div>
