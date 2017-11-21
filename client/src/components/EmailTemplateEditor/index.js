import React from 'react'
import { withProps, withState, compose } from 'recompose'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import withCrud from 'containers/withCrud'
import Form from './Form'

export default compose(
  connect(state => ({
    type: formValueSelector('email-template')(state, 'type'),
  })),
  withCrud,
  withProps(({ fetch, close, data, upsert, remove }) => ({
    initialValues: {...data, type: { name: data.type} },
    onSubmit: form => {
      const data = {
        html: form.html,
        name: form.name,
        type: form.type.name,
        html: form.html,
      }
      upsert('email-templates', data, form.id);
    },
    onDelete: () => remove(`email-templates`, data.id)
  })),
  reduxForm({ form: 'email-template' }),
)(Form)
