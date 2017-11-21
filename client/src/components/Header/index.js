import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'components/Styled'
import { connect } from 'react-redux'
import { logout } from 'modules/user'

const Header = ({ user, logout }) =>
<Nav>
  <Link to='/'>Home</Link>
  {' • '}
  <Link to='/contacts'>Contacts</Link>
  {' • '}
  <Link to='/email-templates'>Email Templates</Link>
  <span style={{marginRight:'100px'}}></span>
  Logged in as: {user.firstName} {' '}
  <button onClick={logout}>Log out</button>
</Nav>

const msp = state => ({ user: state.user })
const mdp = dispatch => ({ logout: () => dispatch(logout()) })
export default connect(msp, mdp)(Header)
