import React from 'react'
import { withProps, withState, compose } from 'recompose'
import { connect } from 'react-redux'
import API from 'services/api'

export default compose(
  withState('isSaving', 'setSaving'),
  withState('isError', 'setError'),
  withProps(({ setSaving, setError, fetch, close }) => ({
    upsert: async (resourceName, data, id) => {
      setSaving(true);
      setError(null);
      // UPDATE
      if (id) {
        try {
          const res = await API()
          .patch(`/${resourceName}/${id}`, data)
          setSaving(false);
          if (fetch) fetch(resourceName);
          if (close) close();
        } catch(e) {
          setSaving(false);
          setError('Error! Data not saved, please try again')
        }
        return;
      }
      // CREATE
      try {
        await API().post(`/${resourceName}`, data)
        setSaving(false);
        if (fetch) fetch(resourceName);
        if (close) close();
      } catch(e) {
        console.log(e)
        setSaving(false);
        setError('Error! Cannot create new entry.')
      }
    },
    remove: async (resourceName, id) => {
      try {
        await API().delete(`/${resourceName}/${id}`);
        if (fetch) fetch(resourceName);
        if (close) close();
      } catch(e) {
        setError('Error! Data not saved, please try again')
      }
    },
  })),
)
