import React from 'react'
import withInvite from 'containers/withInvite'
import { compose, withState, withProps } from 'recompose'

import Button from 'components/Styled/Button'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import { Flex } from 'components/Styled/Flex'


import { Table, TableHeader, TableBody } from 'components/Styled/Table'


const Row = ({ candidate, removeCandidate }) =>
<tr>
  <td>{candidate.firstName} {candidate.lastName}</td>
  <td>
    <Button onClick={() => removeCandidate(candidate.id)}>Remove</Button>
  </td>
</tr>

const Info = ({ invite, removeCandidate, fetchEvent, clear, modal, toggleModal, inviteContacts }) => {
  if (!invite.ready) return null;
  const candidates = invite.candidatesInfo
  const list = invite.candidates;
  const event = invite.event;
  if (!modal) return <button onClick={() => toggleModal(true)}>View Candidates ({list.length})</button>
  return (
    <Modal title={`Invite to ${event.name}`}>
      {
        list.length > 0 &&
        <Table>
          <TableHeader>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </TableHeader>
          <TableBody>
          { list.map((id, idx) => <Row key={idx} candidate={candidates[id]} removeCandidate={removeCandidate} />) }
          </TableBody>
        </Table>
      }
      {
        !list.length &&
        <ModalBody>
          No users on this list.
        </ModalBody>
      }
      <ModalFooter>
        <Flex space>
          <div>
            {
              invite.isInviting
              ? <Button primary disabled>Inviting...</Button>
              : <Button primary disabled={!list.length} onClick={() => inviteContacts(list, event.id)}>Invite All Users to {event.name}</Button>
            }
            <Button blank onClick={() => toggleModal(false)}>Close</Button>
          </div>
          <div>
            <Button onClick={() => clear()}>Delete List</Button>
          </div>
        </Flex>

      </ModalFooter>
    </Modal>
  )
}

export default compose(
  withState('modal', 'toggleModal', false),
  withInvite,
  withProps(({ clearState, toggleModal}) => ({
    clear: () => {
      toggleModal();
      clearState();
    }
  })),
)(Info)
