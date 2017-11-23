import styled, { css, keyframes } from 'styled-components'
import theme from 'styles/theme'


const slideInDown = keyframes`
  from {
    transform: translateY(-1rem);
  }
`

const PANEL_PADDING = '1rem 1rem';

export const Panel = styled.div `
  background: #fff;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.22);
  border: 1px solid ${theme.border};
  ${props => props.my && css`
    margin: ${props.my}rem 0rem;
  `};
  ${props => props.mt && css`
    margin-top: ${props.mt}rem;
  `};
  ${props => props.mb && css`
    margin-bottom: ${props.mb}rem;
  `};
`

export const PanelHeading = styled.div`
  border-bottom: 1px solid ${theme.border};
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props => props.primary && css`
    background: ${theme.genesis};
    padding: 1.5rem 1rem;
    color: #FFF;
    border: none;

  `};
`;

export const PanelBody = styled.div`
  padding: ${PANEL_PADDING};
  ${props => props.dirtyWhite && css`
    background: ${theme.dirtyWhite};
  `};
`

export const PanelFooter =styled.div`
  padding: ${PANEL_PADDING};
  padding-top: 1.5rem;
  border-bottom: 1px solid ${theme.border};
`
