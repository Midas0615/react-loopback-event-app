import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure, withState } from 'recompose'
import AppLayout from 'layout/AppLayout'
import Fa from 'components/Fa'

// Components
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'

import ContactEditor from 'components/ContactEditor'
import ContactGroupEditor from 'components/ContactGroupEditor'


const Row = ({ resource: contact, toggleModal }) =>
<tr>
  <td>{contact.firstName} {contact.lastName}</td>
  <td>{contact.organisation || 'N/A'}</td>
  <td>address 1 address 2 etc</td>
  <td><button onClick={() => toggleModal(contact)}>Edit</button>, add to event, add to group, send email</td>
</tr>

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex center space>
        <strong>Contacts</strong>
        <div>
          <Button onClick={() => props.toggleContactGroups(true)} mr={0.3}>Contact Groups</Button>
          <Button onClick={() => props.toggleModal({})}>Create</Button>
        </div>
      </Flex>
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
  {/* Contacts Modal */}
  {  props.modal &&
    <ContactEditor
      data={props.modal}
      fetch={props.fetch}
      close={() => props.toggleModal(null)}
    /> }
    {/* Contact Groups Modal */}
    {
      props.contactGroups &&
      <ContactGroupEditor
        close={() => props.toggleContactGroups(false)}
      />
    }
</AppLayout>

export default compose(
  withState('modal', 'toggleModal', null),
  withState('contactGroups', 'toggleContactGroups', false),
  withProps({
    resource: 'contacts',
    params: { limit: 10 }
  }),
  withPaginate,
  pure
)(Contacts)
