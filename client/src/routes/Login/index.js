import React from 'react'
import { connect } from 'react-redux'
import { withProps, compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import { login } from 'modules/user'
import { Redirect } from 'react-router-dom'


const Form = ({ handleSubmit, user, invalid, pristine }) => {
  if (user.id) return <Redirect to='/' />
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <Field name="email" type="text" component="input"  required/>
      <Field name="password" type="text" component="input"  required/>
      {
        user.isFetching
        ? <button disabled>Logging in...</button>
        : <button disabled={invalid || pristine}>Submit</button>
      }
      {user.isError && <span>Login Error</span>}
    </form>
  )
}

export default compose(
  connect(state => ({ user: state.user })),
  withProps(({ dispatch }) => ({
    onSubmit: data => dispatch(login(data))
  })),
  reduxForm({ form: 'contact' }),
)(Form)
