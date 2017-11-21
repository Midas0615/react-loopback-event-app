'use strict';
const renderEmailBody = require('./../../server/utils/renderEmailBody');

module.exports = function(Event) {
  // Send emails to all contacts
  Event.sendEmails = async (eventId, emailTemplateId, next) => {
    try {
      const emailTemplate = await Event.app.models.EmailTemplate.findById(emailTemplateId);
      const event = await Event.app.models.Event.findById(eventId, { include: 'contacts' });
      const contacts = event.contacts() || [];
      const emails = contacts.map(contact => renderEmailBody(emailTemplate, contact, event))
      emails.forEach((email) => {
        Event.app.models.Mailer.sendEmail(email)
      });
    }
    catch(e) {
      const error = new Error('Emails not sent.');
      error.status = 500;
      next(error);
    }
  };
  // Send Email to single Contact
  Event.sendEmail = async (eventId, contactId, emailTemplateId, next) => {
    try {
      const emailTemplate = await Event.app.models.EmailTemplate.findById(emailTemplateId);
      const event = await Event.app.models.Event.findById(eventId);
      const contact = await Event.app.models.Contact.findById(contactId);
      const email = renderEmailBody(emailTemplate, contact, event);
      Event.app.models.Mailer.sendEmail(email);
    }
    catch(e) {
      const error = new Error('Email not sent.');
      error.status = 500;
      next(error);
    }
  };
};
