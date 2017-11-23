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
import Label from 'components/Styled/Label'


import ContactEditor from 'components/ContactEditor'
import ContactGroupEditor from 'components/ContactGroupEditor'
import InviteButton from 'components/InviteButton'
import EventList from 'components/EventList'

const Row = ({ resource: contact, toggleModal }) =>
<tr>
  <td>
    <Link to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</Link> <br/>
    <small>Organization: {contact.organization || 'N/A'}</small>
  </td>
  <td>
    <Fa gray icon='ion-person-stalker' mr={0.5}/>
    {
      contact.contactGroupId
      ? contact.contactGroup.name
      : 'N / A'
    }
  </td>
  <td><Fa gray icon='ion-ios-location'/> {contact.address1 || 'No address'} <br/>
  <small><Fa gray icon='ion-ios-telephone'/> {contact.phone || 'No phone'}</small>
  </td>
  {
    contact.deleted
    ?  <td><Label danger><Fa icon='ion-alert-circled'/> DELETED</Label></td>
    : <td>
      <Flex itemsCenter>
        <Flex mr={0.5}>
          <Button sm mr={0.5} onClick={() => toggleModal(contact)}><Fa icon='ion-edit'/> Edit</Button>
          <InviteButton contact={contact} />
        </Flex>
      </Flex>
    </td>
  }

</tr>

export default (props) =>
<AppLayout>
  <Panel my={4}>
    <PanelHeading primary>
      <h3>Contacts</h3>
      <Flex>
        <EventList />
        <Button primary sm ml={0.5} onClick={() => props.toggleContactGroups(true)} mr={0.5}><Fa  icon='ion-person-stalker' mr={0.1}/> Contact Groups</Button>
        <Button primary sm onClick={() => props.toggleModal({})}><Fa  icon='ion-plus' mr={0.3}/>New Contact</Button>
      </Flex>
    </PanelHeading>
    <PanelHeading>
      <ContactFilters fetch={props.fetch} />
    </PanelHeading>
    <DataTable
      {...props}
      Component={Row}
      noDataCaption="No Contacts in this table, use Create button to add some."
      heading={['Name', 'Belongs to', 'Location', {title:'', width: 12}]}
    />
  </Panel>
  {/* Contacts Modal */}
  {  props.modal &&
    <ContactEditor
      data={props.modal}
      fetch={props.fetch}
      refetch={props.refetch}
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
