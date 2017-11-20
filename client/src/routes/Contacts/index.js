import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure } from 'recompose'
import AppLayout from 'layout/AppLayout'

// Components
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import { Button } from 'components/Styled'


const Row = ({ resource }) =>
  <div>
    ROW <br/>
    {resource.firstName} {resource.lastName}
    <hr/>
  </div>


const Contacts = (props) =>
<AppLayout>
  <Grid fluid>
    <Filters />
    <DataTable {...props} Component={Row} />
    <Button>Test</Button>
  </Grid>
</AppLayout>

export default compose(
  withProps({
    resource: 'contacts',
    params: { limit: 1 },
  }),
  withPaginate,
  pure
)(Contacts)
