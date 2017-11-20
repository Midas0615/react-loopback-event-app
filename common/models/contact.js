'use strict';
const renderEmailBody = require('./../../server/utils/renderEmailBody');

module.exports = function(Contact) {
  // Send Email to single Contact
  Contact.sendEmail = async (contactId, emailTemplateId, next) => {
    try {
      const emailTemplate = await Contact.app.models.EmailTemplate.findById(emailTemplateId);
      if (!emailTemplate || emailTemplate.type !== 'common') throw EmailTypeException
      const contact = await Contact.findById(contactId);
      const email = renderEmailBody(emailTemplate, contact);
      Contact.app.models.Mailer.sendEmail(email);
    }
    catch(e) {
      console.log(e)
      const error = new Error('Email Not Sent. Email must be of type = common');
      error.status = 500;
      next(error);
    }
  };
};
