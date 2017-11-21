import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const TableWrapper = styled.div `
  background: #fff;
  padding: 1rem 1rem;
  margin-bottom: 3rem;
  box-shadow: 3px 3px 13px -5px rgba(0,0,0,0.74);
`

export const Table = styled.table `
  width: 100%;
  border-collapse: collapse;
`
export const TableHeader = styled.thead `
  &>tr>th{
    text-align: left;
    padding: 1rem 1rem;
    color: ${theme.gray};
    text-transform: uppercase;
    font-size: ${theme.fontSmall};
  }
`

export const TableBody = styled.tbody`
  &>:first-child{border-top: none;}
  &>:last-child{border-bottom: 1px solid ${theme.border};}
  &>:nth-child(even){ background-color: ${theme.border.lighten(0.26)}}
  &>tr>td{
    padding: 1rem 1rem;
    border-top: 1px solid ${theme.border};
    font-weight: 600;
  }
  &>tr>:first-child{
    color: ${theme.primary};
`
