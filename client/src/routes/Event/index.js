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
import EventEditor from 'components/EventEditor'
import store from 'store'
import Fa from 'components/Fa'
import Label from 'components/Styled/Label'
import { Button } from 'components/Styled'
import { HrefButton } from 'components/Styled/Button'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import Text from 'components/Styled/Text'
import { compose, withProps, withHandlers, pure, lifecycle, withState } from 'recompose'
import { Grid } from 'react-styled-flexboxgrid'
import { FormatStatus, Actions } from 'routes/Contact'
import { Link } from 'react-router-dom'

const Row = ({ resource: invite,index, changeStatus, event }) => {
  const contact = invite.contact || {};
  if (!event) return null;
  return (
    <tr>
      <td>
        {index+1}
      </td>
      <td>
        <Link to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</Link> <br/>
        <small>{contact.organization}</small>
      </td>
      <td>
        <FormatStatus status={invite.status} eventDate={event.eventDate} />
      </td>
      <Actions invite={invite} changeStatus={changeStatus} eventDate={event.eventDate}  />
    </tr>
  )
}

const Event = (props) => {
  if (!props.event) return null;
  const event = props.event;
  console.log(props)
  return (
    <AppLayout>
      <Panel mt={5}>
        <PanelHeading >
            <h3>
            <Fa icon="ion-ios-calendar-outline" lg mr={0.4}/>{event.name} <br/>
            <small>{moment(event.eventDate).format('LLL')} @ {event.location}</small> <br/>
            <small>{event.comment}</small>
            </h3>
            <Flex>
              <Button sm mr={0.5} onClick={() => props.toggleModal(event)}><Fa icon='ion-edit'/> Edit Event</Button>
              <HrefButton href={`/api/downloads/invites/${event.id}?access_token=${props.accessToken}`} mr={0.4}>Download Event Data</HrefButton>
              <SendEmail eventId={event.id} caption="Send Email to all atendees" />
              {/* Modal */}
              {  props.modal &&
                <EventEditor
                  data={props.modal}
                  fetch={props.refetchEvent}
                  refetch={props.refetchEvent}
                  close={() => props.toggleModal(null)}
                /> }
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
      this.fetch()
      this.setState({ refetchEvent: this.fetch.bind(this) })
    },
    async fetch() {
      const event = await API().get(`/events/${this.props.match.params.eventId}`)
      this.setState({ event })
    }
  }),
  withState('modal', 'toggleModal', null),
  withProps(({ match, event }) => {
    return {
      event,
      accessToken: store.get('accessToken').id,
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
