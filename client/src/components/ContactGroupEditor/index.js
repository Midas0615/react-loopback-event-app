import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure, withState, withHandlers } from 'recompose'
import Modal from 'components/Modal'
import { ModalBody, ModalFooter } from 'components/Styled/Modal'
import Fa from 'components/Fa'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/Form/Input'

// Components
import DataTable from 'components/DataTable'
import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { FormGroup } from 'components/Styled/Form'

import Editor from './Container'


const Row = ({ resource: contactGroup, toggleEditorCreate }) =>
<tr>
  <td>{contactGroup.name}</td>
  <td><Button  onClick={() => toggleEditorCreate(contactGroup)}><Fa  icon='ion-edit'/> Edit</Button></td>
</tr>


const ContactGroup = (props) =>
<Modal title="Contact Groups">
  {
    !props.editOrCreate &&
    <div>
      <ModalBody>
        <form onSubmit={props.handleSubmit}>
          <Field component={Input} name="query" label="Filter Contact Groups:" placeholder="type and hit enter ..." />
        </form>
      </ModalBody>
      <DataTable
        {...props}
        Component={Row}
        heading={['Name', {width: 5, title: ''}]}
      />
      <ModalFooter>
        <Button mr={0.5} primary onClick={() => props.toggleEditorCreate({})}>New Contact Group</Button>
        <Button type="button" blank onClick={props.close}>Close</Button>
      </ModalFooter>
    </div>
  }
  {
    props.editOrCreate &&
    <Editor
      fetch={props.fetch}
      refetch={props.refetch}
      fetchParent={props.fetchParent}
      data={props.editOrCreate}
      close={() => props.toggleEditorCreate(false)}
    />
  }
</Modal>


export default compose(
  withState('editOrCreate', 'toggleEditorCreate', null),
  withState('search', 'setSearch', null),
  withProps({
    resource: 'contact-groups',
    params: { limit: 10 }
  }),
  withPaginate,
  withHandlers({
    onSubmit: ({ fetch, fetchParent }) => async form => {
      let params = { where: { name: {ilike: form.query} } };
      if (!form.query) params = {}
      try {
        await fetch('contact-groups', params);
      } catch(e) {
        console.log(e)
      }
    },
  }),
  reduxForm({form: 'contactGroupSearch'}),
  pure
)(ContactGroup)
