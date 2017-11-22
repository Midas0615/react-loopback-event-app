import React from 'react'
import theme from 'styles/theme'
import styled, { css } from 'styled-components'
import LoadingRotator  from 'components/Styled/Animations';

import { Button } from 'components/Styled'
import { Flex } from 'components/Styled/Flex'
import { Table, TableBody, TableHeader, TableLoader } from 'components/Styled/Table'
import Fa from 'components/Fa'

const LoadingWrapper = styled.div`

`

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component, heading, ...other }) =>
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
          <Component resource={resource} key={index} {...other}/>
        )}
        {
          isFetching &&
          <tr>
            <td colSpan={6}>
              <Flex center>
                <LoadingRotator duration="0.8s" delay="0s" iterationCount="infinite">
                  <Fa double primary icon='ion-load-c' />
                </LoadingRotator>
              </Flex>
            </td>
          </tr>
        }
        {
          data &&
          <tr>
            <td colSpan={6}>
              <Flex center>
                <h3>No events to show, click on <pre>Create</pre> to add some</h3>
              </Flex>
            </td>
          </tr>
        }
      </TableBody>
    </Table>
    <Flex center my={2}>
      <Button onClick={fetchMore} disabled={!canLoadMore} primary large>Load More</Button>
    </Flex>
    {/* <button onClick={refetch}>Reset</button> */}
    {/* <br/>
    Can Load More: { canLoadMore ? 'Yes': 'No' } <br/>
    Is Fetching: { isFetching ? 'Yes' : 'No' } <br/>
    Is Error: { isError ? 'Yes': 'No' } */}

  </div>

export default DataTable
