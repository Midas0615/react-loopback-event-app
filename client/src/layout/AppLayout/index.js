import React from 'react'
import Header from 'components/Header'
import Container from 'components/Styled/Container'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const AppLayout = ({ children, user, history }) =>  {
  if (!user.isFetching && !user.id) history.push('login');
  return (
    <div>
      <Header />
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default compose(
  withRouter,
  connect(state => ({ user: state.user })),
)(AppLayout)
