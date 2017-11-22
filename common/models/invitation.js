'use strict';
const renderEmailBody = require('./../../server/utils/renderEmailBody');

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
    if (!ctx.instance.emailConfirmation) return;
    try {
      const emailTemplate = await Invitation.app.models.EmailTemplate.findOne({ where: { name: 'USER_INVITED' }});
      if (!emailTemplate) return;
      const contact = await Invitation.app.models.Contact.findById(ctx.instance.contactId);
      const event = await Invitation.app.models.Event.findById(ctx.instance.eventId);
      const email = renderEmailBody(emailTemplate, contact, event, ctx.instance.id);
      Invitation.app.models.Mailer.sendEmail(email)
    } catch(e) {
      // NO_OP
      console.log(e)
    }
  });

  Invitation.validatesInclusionOf('status', {
    in: ['unconfirmed', 'attending', 'not-attending'],
  });
};
