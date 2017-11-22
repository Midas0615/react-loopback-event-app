import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure, withState } from 'recompose'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Fa from 'components/Fa'

// Components
import DataTable from 'components/DataTable'
import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'

import Editor from './Container'


const Row = ({ resource: contactGroup, toggleEditorCreate }) =>
<tr>
  <td>{contactGroup.name}</td>
  <td><button onClick={() => toggleEditorCreate(contactGroup)}>Edit</button></td>
</tr>

const ContactGroup = (props) =>
<Modal title="Contact Groups">
  {
    !props.editOrCreate &&
    <div>
      <DataTable
        {...props}
        Component={Row}
        heading={['Name', 'Actions']}
      />
      <ModalFooter>
        <Button primary onClick={() => props.toggleEditorCreate({})}>New Contact Group</Button>
        <Button type="button" blank onClick={props.close}>Close</Button>
      </ModalFooter>
    </div>
  }
  {
    props.editOrCreate &&
    <Editor
      fetch={props.fetch}
      data={props.editOrCreate}
      close={() => props.toggleEditorCreate(false)}
    />
  }
</Modal>


export default compose(
  withState('editOrCreate', 'toggleEditorCreate', null),
  withProps({
    resource: 'contact-groups',
    params: { limit: 10 }
  }),
  withPaginate,
  pure
)(ContactGroup)
