import React from 'react'
import { withProps, compose } from 'recompose'
import { reduxForm } from 'redux-form'
import withCrud from 'containers/withCrud'
import moment from 'moment'

import Form from './Form'

export default compose(
  withCrud,
  withProps(({ fetch, close, data, upsert, remove, fetchParent }) => ({
    initialValues: data,
    onSubmit: async(form) => {
      console.log('HERE')
      const data = {
        name: form.name
      }
      await upsert('contact-groups', data, form.id);
      fetchParent();
    },
    onDelete: () => remove(`contact-groups`, data.id)
  })),
  reduxForm({ form: 'contact-group' }),
)(Form)
