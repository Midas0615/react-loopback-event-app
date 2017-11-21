import styled, { css } from 'styled-components'
import theme from 'styles/theme'
//
// import styled, { css, extend } from 'styled-components'
//
// const Dropdown = Input.extend`
//  // menjas kvo ti se ne svidja
// `


export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
`
export const Input = styled.input`
  border: 1px solid ${theme.border};
  padding: 7px 5px;
  outline: none;
  border-radius: ${theme.borderRadius};
  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }
`

export const Datefield = styled.input`
  border: 1px solid ${theme.border};
  padding: 7px 5px;
  outline: none;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: ${theme.borderRadius};
  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }

`
