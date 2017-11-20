'use strict';
module.exports = function(Mailer) {
  Mailer.sendEmail = async (config) => {
    try {
    const res = Mailer.app.models.Contact.findById(1);
      console.log(res)
    } catch(e) {
      console.log(e)
    }

    // Mailer.send({
    //   to: config.to,
    //   from: 'Dan Radenkovic <dan@radenkovic.org>',
    //   subject: 'Sample Subject',
    //   text: 'Text',
    //   html: 'HTML',
    // }, function(err, mail) {
    //   console.log(err);
    //   console.log(mail);
    // });
  };
};
