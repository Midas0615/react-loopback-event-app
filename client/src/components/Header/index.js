import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'components/Styled'

export default class Header extends Component {
  render() {
    return (
      <Nav>
          <Link to='/'>Home</Link>
          {' • '}
          <Link to='/contacts'>Contacts</Link>
      </Nav>

    )
  }
}
