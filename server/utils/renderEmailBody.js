'use strict';
const moment = require('moment');
const Mustache = require('mustache');
const fs = require('fs');
const conf = require('../datasources.production.js');

module.exports = (emailTemplate, contact, event, inviteId) => {
  let GLOBAL_CONFIG;
  if (process.env.NODE_ENV === 'production') {
    GLOBAL_CONFIG = conf.email;
  } else {
    const path = './server/datasources.json';
    const configFile = fs.readFileSync(path, 'UTF-8');
    GLOBAL_CONFIG = JSON.parse(configFile).email;
  }

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
