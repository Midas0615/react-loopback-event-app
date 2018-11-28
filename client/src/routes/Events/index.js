import React from 'react'
import withPaginate from 'containers/withPaginate'
import withCrud from 'containers/withCrud'
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

const Row = ({ resource: event, toggleModal, duplicateEvent }) => {
  return (
    <tr>
      <td><Link to={`/events/${event.id}`}>{event.name}</Link></td>
      <td>
        {moment(event.eventDate).format('LLL')} <br/>
        <small>{moment(event.eventDate).fromNow()}</small>
      </td>
      <td>{event.location || 'N/A'}</td>
      {
        event.deleted
        ? <td><Label danger>DELETED</Label></td>
        : <td>
          <span>
            <Button sm mr={0.5}  onClick={() => toggleModal(event)}><Fa icon='ion-edit'/> Edit</Button>
            <EventSelector primary event={event} />
            <Button sm mr={0.5}  onClick={() => duplicateEvent(event)}><Fa icon='ion-ios-copy'/> Duplicate</Button>
          </span>
        </td>
      }

    </tr>
  )
}

const Events = (props) =>
<AppLayout>
  <Panel my={4}>
    <PanelHeading primary>
        <h3>Events</h3>
        <Button primary onClick={() => props.toggleModal({})}><Fa  icon='ion-plus-round'/> New Event</Button>
    </PanelHeading>
    <PanelHeading>
      <EventFilters fetch={props.fetch} />
    </PanelHeading>
    <DataTable
      {...props}
       Component={Row}
       heading={['Event', 'Date', { title: 'Location', width: 15}, { title: '', width: 20 }]}
     />
  </Panel>
  {/* Modal */}
  {  props.modal &&
    <EventEditor
      data={props.modal}
      fetch={props.fetch}
      refetch={props.refetch}
      close={() => props.toggleModal(null)}
    /> }
</AppLayout>


export default compose(
  withState('modal', 'toggleModal', null),
  withProps({
    resource: 'events',
    // params: { limit: 10, include: 'account', where: { eventDate: {gt: Date.now()}, deleted: false }, order: 'eventDate ASC' },
    params: { limit: 10, include: 'account', where: { deleted: false }, order: 'eventDate ASC' },
  }),
  withPaginate,
  withCrud,
  pure
)(Events)
