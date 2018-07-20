import React from 'react'
import { Async } from 'react-select'
import withInvite from 'containers/withInvite'
import { withProps, compose } from 'recompose'
import API from 'services/api'

const getOptions = async(input) => {
  const filter = JSON.stringify({ where: {name: {ilike: `%${input}%`}, eventDate: {gt: Date.now()}, deleted: false }, limit: 7 })
  const options = await API().get('/events', {params: {filter}})
  return {options}
}

const Dropdown = ({ invite, handleChange }) =>
<div style={{ minWidth: '250px'}}>
  <Async
    loadOptions={getOptions}
    value={invite.event.id ? invite.event : undefined }
    labelKey='name'
    placeholder='Select Event to Invite Contacts'
    onChange={handleChange}
 />
</div>

export default compose (
  withInvite,
  withProps(({ invite, fetchEvent, clearState }) => ({
    handleChange: (clickedEvent) => {
      if (!clickedEvent) return clearState()
      if (invite.event.id !== clickedEvent.id) fetchEvent(clickedEvent.id)
    }
  })),
)(Dropdown)
