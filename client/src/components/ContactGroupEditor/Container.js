import React from 'react'
import { withProps, compose } from 'recompose'
import { reduxForm } from 'redux-form'
import withCrud from 'containers/withCrud'
import moment from 'moment'

import Form from './Form'

export default compose(
  withCrud,
  withProps(({ fetch, close, data, upsert, remove }) => ({
    initialValues: data,
    onSubmit: form => {
      const data = {
        name: form.name
      }
      upsert('contact-groups', data, form.id);
    },
    onDelete: () => remove(`contact-groups`, data.id)
  })),
  reduxForm({ form: 'contact-group' }),
)(Form)
