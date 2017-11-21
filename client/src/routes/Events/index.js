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
import { compose, withProps, pure } from 'recompose'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'

const Row = ({ resource: event }) => {
  return (
    <tr>
      <td>{event.name}</td>
      <td>{moment(event.eventDate).format('LLL')}</td>
      <td><Label success><Fa lg base icon='ion-location' /> {event.eventLocation}</Label></td>
      <td>
        <span>
          <Button mr={0.5} borderWarning backgroundWarning icon><Fa lg base icon='ion-edit'/></Button>
          <Button icon borderDanger backgroundDanger><Fa lg base icon='ion-ios-trash-outline' /></Button>
        </span>
      </td>
    </tr>
  )
}

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <strong>Events</strong>
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
</AppLayout>


export default compose(
  withProps({
    resource: 'events',
    params: { limit: 2, include: 'account' },
  }),
  withPaginate,
  pure
)(Contacts)
