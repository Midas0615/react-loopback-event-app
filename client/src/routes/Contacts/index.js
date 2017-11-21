import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure } from 'recompose'
import AppLayout from 'layout/AppLayout'

// Components
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'

const Row = ({ resource: contact }) =>
<tr>
  <td>{contact.firstName} {contact.lastName}</td>
  <td>{contact.organisation || 'N/A'}</td>
  <td>address 1 address 2 etc</td>
  <td>edit, add to event, add to group, send email</td>
</tr>

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <strong>Contacts</strong>
    </PanelHeading>
    <PanelHeading>
      <Filters />
    </PanelHeading>
    <DataTable
      {...props}
      Component={Row}
      heading={['Name', 'Organization', 'Location', 'Actions']}
    />
  </Panel>
</AppLayout>

export default compose(
  withProps({
    resource: 'contacts',
    params: { limit: 10 }
  }),
  withPaginate,
  pure
)(Contacts)
