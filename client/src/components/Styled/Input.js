import styled, { css } from 'styled-components'
import theme from 'styles/theme'
//
// import styled, { css, extend } from 'styled-components'
//
// const Dropdown = Input.extend`
//  // menjas kvo ti se ne svidja
// `


export const InputGroup = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  ${props => props.width && `width: ${props.width}rem`};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-right: ${props.ml}rem`};
`

export const Input = styled.input`
  border: 1px solid ${theme.border};
  padding: .5rem .5rem;
  box-sizing: border-box;
  outline: none;
  font-family: ${theme.fontFamily};
  font-size: 14px;
  border-radius: ${theme.borderRadius};

  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }
`
