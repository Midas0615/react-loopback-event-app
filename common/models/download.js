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
    const data = await app.models.Contact.find();
    const csv = json2csv({ data, fields: ['firstName', 'lastName', 'email', 'organization', 'address1', 'address2', 'address3', 'zip', 'city', 'phone', 'comment']});
    return {csv, name: 'contacts-backup'};
  };

  Download.events = async () => {
    const data = await app.models.Event.find();
    const csv = json2csv({ data, fields: ['name', 'eventDate', 'eventLocation', 'comment']});
    return {csv, name: 'events-backup'};
  };

  Download.invites = async (eventId) => {
    const event = await app.models.Event.findOne({where: { id: eventId }});
    const invites = await app.models.Invitation.find({where: {eventId: eventId}, include: 'contact'});
    const data = invites.map(item => {
      return {
        first_name: item.contact().firstName,
        last_name: item.contact().lastName,
        email: item.contact().email,
        status: item.status,
      }
    })
    const eventName = event.name;
    const csv = json2csv({ data, fields: ['first_name', 'last_name', 'email', 'status'] });
    return {csv, name: `${eventName}-contacts`}
  }

  Download.afterRemote('contacts', sendFile);
  Download.afterRemote('events', sendFile);
  Download.afterRemote('invites', sendFile);
};
