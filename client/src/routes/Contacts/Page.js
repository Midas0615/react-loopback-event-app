import React from 'react'
import AppLayout from 'layout/AppLayout'
import Fa from 'components/Fa'
import { Link } from 'react-router-dom'

// Components
import DataTable from 'components/DataTable'
import ContactFilters from 'components/ContactFilters'
import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'


import ContactEditor from 'components/ContactEditor'
import ContactGroupEditor from 'components/ContactGroupEditor'
import InviteButton from 'components/InviteButton'
import EventList from 'components/EventList'

const Row = ({ resource: contact, toggleModal }) =>
<tr>
  <td>
    <Link to={`/contact/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
  </td>
  <td>{contact.organization || 'N/A'}</td>
  <td>address 1 address 2 etc</td>
  <td>
    <Flex itemsCenter>
      <Flex mr={0.5}>
        <Button buttonIcon warning mr={0.5} onClick={() => toggleModal(contact)}><Fa lg base icon='ion-edit'/></Button>
        <InviteButton contact={contact} />
      </Flex>
      <pre>add to group, send email</pre>
    </Flex>
  </td>
</tr>

export default (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary>
      <Flex itemsCenter space>
        <strong>Contacts</strong>
        <Flex>
          <EventList />
          <Button primary sm ml={0.5} onClick={() => props.toggleContactGroups(true)} mr={0.3}>Contact Groups</Button>
          <Button primary sm onClick={() => props.toggleModal({})}>Create</Button>
        </Flex>
      </Flex>
    </PanelHeading>
    <PanelHeading>
      <ContactFilters fetch={props.fetch} />
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
