// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';


const colors = require('colors')

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
      email: 'txen89@gmail.com',
      firstName: 'Nemanja',
      lastName: 'Ignjatovic',
      realm: 'admin',
      password: '123456',
    },
  ];
  createData('Account', accounts);
  var contactGroups = [
    {
      name: 'Ahmedovski',
    },
  ];
  createData('ContactGroup', contactGroups);
  var contacts = [
    {
      'firstName': 'Jasar',
      'lastName': 'Ahmedovski',
      'email': 'jasar@ahmedovski.com',
      'title': 'Mr.',
      'comment': '',
      'accountId': 1,
      'contactGroupId': 1,
    },
    {
      'firstName': 'Ipce',
      'lastName': 'Ahmedovski',
      'email': 'ipce@ahmedovski.com',
      'title': 'Mr.',
      'comment': '',
      'accountId': 1,
      'contactGroupId': 1,
    },
  ];
  createData('Contact', contacts);

  var events = [
    {
      'name': 'Babusnicki Vasar',
      'comment': 'some comment',
      'accountId': 1,
      'eventDate': Date.now(),
    },
  ];

  createData('Event', events);
  var invitations = [
    {contactId: 1, eventId: 1},
    {contactId: 2, eventId: 1},
  ];

  createData('Invitation', invitations);
  next();
});
