import React from 'react'
import qs from 'query-string'
import { Panel, PanelHeading, PanelBody} from 'components/Styled/Panel'
import Container from 'components/Styled/Container'
import Button from 'components/Styled/Button'
import { lifecycle } from 'recompose'
import API from 'services/api'

const Confirmation = () =>
<Container width={600}>
  <Panel my={3}>
    <PanelBody>
      <h1>Thank you for RSVP!</h1>
      <p>Your attendance status is updated.
      You can safely close this window!</p>
      <p>
        <Button onClick={() => window.close()} primary>Close Window</Button>
      </p>

    </PanelBody>

  </Panel>
</Container>

export default lifecycle({
  componentWillMount() {
    const {inviteId, status} = qs.parse(location.search);
    API().patch(`/invites/${inviteId}`,{ status, emailConfirmation: false })

  }
})(Confirmation)
