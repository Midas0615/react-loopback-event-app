import React from 'react'
import { withProps, compose } from 'recompose'
import { reduxForm } from 'redux-form'
import withCrud from 'containers/withCrud'
import moment from 'moment'

import Form from './Form'

export default compose(
  withCrud,
  withProps(({ fetch, close, data, upsert, remove }) => ({
    initialValues: { ...data, title: data.title ? {name: data.title} : undefined },
    onSubmit: form => {
      const data = {
        title: form.title ? form.title.name : undefined,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        organization: form.organization,
        address1: form.address1,
        address2: form.address2,
        address3: form.address3,
        zip: form.zip,
        city: form.city,
        phone: form.phone
      }
      if (form.contactGroup) {
        data.contactGroupId = form.contactGroup.id;
      } else {
        data.contactGroupId = null;
      }

      upsert('contacts', data, form.id);
    },
    onDelete: () => remove(`contacts`, data.id)
  })),
  reduxForm({ form: 'contact' }),
)(Form)
