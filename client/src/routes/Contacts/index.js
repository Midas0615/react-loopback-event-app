import React from 'react'
import withPaginate from 'containers/withPaginate'
import { compose, withProps, pure, withState } from 'recompose'
import { connect } from 'react-redux'

import Page from './Page'

export default compose(
  withState('modal', 'toggleModal', null),
  withState('contactGroups', 'toggleContactGroups', false),
  withProps({
    resource: 'contacts',
    params: { limit: 10, order: 'createdAt DESC', where: {deleted: false}, include: 'contactGroup' }
  }),
  withPaginate,
  pure
)(Page)
