import React from 'react'
import { withProps, compose } from 'recompose'
import { reduxForm } from 'redux-form'
import withCrud from 'containers/withCrud'
import moment from 'moment'

import Form from './Form'

export default compose(
  withCrud,
  withProps(({ fetch, close, data, upsert, remove }) => ({
    initialValues: {...data, eventDate: data.eventDate ? moment(data.eventDate): null },
    onSubmit: form => {
      const data = {
        name: form.name,
        location: form.location,
        comment: form.comment
      }
      if (moment(form.eventDate).isValid()) data.eventDate = moment(form.eventDate).format()
      upsert('events', data, form.id);
    },
    onDelete: () => remove(`events`, data.id)
  })),
  reduxForm({ form: 'event' }),
)(Form)
