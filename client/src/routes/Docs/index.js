import React from 'react'
import styled from 'styled-components'
import Color from 'color'



const darken = (prop, amt) => props => {
  return Color(props.theme[prop]).darken(amt).string();
}

const lighten = (prop, amt) => props => {
  return Color(props.theme[prop]).lighten(amt).string();
}



const ColoredButton = styled.button`
 background: ${ darken('primary', 1.3) };
`


export default () =>
<div>
  <ColoredButton>Button</ColoredButton>
</div>
