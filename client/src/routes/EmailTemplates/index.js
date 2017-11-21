import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure, withState } from 'recompose'
import DataTable from 'components/DataTable'
import AppLayout from 'layout/AppLayout'
import { Panel, PanelHeading } from 'components/Styled/Panel'
import Label from 'components/Styled/Label'
import Button from 'components/Styled/Button'
import EmailTemplateEditor from 'components/EmailTemplateEditor'


const Row = ({ resource: template, toggleModal }) => {
  return (
    <tr>
      <td>
        <Label
          success={template.type !== 'system'}
          warning={template.type === 'system'}
          >
          {template.type}
        </Label>
      </td>
      <td>
        {template.name} <br/>
        {template.type === 'system' && <small>Automatic is sent when user gets invited to an event</small>}
      </td>
      <td><Button onClick={() => toggleModal(template)}>Edit</Button></td>
    </tr>
  )
}

const Contacts = (props) =>
<AppLayout>
  <Panel my={2}>
    <PanelHeading primary><strong>Email Templates</strong></PanelHeading>
    <DataTable
      {...props}
      Component={Row}
      heading={['type', 'name', 'actions']}
    />
  </Panel>
  {/* Modal */}
  {  props.modal &&
    <EmailTemplateEditor
      data={props.modal}
      fetch={props.fetch}
      close={() => props.toggleModal(null)}
    /> }
</AppLayout>


export default compose(
  withState('modal', 'toggleModal', null),
  withProps({
    resource: 'email-templates',
    params: { limit: 10},
  }),
  withPaginate,
  pure
)(Contacts)
