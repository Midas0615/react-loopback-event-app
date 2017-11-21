// Panel Heading
// Panel Body
// Panel Footer
// mozda da moze da se Panel koristi u Modal...


import styled, { css } from 'styled-components'
import theme from 'styles/theme'


const PANEL_PADDING = '1rem 1rem';

export const Panel = styled.div `
  background: #fff;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.16);
  border: 1px solid ${theme.border};
  border-radius: ${theme.borderRadius};
  ${props => props.my && css`
    margin: ${props.my}rem 0rem;
  `};
`

export const PanelHeading = styled.div`
  border-bottom: 1px solid ${theme.border};
  padding: ${PANEL_PADDING};
  border-top-left-radius: ${theme.borderRadius};
  border-top-right-radius: ${theme.borderRadius};
  ${props => props.primary && css`
    background: ${theme.light.darken(0.05)};
    padding: 1.5rem 1rem;
  `};
`;

export const PanelBody = styled.div`
  padding: ${PANEL_PADDING};
`

export const PanelFooter =styled.div`
  padding: ${PANEL_PADDING};
  padding-top: 1.5rem;
  border-bottom: 1px solid ${theme.border};
`
