import React from 'react'
import AppLayout from 'layout/AppLayout'
import withCrud from 'containers/withCrud'

import { Button } from 'components/Styled'
import { Panel, PanelHeading, PanelBody } from 'components/Styled/Panel'
import { Flex } from 'components/Styled/Flex'
import { compose, withProps, withHandlers, pure, withState } from 'recompose'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Input from 'components/Form/Input'
import { FormGroup } from 'components/Styled/Form'
import Alert from 'components/Styled/Alert'
import { Row, Col } from 'react-styled-flexboxgrid'
import { connect } from 'react-redux'

import { verifyToken } from 'modules/user'

const Item = (props) =>
<FormGroup>
  <Field
    type="text"
    component={Input}
    {...props}
  />
</FormGroup>




const Settings = ({ user, handleSubmit, invalid, saved }) => {
  if (!user.id) return <span>Not logged In</span>
  return (
    <AppLayout>
      <Panel my={4}>
        <PanelHeading primary>
          <h3>Account Settings</h3>
        </PanelHeading>
        <PanelBody>
          <Alert warning>
            <strong>Warning!</strong>
            <p>Please double check email and password when updating, if you make an error, or typo, data cannot be restored!</p>
          </Alert>
          <form onSubmit={handleSubmit}>
            <Item  type="email" name="email" label="Email:" required />
            <Row>
              <Col xs={12} sm={6}>
                <Item name="firstName" label="First Name:" required />
              </Col>
              <Col xs={12} sm={6}>
                <Item name="lastName" label="Last Name:" required />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Item
                  name="password"
                  type="password"
                  label="Password:"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Item
                  name="retypePassword"
                  type="password"
                  label="Retype Password:"
                />
              </Col>
            </Row>
            {
              saved &&
              <Alert success>Profile Updated!</Alert>
            }
            <FormGroup>
              <Button type="submit" primary lg disabled={invalid}>Update Settings</Button>
            </FormGroup>
          </form>
        </PanelBody>
      </Panel>
    </AppLayout>
  )
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const selector = formValueSelector('settings')
const validate = form => {
  let errors = {}
  if (form.password !== form.retypePassword) errors = {...errors, password: 'Paswords do not match', retypePassword: 'Passwords do not match'}
  if (form.password && form.password.length < 5) errors.password = 'Password must be at least 6 characters';
  if (!validateEmail(form.email)) errors.email = 'Please enter valid email.';
  return errors
}

export default compose(
  connect(state => ({
    user: state.user,
    typedPassword: selector(state, 'typedPassword'),
    retypedPassword: selector(state, 'retypePassword')
  })),
  withCrud,
  withProps(({user}) => ({
    initialValues: user,
  })),
  withState('saved', 'setSaved', false),
  withHandlers({
    onSubmit:  ({ dispatch, upsert, user, setSaved }) => async form => {
      const data = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      }
      if (form.password) data.password = form.password;
      try {
        setSaved(false)
        await upsert('accounts', data, user.id)
        dispatch(verifyToken());
        setSaved(true)
      } catch(e) {
        console.log(e)
      }

    },
  }),
  reduxForm({form: 'settings', validate}),
  pure
)(Settings)
