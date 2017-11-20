import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure } from 'recompose'
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import AppLayout from 'layout/AppLayout'

const Row = ({ resource }) => {
  const contact = resource.contact;
  return (
    <div>
      {contact.firstName} {contact.lastName}
    </div>
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
    resource: 'invites',
    params: { limit: 2, include: 'contact' },
  }),
  withPaginate,
  pure
)(Contacts)