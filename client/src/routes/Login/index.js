import React from 'react'
import { connect } from 'react-redux'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import { login } from 'modules/user'
import { Redirect } from 'react-router-dom'
import { Panel, PanelBody, PanelHeading } from 'components/Styled/Panel'
import styled from 'styled-components'

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
        <form onSubmit={handleSubmit}>
          <Field name="email" type="text" component="input"  required /> <br/>
          <Field name="password" type="text" component="input"  required /> <br/>
          {
            user.isFetching
            ? <button disabled>Logging in...</button>
            : <button disabled={invalid || pristine}>Submit</button>
          }
          {user.isError && <span>Login Error</span>}
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
