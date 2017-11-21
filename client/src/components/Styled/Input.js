import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Input = styled.input`
  border: 1px solid ${theme.border};
  padding: 7px 5px;
  outline: none;
  margin-right: 1rem;
  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }

`

export const DatefieldWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const Datefield = styled.input`
  border: 1px solid ${theme.border};
  padding: 7px 5px;
  outline: none;
  margin-right: 1rem;
  cursor: pointer;
  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }

`

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const Dropdown = styled.input`
  border: 1px solid ${theme.border};
  padding: 7px 5px;
  outline: none;
  margin-right: 1rem;
  cursor: pointer;
  &:focus {
    box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
    border: 1px solid rgba(79, 169, 255, 1);
  }
  &::-webkit-input-placeholder {
    color: ${theme.border};
  }

`
