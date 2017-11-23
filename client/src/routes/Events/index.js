import React from 'react'
import withPaginate from 'containers/withPaginate'
import DataTable from 'components/DataTable'
import EventFilters from 'components/EventFilters'
import AppLayout from 'layout/AppLayout'
import moment from 'moment'

import Fa from 'components/Fa'
import Label from 'components/Styled/Label'
import { Grid } from 'react-styled-flexboxgrid'
import { Button } from 'components/Styled'
import { compose, withProps, pure, withState } from 'recompose'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import { Link } from 'react-router-dom';

import EventEditor from 'components/EventEditor'
import EventSelector from 'components/EventSelector'

const Row = ({ resource: event, toggleModal }) => {
  return (
    <tr>
      <td><Link to={`/event/${event.id}`}>{event.name}</Link></td>
      <td>
        {moment(event.eventDate).format('LLL')} <br/>
        <small>{moment(event.eventDate).fromNow()}</small>
      </td>
      <td>{event.location}</td>
      <td>
        <span>
          <Button buttonIcon mr={0.5} warning onClick={() => toggleModal(event)}><Fa lg base icon='ion-edit'/></Button>
          <Button buttonIcon mr={0.5} danger><Fa lg base icon='ion-ios-trash-outline' /></Button>
          <EventSelector primary event={event} />
        </span>
      </td>
    </tr>
  )
}

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex itemsCenter space>
        <strong>Events</strong>
        <Button primary sm onClick={() => props.toggleModal({})}>Create</Button>
      </Flex>
    </PanelHeading>
    <PanelHeading>
      <EventFilters fetch={props.fetch} />
    </PanelHeading>
    <DataTable
      {...props}
       Component={Row}
       heading={['Event', 'Date', 'Location', 'Actions']}
     />
  </Panel>
  {/* Modal */}
  {  props.modal &&
    <EventEditor
      data={props.modal}
      fetch={props.fetch}
      close={() => props.toggleModal(null)}
    /> }
</AppLayout>


export default compose(
  withState('modal', 'toggleModal', null),
  withProps({
    resource: 'events',
    params: { limit: 10, include: 'account', where: { eventDate: {gt: Date.now()} }, order: 'eventDate ASC' },
  }),
  withPaginate,
  pure
)(Contacts)
