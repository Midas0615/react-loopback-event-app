import React from 'react'
import { Button } from 'components/Styled'


// Primer
import theme from 'styles/theme'
import styled, { css } from 'styled-components'

const Test = styled.div`
  &>div{

    padding: 2rem 0rem;
  }
`

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component }) =>
<div>
  {/* <h1>{resource}</h1> */}
  <Test>{ data && data.map((resource, index) => <Component resource={resource} key={index}/> )}</Test>
  <hr/>
  <Button onClick={fetchMore} disabled={!canLoadMore} primary>Load More</Button>
  {/* <Test main>Nesto</Test> */}
  <br/>
  <br/>
  <button onClick={refetch}>Reset</button>
  <br/>
  Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
  Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
  Is Error: { isError ? 'Yes': 'No' }

</div>


export default DataTable
