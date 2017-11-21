import React from 'react'
import theme from 'styles/theme'
import styled, { css } from 'styled-components'

import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { Table, TableBody, TableHeader } from 'components/Styled/Table'

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component, heading }) =>
<div>
  <Table>
    <TableHeader>
      <tr>
        {heading.map((item, index) => <th key={index}>{item}</th>)}
      </tr>
    </TableHeader>
    <TableBody>
      {
      data && data.map((resource, index) =>
        <Component resource={resource} key={index}/>
      )}
      {
        isFetching &&
        <tr><td colSpan={6}>LOADING</td></tr>
      }
    </TableBody>
  </Table>

  <Flex center>
    <Button onClick={fetchMore} disabled={!canLoadMore} primary large>Load More</Button>
  </Flex>
  {/* Napisi ovo po kulturno :D */}
  <br/>
  <br/>
  {/* <button onClick={refetch}>Reset</button> */}
  {/* <br/>
  Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
  Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
  Is Error: { isError ? 'Yes': 'No' } */}

</div>

export default DataTable
