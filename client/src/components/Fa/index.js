import React from 'react'
import styled, { css } from 'styled-components'
import theme from 'styles/theme'

const Icon = styled.i`
  pointer-events: none;
  color: ${props => props.primary && props.theme.primary };
  color: ${props => props.success && props.theme.success};
  color: ${props => props.warning &&  props.theme.warning};
  color: ${props => props.danger &&  props.theme.danger};
  color: ${props => props.border &&  props.theme.border};
  color: ${props => props.gray &&  props.theme.gray};
  ${props => props.md ?  'font-size: 1rem' : null};
  ${props => props.lg ?  'font-size: 1.2rem' : null};

  ${ props => props.input && css`
    position: absolute;
    top: 5px;
    right: 7px;
    font-size: 1.2rem;
  `};
  ${ props => props.table ? `font-size: 20px; cursor: pointer; margin-right: 5px;` : null };

`

export default (props) => (
  <Icon
    className={`${props.icon}`}
    {...props}
  ></Icon>
)
