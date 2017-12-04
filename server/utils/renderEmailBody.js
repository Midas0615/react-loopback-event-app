'use strict';
const moment = require('moment');
const Mustache = require('mustache');
const fs = require('fs');

if (process.env.NODE_ENV === 'production') {
  console.log('HERE I AM');
  const conf = require('../datasources.production.js');
  const GLOBAL_CONFIG = conf.email;
} else {
  const path = './server/datasources.json';
  const configFile = fs.readFileSync(path, 'UTF-8');
  const GLOBAL_CONFIG = JSON.parse(configFile).email;
}

module.exports = (emailTemplate, contact, event, inviteId) => {
  const VARIABLES = {
    title: contact.title,
    firstName: contact.firstName,
    lastName: contact.lastName,
  };

  // For Events
  if (event) {
    VARIABLES.eventName = event.name;
    VARIABLES.eventDate = moment(event.eventDate).format('LLLL');
    VARIABLES.eventLocation = event.eventLocation;
  }

  // For Invites
  if (inviteId) {
    VARIABLES.attendingUrl = `${GLOBAL_CONFIG.hostName}/confirm?status=attending&inviteId=${inviteId}`;
    VARIABLES.notAttendingUrl = `${GLOBAL_CONFIG.hostName}/confirm?status=not-attending&inviteId=${inviteId}`;
  }

  const subject = Mustache.render(emailTemplate.subject, VARIABLES);
  const html = Mustache.render(emailTemplate.html, VARIABLES);
  const to = contact.email;
  return {to, subject, html};
};
