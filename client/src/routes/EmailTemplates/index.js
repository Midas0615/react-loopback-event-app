import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure } from 'recompose'
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import AppLayout from 'layout/AppLayout'

const Row = ({ resource: template }) => {

  return (
    <div>
      nekvo
      {template.id} <br/>
      {template.name}

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
    resource: 'email-templates',
    params: { limit: 2},
  }),
  withPaginate,
  pure
)(Contacts)
