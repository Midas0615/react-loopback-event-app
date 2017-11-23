import React from 'react'
import withPaginate from 'containers/withPaginate'
import DataTable from 'components/DataTable'
import SendEmail from 'components/SendEmail'
import AppLayout from 'layout/AppLayout'
import API from 'services/api'
import withCrud from 'containers/withCrud'
import moment from 'moment'
import styled from 'styled-components'
import theme from 'styles/theme'

import Fa from 'components/Fa'
import Label from 'components/Styled/Label'
import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import Text from 'components/Styled/Text'
import { compose, withProps, withHandlers, pure, lifecycle } from 'recompose'
import { Grid } from 'react-styled-flexboxgrid'

const Row = ({ resource: invite,index, changeStatus }) => {
  console.log(invite)
  const contact = invite.contact || {};

  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        {contact.firstName} {contact.lastName} <br/>
        <small>{contact.organization}</small>
      </td>
      <td>
      <Flex itemsCenter>
        <Label
          mr={0.5}
          gray={invite.status === 'unconfirmed'}
          success={invite.status === 'attending'}
          warning={invite.status === 'not-attending'}
          >{invite.status}</Label>
          {
            invite.status ==='unconfirmed' &&
              <Text tiny pointer uppercase bold mr={0.5} onClick={() => changeStatus('attending', invite.id)}>Set Attending</Text> | <Text tiny pointer uppercase bold ml={0.5} onClick={() => changeStatus('not-attending', invite.id)}>Set Not Attending</Text>
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


const EventDate = styled.div`
  border-left: 6px solid ${theme.warning};
  padding: 0rem 0.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 3rem;
  -webkit-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
  box-shadow: 3px 3px 12px -7px rgba(0,0,0,0.75);
`

const Event = (props) => {

  if (!props.event) return null;
  const event = props.event;
  // Event date format
  event.eventDayOfTheWeek = moment(event.eventDate).format('dddd')
  event.eventMonth = moment(event.eventDate).format('MMMM')
  event.eventDay = moment(event.eventDate).format('DD')
  event.createdAt = moment(event.createdAt).format('MM/DD/YYYY')

  return (
    <AppLayout>
      <Panel my={2}>
        <PanelHeading primary>
          <Flex center space>
            <strong>{event.name}</strong>
          </Flex>
        </PanelHeading>
        <PanelBody dirtyWhite>
          <Flex space>
            <EventDate>
              <Text bold uppercase>{event.eventMonth}</Text>
              <Text bold giant weight={600}>{event.eventDay}</Text>
              <Text bold uppercase>{event.eventDayOfTheWeek}</Text>
            </EventDate>
            <Flex column itemsCenter>
              <div><Text large bold uppercase>{event.name}</Text></div>
              <pre>{event.comment}</pre>
            </Flex>
            <Flex column itemsEnd>
              <Label mb={0.25} success>
                <Text tiny uppercase mr={0.25}>Location:</Text>
                <Text tiny bold uppercase> {event.eventLocation}</Text>
                <Fa ml={0.5} base lg icon="ion-location" />
              </Label>
              <Label mb={0.25} danger>
                <Text tiny uppercase mr={0.25}>Created: </Text>
                <Text tiny bold uppercase> {event.createdAt}</Text>
                <Fa ml={0.5} base lg icon="ion-ios-calendar-outline" />
              </Label>
              <Button withicon primary>
                <Text>Send Email to all atendees</Text>
                <Fa ml={0.5} base lg icon="ion-ios-email" />
              </Button>
            </Flex>
          </Flex>

          {/* <SendEmail eventId={event.id} caption="Send Email to all atendees" /> */}
        </PanelBody>

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
      const event = await API().get(`/events/${this.props.match.params.eventId}`)
      this.setState({ event })
    }
  }),
  withProps(({ match, event }) => {
    return {
      event,
      resource: 'invites',
      params: {
        limit: 10,
        where: { eventId: match.params.eventId },
        include: 'contact'
      },
    }
  }),
  withPaginate,
  withCrud,
  withHandlers({
    changeStatus:  ({ refetch, upsert }) => async (status, id) => {
      await upsert('invites', { status }, id)
      await refetch()
    }
  }),
  pure
)(Event)
