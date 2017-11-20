'use strict';
const Mustache = require('mustache');

module.exports = function(Contact) {
  Contact.greet = async function(contactId) {
    const { email } = await Contact.findById(contactId);
    console.log(email);
    const data = {
      stuff: 'Jebote'
    }
    const string = `{{stuff}} ovo je do jaja`
    const output = Mustache.render(string,data)

    return output
  };
};
