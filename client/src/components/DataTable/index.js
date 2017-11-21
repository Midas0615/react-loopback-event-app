import React from 'react'
import theme from 'styles/theme'
import styled, { css } from 'styled-components'

import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { TableWrapper, Table, TableBody, TableHeader } from 'components/Styled/Table'


const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component }) =>
<TableWrapper>
  <Table>
    <TableHeader>
      {/* TOA CE MORA SAS PROpS ISTO */}
      <tr>
        <th>Event</th>
        <th>Date</th>
        <th>Location</th>
        <th>Action</th>
      </tr>
    </TableHeader>
    <TableBody>{ data && data.map((resource, index) =>
      <Component resource={resource} key={index}/>)}
    </TableBody>
  </Table>

  <Flex center>
    <Button onClick={fetchMore} disabled={!canLoadMore} primary large>Load More</Button>
  </Flex>

  <br/>
  <br/>
  {/* <button onClick={refetch}>Reset</button> */}
  {/* <br/>
  Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
  Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
  Is Error: { isError ? 'Yes': 'No' } */}

</TableWrapper>

export default DataTable
