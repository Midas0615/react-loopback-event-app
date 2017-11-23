import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.button`
  color: ${theme.medium};
  padding: .5rem 1rem;
  line-height: 1.6;
  font-size: 0.8rem;
  outline: 0;
  cursor: pointer;
  border-radius: ${theme.borderRadius};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};

  ${'' /* Color */}
  ${props => props.primary && css`
    background: ${theme.primary};
    color: ${theme.base};
    border: 1px solid ${theme.primary};
  `};
  ${props => props.warning && css`
    background: ${theme.warning};
    color: ${theme.base};
    border: 1px solid ${theme.warning};
  `};
  ${props => props.blank && css`
    background: none;
    border: none;
    color: ${theme.primary};
  `};
  ${props => props.success && css`
    background: ${theme.success};
    color: ${theme.base};
    border: 1px solid ${theme.success};
  `};

  ${props => props.danger && css`
    background: ${theme.danger};
    color: ${theme.base};
    border: 1px solid ${theme.danger};
  `};

  ${props => props.gray && css`
    background: ${theme.gray};
    color: ${theme.base};
    border: 1px solid ${theme.gray};
  `};

  ${props => props.border && css`
    background: ${theme.border};
    color: ${theme.base};
    border: 1px solid ${theme.border};
  `};
  ${props => props.dirtyWhite && css`
    background: ${theme.dirtyWhite};
    color: ${theme.dark};
    border: 1px solid ${theme.dirtyWhite};
  `};
  &:disabled {
    opacity: 0.3;
  }

  ${'' /* Size */}
  ${props => props.lg && css`
    padding: 0.75rem 1.75rem;
    font-size: 1rem;
  `};

  ${props => props.sm && css`
    padding: 0.58rem 0.5rem;
    font-size: 0.6rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.6px;
  `};


  ${'' /* Type */}
  ${props => props.withicon && css`
    padding: 2px 10px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11.5px;
  `};

  ${props => props.buttonIcon && css`
    padding: 0.4rem 1rem;
  `};

`
