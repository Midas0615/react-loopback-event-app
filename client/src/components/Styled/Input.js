import styled, { css } from 'styled-components'
import theme from 'styles/theme'


export const InputGroup = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  ${props => props.fullWidth && `width: 100%`};
  ${props => props.width && `width: ${props.width}rem`};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-right: ${props.ml}rem`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
`

export const Input = styled.input`
  border: 1px solid ${theme.border};
  padding: .5rem .5rem;
  box-sizing: border-box;
  outline: none;
  font-family: ${theme.fontFamily};
  font-size: 14px;
  border-radius: ${theme.borderRadius};
  width: 100%;

  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }
  &:disabled {
    background: ${theme.light};
  }
`
