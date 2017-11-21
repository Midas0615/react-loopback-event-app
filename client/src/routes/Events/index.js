import React from 'react'
import withPaginate from 'containers/withPaginate'
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import AppLayout from 'layout/AppLayout'
import moment from 'moment'

import Fa from 'components/Fa'
import Label from 'components/Styled/Label'
import { Grid } from 'react-styled-flexboxgrid'
import { Button } from 'components/Styled'
import { compose, withProps, pure, withState } from 'recompose'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'

import EventEditor from 'components/EventEditor'

const Row = ({ resource: event, toggleModal }) => {
  return (
    <tr>
      <td>{event.name}</td>
      <td>{moment(event.eventDate).format('LLL')}</td>
      <td>{event.location}</td>
      <td>
        <span>
          <Button mr={0.5} borderWarning backgroundWarning  onClick={() => toggleModal(event)}><Fa lg base icon='ion-edit'/></Button>
          <Button  borderDanger backgroundDanger><Fa lg base icon='ion-ios-trash-outline' /></Button>
        </span>
      </td>
    </tr>
  )
}

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex center space>
        <strong>Events</strong>
        <Button onClick={() => props.toggleModal({})}>Create</Button>
      </Flex>
    </PanelHeading>
    <PanelHeading>
      <Filters />
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
  withState('modal', 'toggleModal', {}),
  withProps({
    resource: 'events',
    params: { limit: 10, include: 'account' },
  }),
  withPaginate,
  pure
)(Contacts)
