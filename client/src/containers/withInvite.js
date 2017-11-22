import { connect } from 'react-redux'
import { addCandidate, removeCandidate, clearState, fetchEvent, inviteContacts } from 'modules/invite'


const msp = state => ({
  invite: state.invite
})

const mdp = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId)),
  addCandidate: candidate => dispatch(addCandidate(candidate)),
  removeCandidate: candidateId => dispatch(removeCandidate(candidateId)),
  clearState: () => dispatch(clearState()),
  inviteContacts: (contactList, eventId, onSuccess) => dispatch(inviteContacts(contactList, eventId, onSuccess)),
})

export default connect(msp, mdp)
