import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'components/Styled'
import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { connect } from 'react-redux'
import { logout } from 'modules/user'
import Text from 'components/Styled/Text'

import styled from 'styled-components'
import theme from 'styles/theme'
import Fa from 'components/Fa'
import Container from 'components/Styled/Container'
import InviteModal from 'components/InviteModal'

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  border: none;
  background: ${theme.genesis};
  color: rgba(255,255,255, 0.7);
  cursor: pointer;
  transition: 0.3s background;

  &:hover{
    background-color: ${theme.primary.darken(0.1)};
    color: ${theme.base};
    border: none;
    cursor: pointer;

  };
  &.active {
    background: ${theme.primary};
    color: ${theme.base};
    &:hover{
      background: ${theme.primary};
    }
  }
`

const LogoutButton = styled(Button)`
  border: none;
  padding: .5rem 1rem;
  border: 0;
  margin-right: 2rem;
  background: none;
  font-size: .87rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.medium.lighten(0.8)};
  &:hover {
    cursor: pointer;
    color: ${theme.primary};
  }
`

const Logo = styled.img`
  height: 90px;
  margin-right: 2rem;
`

const Header = ({ user, logout }) =>
<Nav>
  <Flex>
    <Logo src="/genesis-90.png"/>
    <Item to='/events'><Fa icon='ion-ios-calendar-outline' mr={0.3} md/>Events</Item>
    <Item to='/contacts'><Fa icon='ion-person-stalker' mr={0.3} md/>Contacts</Item>
    <Item to='/email-templates'><Fa icon='ion-ios-email-outline' md mr={0.3}/>Email Templates</Item>
  </Flex>
  <Flex>
    <InviteModal />
    <Item to="/settings">
       <Fa icon='ion-ios-gear' mr={0.3}/>Settings
    </Item>
    {
      user.id &&
      <LogoutButton onClick={logout}>
        <Fa icon='ion-power' mr={0.3}/> Log out ({user.firstName})
      </LogoutButton>
    }
  </Flex>
</Nav>

const msp = state => ({ user: state.user })
const mdp = dispatch => ({ logout: () => dispatch(logout()) })
export default connect(msp, mdp)(Header)
