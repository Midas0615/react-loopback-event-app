import React from 'react'
import { connect } from 'react-redux'
import { verifyToken } from 'modules/user'
import { compose, lifecycle } from 'recompose'
import { Redirect, withRouter } from 'react-router-dom'

const Auth = ({ children, user }) => {
  if (user.isFetching) return null
  if (!user.id) return <Redirect to="/login" />
  return (
    <div>
      {children}
    </div>
  )
}

const msp = state => ({ user: state.user })
const mdp = dispatch => ({ verifyToken: () => dispatch(verifyToken()) })
export default compose(
  withRouter,
  connect(msp, mdp),
  lifecycle({
    componentWillMount() {
      this.props.verifyToken()
    }
  }),
)(Auth)
