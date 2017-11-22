import React from 'react'
import AppLayout from 'layout/AppLayout'
import Fa from 'components/Fa'
import { Link } from 'react-router-dom'

// Components
import DataTable from 'components/DataTable'
import Filters from 'components/Filters'
import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'


import ContactEditor from 'components/ContactEditor'
import ContactGroupEditor from 'components/ContactGroupEditor'
import InviteModal from 'components/InviteModal'


import InviteButton from 'components/InviteButton'

const Row = ({ resource: contact, toggleModal }) =>
<tr>
  <td>
    <Link to={`/contact/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
  </td>
  <td>{contact.organization || 'N/A'}</td>
  <td>address 1 address 2 etc</td>
  <td>
    <button onClick={() => toggleModal(contact)}>Edit</button>, add to group, send email
    <InviteButton contact={contact} />
  </td>
</tr>

export default (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex center space>
        <strong>Contacts</strong>
        <div>
          <InviteModal />
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
      heading={['Name', 'Organisation', 'Location', 'Actions']}
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
