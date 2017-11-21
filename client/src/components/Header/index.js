import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'components/Styled'
import { connect } from 'react-redux'
import { logout } from 'modules/user'

import styled from 'styled-components'
import theme from 'styles/theme'
import Container from 'components/Styled/Container'
import Flex from 'components/Styled/Flex'

const NavLink = styled(Link)`
  color: 'red'
`

const Header = ({ user, logout }) =>
<Nav>
  <Container>
    <div>
      <div>
        <NavLink to='/'>Home</NavLink>
        {' • '}
        <Link to='/contacts'>Contacts</Link>
        {' • '}
        <Link to='/email-templates'>Email Templates</Link>
      </div>
      <div>
        <span style={{marginRight:'100px'}}></span>
        Logged in as: {user.firstName} {' '}
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  </Container>
</Nav>

const msp = state => ({ user: state.user })
const mdp = dispatch => ({ logout: () => dispatch(logout()) })
export default connect(msp, mdp)(Header)
