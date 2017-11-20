import React from 'react'
import { Button } from 'components/Styled'


// Primer
import theme from 'styles/theme'
import styled, { css } from 'styled-components'

const Test = styled.div`
  background: ${theme.danger};
  ${props => props.main && css`
    background: ${theme.success};
    font-size: 20px;
  `};
`

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component }) =>
<div>
  <h1>{resource}</h1>
  <h2>Header</h2>
  { data && data.map((resource, index) => <Component resource={resource} key={index}/> )}
  <hr/>
  <Button onClick={fetchMore} disabled={!canLoadMore} primary>Load More</Button>
    <Test main>
      Nesto
    </Test>
  <br/>
  <br/>
  <button onClick={refetch}>Reset</button>
  <br/>
  Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
  Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
  Is Error: { isError ? 'Yes': 'No' }

  <h2>Footer</h2>
  loadmoreitd

</div>


export default DataTable
