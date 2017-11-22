import React from 'react'
import Select from 'react-select'
import withInvite from 'containers/withInvite'
import { withProps, compose, lifecycle } from 'recompose'
import API from 'services/api'

const Dropdown = ({ options, invite, handleChange }) =>
<div style={{ minWidth: '300px'}}>
  <Select
    options={options}
    value={invite.event.id ? invite.event : undefined }
    labelKey='name'
    placeholder='Select Event'
    onChange={handleChange}
 />
</div>

export default compose (
  lifecycle({
    async componentDidMount() {
      const filter = JSON.stringify({ where: { eventDate: {gt: Date.now()} } })
      const options = await API().get('/events', {params: {filter}});
      this.setState({ options })
    }
  }),
  withInvite,
  withProps(({ options, invite, fetchEvent, clearState }) => ({
    options,
    handleChange: (clickedEvent) => {
      if (!clickedEvent) return clearState()
      // Setting Event
      if (invite.event.id !== clickedEvent.id) fetchEvent(clickedEvent.id)
    }
  })),
)(Dropdown)
