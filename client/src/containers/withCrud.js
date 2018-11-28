import React from 'react'
import { withProps, withState, compose } from 'recompose'
import { connect } from 'react-redux'
import API from 'services/api'
import Resource from 'services/resource'


export default compose(
  withState('isSaving', 'setSaving'),
  withState('isError', 'setError'),
  withProps(({ setSaving, setError, fetch, refetch, close }) => ({
    upsert: async (resourceName, data, id) => {
      setSaving(true);
      setError(null);
      // UPDATE
      if (id) {
        try {
          // allow blank text
          if (data.title === undefined) data.title = '';

          const res = await API()
          .patch(`/${resourceName}/${id}`, data)
          setSaving(false);
          if (refetch) refetch();
          if (close) close();
        } catch(e) {
          setSaving(false);
          setError('Error! Data not saved, please try again')
        }
        return;
      }
      // CREATE
      try {
        // allow blank text
        if (data.title === undefined) data.title = '';

        await API().post(`/${resourceName}`, data)
        setSaving(false);
        if (refetch) refetch();
        if (close) close();
      } catch(e) {
        console.log(e)
        setSaving(false);
        setError('Error! Cannot create new entry.')
      }
    },
    duplicateEvent: async (data) => {
      try {
        // duplicate event
        let copyData = {};
        copyData.name = data.name;
        copyData.title = data.title || ''; 
        copyData.comment = data.comment;
        copyData.eventDate = data.eventDate;
        copyData.eventLocation = data.eventLocation;
        
        let contactList = await Resource('/invites', { where: {eventId: data.id} });
        // save new event into the db
        const response = await API().post('/events', copyData);
        const eventId = response.id;
        // pull invited contacts with eventId from the db and duplicate
        var contactId;
        contactList.map(async (item) => {
          contactId = item.contactId;
          await API().post('/invites', { contactId, eventId, emailConfirmation: true });
        });
        
        refetch();

      } catch(e) {
        console.log(e)
        setError('Error! Cannot create new entry.')
      }
    },
    removeInvitation: async (id) => {
      try {
        await API().delete(`/invites/${id}`);
        refetch();

      } catch(e) {
        console.log(e)
        setError('Error! Cannot create new entry.')
      }
    },
    remove: async (resourceName, id, forced) => {
      try {
        forced
        ? await API().delete(`/${resourceName}/${id}`)
        : await API().patch(`/${resourceName}/${id}`, {deleted: true})
        if (refetch) refetch(resourceName);
        if (close) close();
      } catch(e) {
        setError('Error! Data not saved, please try again')
      }
    },
  })),
)
