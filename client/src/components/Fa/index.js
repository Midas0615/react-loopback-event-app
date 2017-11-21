import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'

const Icon = styled.i`
  color: ${props => props.primary ?  props.theme.primary : null};
  color: ${props => props.success ?  props.theme.success : null};
  color: ${props => props.warning ?  props.theme.warning : null};
  color: ${props => props.danger ?  props.theme.danger : null};
  color: ${props => props.border ?  props.theme.border : null};
  color: ${props => props.gray ?  props.theme.gray : null};
  color: ${props => props.pointer ?  props.theme.pointer : null};
  ${ props => props.date ? `position: absolute; top: 7px; right: 21px; cursor: pointer; color: ${theme.danger};` : null };
  ${ props => props.dropdown ? `position: absolute; top: 7px; right: 21px; cursor: pointer; color: ${theme.light};` : null };
  ${ props => props.table ? `font-size: 20px; cursor: pointer; margin-right: 5px;` : null };

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
