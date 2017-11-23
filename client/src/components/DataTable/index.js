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

const DataTable = ({ resource, data, canLoadMore, isFetching, fetchMore, refetch, isError, Component, heading, ...other, noDataCaption }) =>
    <div>
      <Table>
        <TableHeader>
          <tr>
            {heading.map((item, index) =>
              item.width
              ?  <th key={index} style={{width: `${item.width}rem`}}>{item.title}</th>
              : <th key={index}>{item}</th>
            )}
          </tr>
        </TableHeader>
        <TableBody>
          {
          data && data.map((resource, index) =>
            <Component resource={resource} key={index} index={index} refetch={refetch} {...other} />
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
            data && !data.length &&
            <tr>
              <td colSpan={6}>
                <Flex center my={3}>
                  <h3>{noDataCaption || 'No results'}</h3>
                </Flex>
              </td>
            </tr>
          }
        </TableBody>
      </Table>
      {
        canLoadMore &&
        <Flex center my={2}>
          <Button onClick={fetchMore} primary large>Load More</Button>
        </Flex>
      }
    </div>


export default DataTable
