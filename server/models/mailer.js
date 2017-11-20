'use strict';
const fs = require('fs');

module.exports = function(Mailer) {
  Mailer.sendEmail = (config) => {
    try {
      const folder = process.cwd() + '/server/email-templates/';
      const emailHeader = fs.readFileSync(folder + 'header.html', 'utf8');
      const emailFooter = fs.readFileSync(folder + 'footer.html', 'utf8');
      const messageBody = emailHeader + config.html + emailFooter;
      Mailer.send({
        to: config.to,
        from: 'Dan Radenkovic <dan@radenkovic.org>',
        subject: config.subject,
        html: messageBody,
      }, function(err, mail) {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  };
};
