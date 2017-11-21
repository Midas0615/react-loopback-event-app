'use strict';
const renderEmailBody = require('./../../server/utils/renderEmailBody');

module.exports = function(ContactGroup) {
  // Send Email to contact Group
  ContactGroup.sendEmails = async (contactGroupId, emailTemplateId, next) => {
    try {
      const emailTemplate = await ContactGroup.app.models.EmailTemplate.findById(emailTemplateId);
      if (!emailTemplate || emailTemplate.type !== 'common') throw EmailTypeException
      const contactGroup = await ContactGroup.findById(contactGroupId, {include: 'contacts'});
      const contacts = contactGroup.contacts();
      const emails = contacts.map(contact => renderEmailBody(emailTemplate, contact))
      emails.forEach((email) => {
        ContactGroup.app.models.Mailer.sendEmail(email)
      });
    }
    catch(e) {
      console.log(e)
      const error = new Error('Email Not Sent. Email must be of type = common');
      error.status = 500;
      next(error);
    }
  };
};
