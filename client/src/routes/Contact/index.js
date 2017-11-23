import React from 'react'
import withPaginate from 'containers/withPaginate'
import withCrud from 'containers/withCrud'
import DataTable from 'components/DataTable'
import AppLayout from 'layout/AppLayout'
import API from 'services/api'
import SendEmail from 'components/SendEmail'
import moment from 'moment'
import styled from 'styled-components'
import theme from 'styles/theme'

import Fa from 'components/Fa'
import { compose, withProps, pure, lifecycle, withHandlers } from 'recompose'
import { Grid } from 'react-styled-flexboxgrid'
import { Flex } from 'components/Styled/Flex'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Button } from 'components/Styled'
import Text from 'components/Styled/Text'
import Label from 'components/Styled/Label'

const Row = ({ resource: invite, index, changeStatus }) => {
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
        <Flex itemsCenter>
          <Label
            mr={0.5}
            gray={invite.status === 'unconfirmed'}
            success={invite.status === 'attending'}
            warning={invite.status === 'not-attending'}
            >{invite.status}
          </Label> {' '}
          {
            invite.status ==='unconfirmed' &&
            <div>
              <Text tiny pointer uppercase bold mr={0.5} onClick={() => changeStatus('attending', invite.id)}>Set Attending</Text> | <Text tiny pointer uppercase bold ml={0.5} onClick={() => changeStatus('not-attending', invite.id)}>Set Not Attending</Text>
            </div>
          }
          {
            invite.status === 'attending' &&
            <Text tiny pointer danger uppercase bold mr={0.5} onClick={() => changeStatus('not-attending', invite.id)}>Set Not Attending</Text>
          }
          {
            invite.status === 'not-attending' &&
            <Text tiny pointer uppercase success bold mr={0.5} onClick={() => changeStatus('attending', invite.id)}>Set Attending</Text>
          }
        </Flex>
      </td>
      <td><SendEmail contactId={invite.contactId} eventId={invite.eventId} /></td>
    </tr>
  )
}

const ContactBox = styled.div`
    border-left: 6px solid ${theme.warning};
    padding: 0rem 0.75rem;
    margin-right: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
    -moz-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
    box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
`
const Contact = (props) => {
  if (!props.contact) return null;

  const contact = props.contact;
  return (
    <AppLayout>
      <Panel my={2}>
        <PanelHeading primary>
          <Flex>
            <strong>{contact.firstName} {contact.lastName}</strong>
          </Flex>
        </PanelHeading>
        <PanelBody>
          <Flex>
            <Flex grow>
              <ContactBox>
                <Fa giant icon="ion-ios-person" />
              </ContactBox>
              <Flex column>
                <Label mb={0.25} blank><Fa mr={0.5} dark lg icon="ion-android-contact" /><Text>{contact.title} {contact.firstName} {contact.lastName}</Text></Label>
                <Label mb={0.25} blank><Fa mr={0.5} dark lg icon="ion-email" /><Text>{contact.email}</Text></Label>
              </Flex>
            </Flex>
            <Flex itemsStart>
              <Button withicon primary>
                <Text>Send email to {contact.firstName}</Text>
                <Fa ml={0.5} base lg icon="ion-ios-email" />
              </Button>
            </Flex>
          </Flex>

          {/* <SendEmail contactId={contact.id} caption={`Send email to ${contact.firstName}`} /> */}
        </PanelBody>
        <hr/>
        <DataTable
          {...props}
           Component={Row}
           heading={['', 'Name', 'Status', 'Actions']}
         />
      </Panel>
    </AppLayout>
  )
}



export default compose(
  lifecycle({
    async componentWillMount() {
      const contact = await API().get(`/contacts/${this.props.match.params.contactId}`)
      this.setState({ contact })
    }
  }),
  withCrud,
  withProps(({ match, contact, fetch }) => {
    return {
      resource: 'invites',
      contact,
      params: {
        limit: 10,
        where: { contactId: match.params.contactId },
        include: 'event'
      },
    }
  }),
  withPaginate,
  withHandlers({
    changeStatus:  ({ refetch, upsert }) => async (status, id) => {
      await upsert('invites', { status }, id)
      console.log(status)
      await refetch()
    }
  })
)(Contact)
