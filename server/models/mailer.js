'use strict';
const fs = require('fs');
const conf = require('../datasources.production.js');

module.exports = function(Mailer) {
  let GLOBAL_CONFIG;
  if (process.env.NODE_ENV === 'production') {
    GLOBAL_CONFIG = conf.email;
  } else {
    const path = './server/datasources.json';
    const configFile = fs.readFileSync(path, 'UTF-8');
    GLOBAL_CONFIG = JSON.parse(configFile).email;
  }

  Mailer.sendEmail = (config) => {
    if (!config.to) return;
    try {
      const folder = process.cwd() + '/server/email-templates/';
      const emailHeader = fs.readFileSync(folder + 'header.html', 'utf8');
      const emailFooter = fs.readFileSync(folder + 'footer.html', 'utf8');
      const messageBody = emailHeader + config.html + emailFooter;
      Mailer.send({
        to: config.to,
        from: `${GLOBAL_CONFIG.senderName} <${GLOBAL_CONFIG.senderEmail}>`,
        subject: config.subject,
        html: messageBody,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
