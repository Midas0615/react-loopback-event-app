import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Table = styled.table `
  width: 100%;
  border-collapse: collapse;
`
export const TableHeader = styled.thead `
  &>tr>th{
    text-align: left;
    padding: 1rem 1rem;
    color: ${theme.dark};
    text-transform: uppercase;
    font-size: ${theme.fontSmall};
    border-bottom: 1px solid ${theme.border.lighten(0.1)};
  }
`

export const TableBody = styled.tbody`
  &>:nth-child(even){ background-color: ${theme.light.lighten(0.05)}; }
  &>tr>td{
    padding: 1rem 1rem;
    border-bottom: 1px solid ${theme.border.lighten(0.2)};
    color: ${theme.dark.lighten(0.7)};
  }
  &>tr>:first-child{
    color: ${theme.primary};
`
