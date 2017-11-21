import React from 'react'
import withPaginate from 'containers/withPaginate'
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import AppLayout from 'layout/AppLayout'

import Fa from 'components/Fa'
import Label from 'components/Styled/Label'
import { Grid } from 'react-styled-flexboxgrid'
import { compose, withProps, pure } from 'recompose'

const Row = ({ resource: event }) => {
  return (
    <tr>
      <td>{event.name}</td>
      <td><Label gray>{event.eventDate}</Label></td>
      <td><Label success>{event.eventLocation}</Label></td>
      <td>
        <span>
          <Fa icon='pencil-square-o' gray table/>
          <Fa icon='trash' danger table/>
        </span>
      </td>
    </tr>
  )
}


const Contacts = (props) =>
<AppLayout>
  <Grid fluid>
    <Filters />
    <DataTable {...props} Component={Row} />
  </Grid>
</AppLayout>


export default compose(
  withProps({
    resource: 'events',
    params: { limit: 2, include: 'account' },
  }),
  withPaginate,
  pure
)(Contacts)
