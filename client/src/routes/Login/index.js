import React from 'react'
import { connect } from 'react-redux'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import { login } from 'modules/user'
import { Redirect } from 'react-router-dom'
import { Panel, PanelBody, PanelHeading } from 'components/Styled/Panel'
import styled from 'styled-components'

import Input from 'components/Form/Input'
import Button from 'components/Styled/Button'
import { FormGroup } from 'components/Styled/Form'

const Container = styled.div`
  margin: auto;
  width: 440px;
  margin-top: 3rem;
`

const Form = ({ handleSubmit, user, invalid, pristine }) => {
  if (user.id) return <Redirect to='/' />
  return (
    <Container>
      <Panel>
        <PanelHeading primary>Login</PanelHeading>
        <PanelBody>
        {user.loginError && <span>Login Error</span>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Field
              name="email"
              type="text"
              label="email:"
              component={Input}
              required
            />
          </FormGroup>
          <FormGroup>
            <Field
              name="password"
              type="password"
              label="password:"
              component={Input}
              required
            />
          </FormGroup>
          <FormGroup>
            {
              user.isFetching
              ? <Button disabled>Logging in...</Button>
              : <Button primary disabled={invalid || pristine}>Submit</Button>
            }
          </FormGroup>
        </form>
        </PanelBody>
      </Panel>
    </Container>
  )
}

export default compose(
  connect(state => ({ user: state.user })),
  withProps(({ dispatch }) => ({
    onSubmit: data => dispatch(login(data))
  })),
  reduxForm({ form: 'contact' }),
)(Form)
