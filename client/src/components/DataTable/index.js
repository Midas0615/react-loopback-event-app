import React from 'react'
import { Button } from 'components/Styled'

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component }) =>
<div>
  <h1>{resource}</h1>
  { data && data.map((resource, index) => <Component resource={resource} key={index}/> )}
  <hr/>
  <Button onClick={fetchMore} disabled={!canLoadMore} primary>Load More</Button>

  <br/>
  <br/>
  <button onClick={refetch}>Reset</button>
  <br/>
  Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
  Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
  Is Error: { isError ? 'Yes': 'No' }

</div>


export default DataTable
