import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'

const Icon = styled.i`
  ${ props => props.primary ? `color: ${theme.main};` : null }
  ${ props => props.success ? `color: ${theme.success};` : null }
  ${ props => props.warning ? `color: ${theme.warning};` : null }
  ${ props => props.danger ? `color: ${theme.danger};` : null }
  ${ props => props.muted ? `color: ${theme.muted};` : null }
  ${ props => props.pointer ? `cursor: pointer;` : null }
  ${ props => props.date ? `position: absolute; top: 7px; right: 21px; cursor: pointer; color: ${theme.danger};` : null }
  ${ props => props.dropdown ? `position: absolute; top: 7px; right: 21px; cursor: pointer; color: ${theme.light};` : null }

`

export default (props) => (
  <Icon
    className={
      props.spin
        ? `fa fa-fw fa-spin ${props.icon ? `fa-${props.icon}` : 'fa-circle-o-notch'}`
        : `fa fa-fw fa-${props.icon}`
    }
    {...props}
  ></Icon>
)
