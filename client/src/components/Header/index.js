import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'components/Styled'
import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { connect } from 'react-redux'
import { logout } from 'modules/user'

import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import Container from 'components/Styled/Container'
import InviteModal from 'components/InviteModal'

const Item = styled(NavLink)`
  display: flex;
  border-left: 1px solid ${theme.border};
  padding: 0rem 1rem;
  background: ${theme.base};
  color: ${theme.primary};
  cursor: pointer;
  transition: 0.3s background;
  &:hover{
    background-color: ${theme.primary.darken(0.1)};
    color: ${theme.base};
  };
  &:last-child{border-right: 1px solid ${theme.border}};
  &.active {
    background: ${theme.primary};
    color: ${theme.base};
    &:hover{
      background: ${theme.primary};
    }
  }
`

const LogoutButton = styled(Button)`
  border: 1px solid ${theme.danger};
  background-color: transparent;
  padding: 0rem 1rem;
  color: ${theme.danger};
  height: 27px;
  font-weight: bold;
  margin-left: 1rem;
  &:hover{ background: ${theme.danger}; color: ${theme.base};}
`

const Header = ({ user, logout }) =>
<Nav>
  <Container>
    <Flex space>
      <Flex>
        <Item exact to='/'>Events</Item>
        <Item to='/contacts'>Contacts</Item>
        <Item to='/email-templates'>Email Templates</Item>
      </Flex>
      <Flex>
        Logged in as: {user.firstName} {' '}
        <InviteModal />

        <Flex mt={0.75}>

          <LogoutButton onClick={logout}>
            <div style={{transform: 'translateY(-12px)'}}>
            <Fa icon='ion-log-out' /> Log out
            </div>
          </LogoutButton>
        </Flex>
      </Flex>
    </Flex>
  </Container>
</Nav>

const msp = state => ({ user: state.user })
const mdp = dispatch => ({ logout: () => dispatch(logout()) })
export default connect(msp, mdp)(Header)
