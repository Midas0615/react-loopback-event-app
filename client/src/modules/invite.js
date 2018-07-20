import createReducer from 'lib/createReducer'
import store from 'store'
import API from 'services/api'

const REQUEST = 'INVITE/SET_EVENT';
const RECEIVE = 'INVITE/RECEIVE_INVITE_LIST';
const REJECT = 'INVITE/REJECT_INVITE_LIST';
const ADD_CANDIDATE = 'INVITE/ADD_CANDIDATE';
const REMOVE_CANDIDATE = 'INVITE/REMOVE_CANDIDATE';
const CLEAR_STATE = 'INVITE/CLEAR_STATE'
const INVITE_START ='INVITE/START_INVITING'
const INVITE_END = 'INVITE/END_INVITING'

export const fetchEvent = (eventId) => async dispatch => {
  dispatch({ type: REQUEST })
  try {
    const params = { include: 'contacts' };
    const event = await API().get(`/events/${eventId}`, { params: { filter: JSON.stringify(params) } });
    console.log('@#@@@@@@@@', event);
    const invitees = event.contacts.map(item => item.id);
    dispatch({ type: RECEIVE, event, invitees })
  } catch(e) {
    dispatch({ type: REJECT })
  }
}


 async function invite(contactId, eventId) {
  return await API().post('/invites', { contactId, eventId, emailConfirmation: true })
}

export const inviteContacts = (contactList, eventId) => dispatch => {
  dispatch({ type: INVITE_START });
  try {
    contactList.map(async (id) => await invite(id, eventId));
    dispatch({ type: INVITE_END });
  } catch(e) {
    console.log(e);
    dispatch({ type: INVITE_END });
  }

}

export const addCandidate = candidate => ({ type: ADD_CANDIDATE, candidate })
export const removeCandidate = candidateId => ({ type: REMOVE_CANDIDATE, candidateId })
export const clearState = () => ({ type: CLEAR_STATE, initialState })

const initialState = {
  event: {},
  ready: false,
  invitees: [],
  candidates: [],
  candidatesInfo: {},
}

export default createReducer(initialState, {
  [REQUEST]: (state, action) => ({ ...state, isFetching: true, ready: false }),
  [RECEIVE]: (state, action) => ({ ...state, event: action.event, invitees: action.invitees, isFetching: false, ready: true }),
  [REJECT]: (state, action) => ({ ...state, isFetching: false, ready: false }),
  [ADD_CANDIDATE]: (state, action) => {
    const clonedInfo = { ...state.candidatesInfo};
    clonedInfo[action.candidate.id] = action.candidate;
    const clonedCandidates = state.candidates.slice();
    clonedCandidates.push(action.candidate.id);
    return { ...state, candidatesInfo: clonedInfo, candidates: clonedCandidates }
  },
  [REMOVE_CANDIDATE]: (state, action) => {
    const clonedInfo = { ...state.candidatesInfo};
    const clonedCandidates = state.candidates.slice();
    delete clonedInfo[action.candidateId];
    const idx = clonedCandidates.indexOf(action.candidateId)
    clonedCandidates.splice(idx, 1)
    return { ...state, candidatesInfo: clonedInfo, candidates: clonedCandidates }
  },
  [CLEAR_STATE]: (state, action) => {
    return {...action.initialState}
  },
  [INVITE_START]: (state, action) => ({ ...state, isInviting: true }),
  [INVITE_END]: (state, action) => ({ ...initialState }),
})
