// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

const fs = require('fs')
const colors = require('colors')
const moment = require('moment');

const app = require('../server');
var ds = app.datasources.db;

function createData(mdl, data) {
  var count = data.length;
  data.forEach(async (account) => {
    await app.models[mdl].create(account, function(err, model) {
      if (err) throw err;

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
}


module.exports = (app, next) => ds.automigrate('Account', async (err) => {
  if (err) throw err;

  var accounts = [
    {
      email: 'bogdan.radenkovic@gmail.com',
      firstName: 'Dan',
      lastName: 'Radenkovic',
      realm: 'admin',
      password: '123456',
    },
    {
      email: 'andrew.herbert@secure-it.co.uk',
      firstName: 'Andy',
      lastName: 'Herbert',
      realm: 'admin',
      password: '123456',
    },
  ];
  createData('Account', accounts);
  console.log(`User account created: bogdan.radenkovic@gmail.com, password: 123456`.green);
  console.log(`User account created: txen89@gmail.com, password: 123456`.green);
  var contactGroups = [
    {
      name: 'Contact Group One',
    },
  ];
  createData('ContactGroup', contactGroups);
  var contacts = [
    {
      'firstName': 'Dan',
      'lastName': 'Radenkovic',
      'email': 'bogdan.radenkovic@gmail.com',
      'title': 'Mr.',
      'comment': '',
      'accountId': 1,
      'contactGroupId': 1,
    },
    {
      'firstName': 'Andy',
      'lastName': 'Herbert',
      'email': 'andrew.herbert@secure-it.co.uk',
      'title': 'Mr.',
      'comment': '',
      'accountId': 1,
      'contactGroupId': 1,
    },
  ];
  const DataContacts = fs.readFileSync('data/import.json', 'UTF-8');
  createData('Contact', JSON.parse(DataContacts));
  // createData('Contact', contacts);

  var events = [
    {
      'name': 'Sample Event',
      'comment': 'Some Comment',
      'accountId': 1,
      'eventDate': moment().add(2, 'days').format(),
      'eventLocation': 'Some dummy place',
    },
  ];

  createData('Event', events);
  var invitations = [
    {contactId: 1, eventId: 1},
    {contactId: 2, eventId: 1},
  ];
  createData('Invitation', invitations);

  var emailTemplates = [
    {
      name: 'USER_INVITED',
      type: 'system',
      subject: 'You are Invited to Event: {{eventName}} on {{eventDate}}',
      html: `
        <h2>Hello {{firstName}}</h2>,
        You are invited to {{eventName}}, please respond by clicking on links: <br/><br/>
        <a href="{{attendingUrl}}">Attending</a> or <a href="{{notAttendingUrl}}">Not Attending</a>.
        <p>
          Best, <br />
          EventApp
        </p>
        `
    },
    {
      name: 'EVENT REMINDER',
      type: 'event',
      subject: 'Event Reminder: {{eventName}} on {{eventDate}}',
      html: `
        <h2>Hello {{firstName}},
        <br/><br/>
        You are invited to {{eventName}}, just to remind you that event will occur on {{eventDate}}, and you are welcome!
        <p>
          Best, <br />
          EventApp
        </p>
        `
    },
    {
      name: 'COMMON MESSAGE',
      type: 'common',
      subject: 'Hi {{firstName}}',
      html: `
        <h2>Hello {{firstName}} {{lastName}},
        <br/><br/>
        This is just a common message.
        <p>
          Best, <br />
          EventApp
        </p>
        `
    }
  ];
  createData('EmailTemplate', emailTemplates);

  next();
});
