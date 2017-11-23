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
import { FormatStatus, Actions } from 'routes/Contact'

const Row = ({ resource: invite,index, changeStatus, event }) => {
  const contact = invite.contact || {};
  if (!event) return null;
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
        <FormatStatus status={invite.status} eventDate={event.eventDate} />
      </td>
      <Actions invite={invite} changeStatus={changeStatus} eventDate={event.eventDate}  />
    </tr>
  )
}


const EventDate = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 3rem;
  padding-right: 1rem;
  border-right: 1px solid ${theme.border};
`

const Event = (props) => {
  if (!props.event) return null;
  const event = props.event;
  return (
    <AppLayout>
      <Panel mt={5}>
        <PanelHeading >
            <h3>
            <Fa icon="ion-ios-calendar-outline" lg mr={0.4}/>{event.name} <br/>
            <small>{moment(event.eventDate).format('LLL')} @ {event.location}</small>
            </h3>
            <Flex>
              <SendEmail eventId={event.id} caption="Send Email to all atendees" />
            </Flex>
        </PanelHeading>
        <DataTable
          {...props}
           noDataCaption={`${event.name} has no invitees.`}
           Component={Row}
           heading={['', 'Name', 'Status', {width: 22, title: ''}]}
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
