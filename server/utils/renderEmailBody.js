'use strict';
const moment = require('moment');
const Mustache = require('mustache');

module.exports = (emailTemplate, contact, event, inviteId) => {
  const VARIABLES = {
    firstName: contact.firstName,
    lastName: contact.lastName,
  };

  // For Events
  if (event) {
    VARIABLES.eventName = event.name;
    VARIABLES.eventDate = moment(event.eventDate).format('LLLL');
  }

  // For Invites
  if (inviteId) {
    VARIABLES.attendingUrl = `http://localhost:3000/confirm?status=attending&inviteId=${inviteId}`;
    VARIABLES.notAttendingUrl = `http://localhost:3000/confirm?status=not-attending&inviteId=${inviteId}`;
  }

  const subject = Mustache.render(emailTemplate.subject, VARIABLES);
  const html = Mustache.render(emailTemplate.html, VARIABLES);
  const to = contact.email;
  return {to, subject, html};
};
