'use strict';
const moment = require('moment');
const fs = require('fs')
const Mustache = require('mustache');

module.exports = function(Invitation) {
  Invitation.confirm = async (inviteId, status, next) => {
    try {
      const result = await Invitation.findById(inviteId);
      result.updateAttribute('status', status)
      return 'your status is set to ' + status
    } catch(e) {
      const error = new Error('Invitation not found, or expired.');
      return next(error)
    }
  };

  // Send Email
  Invitation.observe('after save', async function updateTimestamp(ctx, next) {
    // if (!ctx.instance.emailConfirmation) return;
    try {
      const emailTemplate = await Invitation.app.models.EmailTemplate.findOne({ where: { name: 'USER_INVITED' }});
      if (!emailTemplate) return;
      const contact = await Invitation.app.models.Contact.findById(ctx.instance.contactId);
      const event = await Invitation.app.models.Event.findById(ctx.instance.eventId);

      const VARIABLES = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        eventName: event.name,
        eventDate: moment(event.eventDate).format('LLLL'),
        attendingUrl: `http://localhost:3000/confirm?status=attending&inviteId=${ctx.instance.id}`,
        notAttendingUrl: `http://localhost:3000/confirm?status=not-attending&inviteId=${ctx.instance.id}`
      }
      console.log(VARIABLES);
      const emailBody = Mustache.render()
      console.log(__dirname);


    } catch(e) {
      // NO_OP
      console.log(e)
    }

  });

  Invitation.validatesInclusionOf('status', {
    in: ['unconfirmed', 'attending', 'not-attending'],
  });
};
