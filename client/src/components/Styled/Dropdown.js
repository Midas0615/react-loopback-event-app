import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Dropdown = styled.input`
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
