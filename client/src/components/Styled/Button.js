import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export default styled.button`
  border: 1px solid ${theme.border};
  color: ${theme.medium};
  padding: .75rem 1rem;
  line-height: 1.6;
  outline: 0;
  cursor: pointer;
  font-size: 0.8rem;
  border-radius: ${theme.borderRadius};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-right: ${props.ml}rem`};
  ${props => props.primary && css`
    background: ${theme.primary};
    color: ${theme.light};
    border: 1px solid ${theme.primary};
  `};
  ${props => props.warning && css`
    background: ${theme.warning};
    color: ${theme.light};
    border: 1px solid ${theme.warning};
  `};
  ${props => props.blank && css`
    background: none;
    color: ${theme.dark};
    border: 1px solid transparent;
  `};
  ${props => props.lg && css`
    margin-top: 2rem;
    padding: 0.65rem 1rem;
    color: ${theme.base};
  `};
  ${props => props.icon && css`
    padding: 0.5rem 1rem;
    background: transparent;
  `};
  ${props => props.mr && `margin-right: ${props.mr}rem`};
  ${props => props.ml && `margin-left: ${props.ml}rem`};
  ${props => props.my && `margin: ${props.my}rem 0`};
  ${props => props.mx && `margin: 0 ${props.mx}rem`};

  background-color: ${props => props.backgroundPrimary && props.theme.primary };
  background-color: ${props => props.backgroundSuccess && props.theme.success};
  background-color: ${props => props.backgroundWarning &&  props.theme.warning};
  background-color: ${props => props.backgroundDanger &&  props.theme.danger};
  background-color: ${props => props.backgroundGray &&  props.theme.gray};

  border-color: ${props => props.borderPrimary && props.theme.primary };
  border-color: ${props => props.borderSuccess && props.theme.success};
  border-color: ${props => props.borderWarning &&  props.theme.warning};
  border-color: ${props => props.borderDanger &&  props.theme.danger};
  border-color: ${props => props.borderBorder &&  props.theme.border};
  border-color: ${props => props.borderGray &&  props.theme.gray};
  &:disabled {
    opacity: 0.3;
  }

`
