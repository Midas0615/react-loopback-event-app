import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure } from 'recompose'
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import AppLayout from 'layout/AppLayout'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'

import Label from 'components/Styled/Label'

const Row = ({ resource: invite,index }) => {

  const event = invite.event || {};

  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        {event.name}  <br/>
        <small>{event.organization}</small>
      </td>
      <td>
        <Label
          gray={invite.status === 'unconfirmed'}
          success={invite.status === 'attending'}
          warning={invite.status === 'not-attending'}
          >{invite.status}</Label>
      </td>
      <td>Send Message Change Status</td>
    </tr>
  )
}

const Event = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex center space>
        <strong>Contact Name</strong>
      </Flex>
    </PanelHeading>
    <PanelBody>
      Contact Details Here
    </PanelBody>
    <hr/>
    <DataTable
      {...props}
       Component={Row}
       heading={['', 'Name', 'Status', 'Actions']}
     />
  </Panel>
</AppLayout>


export default compose(
  withProps(({ match }) => {
    return {
      resource: 'invites',
      params: {
        limit: 10,
        where: { contactId: match.params.contactId },
        include: 'event'
      },
    }
  }),
  withPaginate,
  pure
)(Event)
