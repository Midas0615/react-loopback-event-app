'use strict';
const json2csv = require('json2csv');
const app = require('./../../server/server');

// AfterRemote
function sendFile(ctx, data, next) {
  ctx.res.setHeader('Content-Length', data.csv.length);
  ctx.res.setHeader('Content-disposition', 'attachment; filename='+data.name+'.csv' );
  ctx.res.setHeader('Content-type', 'text/csv');
  ctx.res.send(data.csv);
}

module.exports = function(Download) {
  Download.contacts = async () => {
    
    const contacts = await app.models.Contact.find({include: 'contactGroup'});
    const data = contacts.map(contact => {
      contact.groupName = contact.contactGroup() ? contact.contactGroup().name : '';
      return contact;
    });
    // console.log(JSON.stringify(data[0]));
    const csv = json2csv({ data, fields: ['title', 'firstName', 'lastName', 'groupName', 'email', 'organization', 'address1', 'address2', 'address3', 'zip', 'city', 'phone', 'comment', 'createdAt', 'updatedAt', 'deleted', 'id', 'accountId', 'contactGroupId']});
    return {csv, name: 'contacts-backup'};
  };

  Download.events = async () => {
    const data = await app.models.Event.find();
    const csv = json2csv({ data, fields: ['name', 'eventDate', 'eventLocation', 'geoLocation', 'comment', 'deleted', 'createdAt', 'updatedAt', 'id', 'accountId']});
    return {csv, name: 'events-backup'};
  };

  Download.invites = async (eventId) => {
    const event = await app.models.Event.findOne({where: { id: eventId }});
    // JOIN query - Return all invites with contact, and all contact-group of each contact
    const invites = await app.models.Invitation.find({where: {eventId: eventId}, include: {contact: 'contactGroup'}});
    // console.log (invites);
    const data = invites.map(item => {
      // for contact has undefined group-name(NULL)
      const contactGroup = item.contact().contactGroup() || {name: ''};
      const contactGroupName = contactGroup.name;
      if (item.contact().deleted === false) {
        return {
          title: item.contact().title, 
          first_name: item.contact().firstName, 
          last_name: item.contact().lastName, 
          full_name: item.contact().title + ' ' + 
                    item.contact().firstName + ' ' + 
                    item.contact().lastName, 
          email: item.contact().email,
          comment: item.contact().comment,
          status: item.status,
          group_name: contactGroupName,
        }
      }
    })
    const eventName = event.name;
    const csv = json2csv({ data, fields: ['title', 'first_name', 'last_name', 'full_name', 'email', 'comment', 'status', 'group_name'] });
    return {csv, name: `${eventName}-contacts`}
  }

  Download.afterRemote('contacts', sendFile);
  Download.afterRemote('events', sendFile);
  Download.afterRemote('invites', sendFile);
};
