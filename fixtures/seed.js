// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

const fs = require('fs')
const colors = require('colors')
const moment = require('moment');

const app = require('../server/server');
var ds = app.datasources.db;
const contactMapper = require('./contactMapper')


function createData(mdl, data) {
  var count = data.length;
  data.forEach(async (account) => {
    await app.models[mdl].create(account, function(err, model) {
      if (err) throw err;

      count--;

    });
  });
}


const seed = (app, next) => ds.automigrate('Account', async (err) => {
  if (err) throw err;
  console.log('Starting seed')

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
    {
      email: 'harriet.capaldi@tgf.org.uk',
      firstName: 'Harriet',
      lastName: 'Carpaldi',
      realm: 'admin',
      password: '123456',
    },
  ];
  try {
    await createData('Account', accounts);
    console.log(`User account created: bogdan.radenkovic@gmail.com, password: 123456`.green);
    console.log(`User account created: txen89@gmail.com, password: 123456`.green);
  } catch(e) {
    console.log(e)
  }

  var contactGroups = contactMapper.contactGroups.map(c => {
    delete c.id
    return c
  })
  try {
    await createData('ContactGroup', contactGroups)
    console.log('ContactGroups Created')
  } catch(e) {
    console.log('Failed ContactGroup Creation')
  }

  const DataContacts = fs.readFileSync(process.cwd() + '/data/import_new.json', 'UTF-8');
  const contacts = JSON.parse(DataContacts)
  const sanitizedContacts = contacts.map(contact => {
    contact.comment = `
      ${contact.comment}
      ${contact.assistant ? 'Assistant:' + contact.assistant : ''}
      ${contact.database ? 'Database:' + contact.database : ''}
      ${contact['Additional Titles'] ? 'Additional Titles:' +contact['Additional Titles'] : ''}
    `
    delete contact.assistant
    delete contact.database
    delete contact["Additional Titles"]
    if (!contact.groupName) return contact
    contact.contactGroupId = contactMapper.findContactGroup(contact.groupName)
    return contact
  })


  try {
    await createData('Contact', sanitizedContacts)
    console.log('Contact Created')
  } catch(e) {
    console.log('Failed Contact Creation', e)
  }
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

});

seed();


module.exports = seed;
